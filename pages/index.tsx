import { 
    Box, 
    Button, 
    Heading, 
    HStack, 
    Text,
    Image,
    Center,
    VStack,
    Flex,
    Link,
} from "@chakra-ui/react";
import Landing from "../components/layouts/landing";
import { useSession } from "next-auth/react";
import NextLink from 'next/link'


export default function Homepage() {

    const session = useSession()

    return (
        <Landing>
            <Center>
                <Heading>Landing page.</Heading>
            </Center>
            <Center>
                <Text>
                    Session status: {session.status}
                </Text>
            </Center>
            <Center>
                <Link as={NextLink} href='/order'>Order here</Link>
            </Center>
        </Landing>
    )
}