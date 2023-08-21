import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../Navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Landing = ({ children, sessionProtected }: any) => {

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

            <NavBar />

            <Box pt={14} >

                {children}

                <Footer />
            </Box>
        </Box>
    )
}

export default Landing
