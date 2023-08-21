import Head from 'next/head'
import ProjectNavbar from '../Navbar-Project'
import Navbar from '../Navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Layout = ({ children, sessionProtected, navbarProject }: any) => {

    const router = useRouter()
    const session = useSession()
    

    /*useEffect(() => {
        if (sessionProtected) {
            if (session.status !== 'authenticated') {
                signIn()
            }
        }
    }, [session])*/

    return (
        <Box as="main" pb={8} >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" href="https://omegatoday.eu/app/img/ou/OmegaUnaIcon.ico" />
                <link rel="shortcut icon" href="https://omegatoday.eu/app/img/ou/OmegaUnaIcon.ico" />
                <title>Canny clone</title>
            </Head>
            {navbarProject ? <ProjectNavbar project={navbarProject}/> : <Navbar />}

            <Container maxW="container.lg" pt={14} >

                {children}

                <Footer />
            </Container>
        </Box>
    )
}

export default Layout
