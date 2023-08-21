import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { KeyboardEventHandler, KeyboardEvent, useState } from "react";
import Landing from "../components/layouts/landing";
import UserAPI from "../lib/UserAPI";

export default function CreateAccountPage() {

    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    async function createAccount() {
        const user = await UserAPI.createAccount({
            name: nameInput,
            email_address: emailInput,
            password: passwordInput
        })

        signIn("credentials", { email_address: emailInput, password: passwordInput })
    }

    return (
        <Landing>
            <Heading>Sign up</Heading>

            <Box my="2rem">
                <Input
                    my="1rem"
                    type="text"
                    placeholder="Name"
                    value={nameInput}
                    onChange={(ev: any) => setNameInput(ev.target.value)}/>
                <Input
                    my="1rem"
                    type="email"
                    placeholder="Email address"
                    value={emailInput}
                    onChange={(ev: any) => setEmailInput(ev.target.value)}/>
                <Input
                    my="1rem"
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onKeyDown={(ev: KeyboardEvent<HTMLInputElement> | undefined) => ev?.key == 'Enter' ? createAccount() : null}
                    onChange={(ev: any) => setPasswordInput(ev.target.value)}/>

                
                <Button mt="2rem" colorScheme="blue" onClick={createAccount}>Sign up</Button>
            </Box>
        </Landing>
    )
}