import { 
    Box,
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Heading, 
    HStack, 
    Text,
    Link,
    Image,
    TagLabel,
    Tag,
    Spinner,
    Center,
    VStack,
} from "@chakra-ui/react";
import Layout from '../../components/layouts/main'
import UserAPI from '../../lib/UserAPI'
import moment from 'moment'
import NextLink from 'next/link'
import { useSession } from "next-auth/react";
import { User } from "../../lib/types";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { RequestItem } from "../../lib/types";
import RequestItemAPI from "../../lib/RequestItemAPI";


export default function AccountPage(props: any) { // withAuthentication()

    const session = useSession()
    const user = session.data?.user
    
    function RequestItems() {
        
        const [request_items, setRequestItems] = useState([] as RequestItem[])
        const [isLoading, setLoading] = useState(false)

        useEffect(() => {

            const controller = new AbortController()
            const { signal } = controller

            async function getData() {
                if (!user?.id) {
                    setTimeout(() => {
                        getData()
                    }, 1500)
                } else {
                    console.log(user.id)
                    const request_items = await RequestItemAPI.getAllFromUserById(user!.id, signal)
                    setRequestItems(request_items)
                }
                
            }
            setLoading(true)
            getData()
            setLoading(false)
            
            return () => {
                controller.abort()
            }
        }, [])
        
        if (isLoading) {
            return (
                <Box
                    border="1px dashed white"
                    p="2rem"
                    w="fit-content"
                    borderRadius="12px"
                    transition="0.2s"
                    _hover={{ borderColor: '#39f' }}>
                    <Center>
                        <Spinner />
                    </Center>
                </Box>
            )
        } else if (request_items.length == 0) {
            return (
                <Box 
                    border="1px dashed white" 
                    p="2rem" 
                    w="fit-content" 
                    borderRadius="12px" 
                    transition="0.2s" 
                    _hover={{ borderColor: '#39f' }}>
                    <Text>You don't have any feature requests yet.</Text>
                </Box>
            )
        }

        return (
            <>
                {
                    request_items.map((item: RequestItem, index: number) => (
                        <Card boxShadow="none" border="1px solid #b7b7b7" my="1rem" key={index} bg="transparent">
                            <CardHeader pb="0.3rem" fontSize="md">
                                <Text opacity="0.35" pb="0.3rem">{moment(item.created_at).fromNow()}</Text>
                                {item.item_group ? 
                                <Tag size="md" variant="subtle" colorScheme={item.item_group?.color}>
                                    <TagLabel>{item.item_group?.name}</TagLabel>
                                </Tag> : null}
                            </CardHeader>
                            <CardBody>
                                <HStack justifyContent="space-between">
                                    <VStack alignItems="flex-start">
                                        <Heading as="h2" size="md">{item.title}</Heading>
                                        <Text>{item.description.substring(0, 50).trim()}{item.description.length > 50 ? '...' : null}</Text>
                                    </VStack>
                                    <HStack>
                                        <NextLink href={`/project/${item.project.id}/feature-requests/${RequestItemAPI.encodeURL(item.title)}`}>
                                            <Button colorScheme="blue">View</Button>
                                        </NextLink>
                                        <NextLink href={`#`}>
                                            <Button colorScheme="red" variant="outline">Delete</Button>
                                        </NextLink>
                                    </HStack>
                                </HStack>
                            </CardBody>
                        </Card>
                    ))
                }
            </>
        )
    }
    
    return (
        <Layout sessionProtected>
            <Heading my="1.5rem">Your feature requests</Heading>
            <RequestItems/>

            <Box mt="4rem">
                <Heading my="1.5rem">Account Administration</Heading>
                <NextLink href="/account/settings">
                    <Button variant="cannyButton-outline">Settings</Button>
                </NextLink>
            </Box>
        </Layout>
    )
}
