import { Avatar, Box, Button, Flex, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Link, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";
import { Project } from "../../lib/types";
import { SearchIcon } from "@chakra-ui/icons";

export default function ProjectNavbar(props: any) {

    const router = useRouter()
    const session = useSession()
    const isLoggedIn = (session.status === 'authenticated')
    const path = router.asPath
    const project: Project = props.project
    const user = session?.data?.user

    function LinkItem({ children, href, hideInSession, showInSession, ...props }: any) {
        const isActive = (href == path)
        let endValue = 'inherit'

        if (hideInSession) {
            if (isLoggedIn) {
                endValue = 'none'
            }
        }

        if (showInSession) {
            if (isLoggedIn) {
                endValue = 'inherit'
            } else {
                endValue = 'none'
            }
        }

        // endValue = (session.isLoggedIn && hideInSession) ? 'none' : 'inherit'

        // endValue = (session.isLoggedIn && showInSession) ? 'inherit' : 'none'

        return (
            <Link as={NextLink} href={href} display={endValue}>
                <Text color={isActive ? 'white' : 'whiteAlpha.600'} fontSize="xl" {...props}>
                    {children}
                </Text>
            </Link>
        )
    }
    function LinkButton({ children, href = "#", hideInSession, showInSession, ...props }: any) {
        const isActive = (href == path)
        let endValue = 'inherit'

        if (hideInSession) {
            if (isLoggedIn) {
                endValue = 'none'
            }
        }

        if (showInSession) {
            if (isLoggedIn) {
                endValue = 'inherit'
            } else {
                endValue = 'none'
            }
        }

        return (
            <NextLink href={href}>
                <Button {...props} display={endValue}>
                    {children}
                </Button>
            </NextLink>
        )
    }
    if (project != null) {
        return (
            <Box borderBottom="1px solid #efefef">
                <Flex justifyContent="space-between" p="1rem 2rem">
                    <Flex gap={4}>
                        <LinkItem href="/">
                            <HStack gap={1}>
                                <Avatar src={project.logo} name={project.name} />
                                <Heading>{project.name}</Heading>
                            </HStack>
                        </LinkItem>
                    </Flex>
                    <Flex gap={4}>
                        <LinkButton colorScheme="blue" hideInSession textTransform="uppercase" onClick={signIn}>
                            Login
                        </LinkButton>
                        <LinkButton href="/create-account" colorScheme="blue" variant="outline" hideInSession textTransform="uppercase">
                            Create account
                        </LinkButton>
                        {
                            isLoggedIn ?
                                <Tooltip label="Go to your account">
                                    <NextLink href="/account">
                                        <Avatar src={user?.icon ? user?.icon : ''} name={user?.name} />
                                    </NextLink>
                                </Tooltip>
                            : null
                        }
                    </Flex>
                </Flex>
                <Flex justifyContent="space-between" px="2rem" pb="0.5rem">
                    <Flex gap={4} alignSelf="center">
                        <LinkItem href={`/project/${project.id}`} fontSize="sm" fontWeight="bold" textTransform="uppercase">ROADMAP</LinkItem>
                        <LinkItem href={`/project/${project.id}/feature-requests`} fontSize="sm" fontWeight="bold" textTransform="uppercase">FEATURE REQUESTS</LinkItem>
                    </Flex>
                    <Flex gap={4}>
                        <InputGroup>
                            <InputLeftElement
                                children={<SearchIcon color='gray.300'/>}/>
                            <Input
                                type="search"
                                placeholder="SEARCH" />
                        </InputGroup>
                    </Flex>
                </Flex>
            </Box>
        )
    } else {
        return (
            <Box>
                <Flex justifyContent="space-between">
                    <Flex p="2rem" gap={4}>
                        <LinkItem href="/">Home</LinkItem>
                    </Flex>
                    <Flex p="2rem" gap={4}>
                        <LinkButton colorScheme="blue" hideInSession textTransform="uppercase" onClick={signIn}>
                            Login
                        </LinkButton>
                        <LinkButton href="/create-account" colorScheme="blue" variant="outline" hideInSession textTransform="uppercase">
                            Create account
                        </LinkButton>
                        <LinkItem href="/account" showInSession>
                            <Avatar src={user?.icon ? user?.icon : ''} name={user?.name} />
                        </LinkItem>
                    </Flex>
                </Flex>
            </Box>
        )
    }
}