import { Avatar, Box, Button, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layouts/main";
import { useSession } from "next-auth/react";
import UserAPI from "../../lib/UserAPI";
import { SettingsIcon } from '@chakra-ui/icons'

export default function SettingsPage() {

    const session = useSession()
    const [user, setUser] = useState(null as any)
    

    useEffect(() => {
        setUser(session.data?.user)
    }, [session])

    const nameInput = useRef('')
    const emailInput = useRef('')
    const [isSaveAccountDataLoading, setSaveAccountDataLoading] = useState(false)
    const [updateAccountError, setUpdateAccountError] = useState('')
    
    const [passwordUpdateField, setPasswordUpdateField] = useState('')
    const [isUpdatePasswordLoading, setUpdatePasswordLoading] = useState(false)
    const [updatePasswordError, setUpdatePasswordError] = useState('')
    
    async function handleSaveAccountData() {
        setSaveAccountDataLoading(true)
        if (nameInput.current == '' || emailInput.current == '') {
            setUpdateAccountError('Something didnt work.')
            return
        }
        const res = await UserAPI.updateAccountData({ user_id: user.id, name: nameInput.current, icon: emailInput.current })
        if (res.error) {
            setUpdateAccountError(res.errorMessage)
        }
        setSaveAccountDataLoading(false)
    }
    async function handleUpdatePassword() {
        setUpdatePasswordLoading(true)
        if (passwordUpdateField != '') {
            const res = await UserAPI.updatePassword({ user_id: user.id, password: passwordUpdateField })
            if (res.error) {
                setUpdateAccountError(res.errorMessage)
            }
        } else {
            setUpdatePasswordError('Something didnt work.')
        }
        setUpdatePasswordLoading(false)
    }


    return (
        <Layout sessionProtected>
            <HStack>
                <SettingsIcon fontSize="3xl"/>
                <Heading as="h1" size="xl">
                    Account Settings
                </Heading>
            </HStack>
            <Box my="2rem" border="1px solid #999">
                <HStack>
                    <Avatar src={user?.icon} name={user?.name}/>
                    <Button variant="cannyButton-outline">Upload image</Button>
                </HStack>
                <VStack alignItems="flex-start">
                    <Heading as="h2" size="sm">Name</Heading>
                    <Input
                        type="text"
                        placeholder="Your name..."
                        ref={nameInput.current}
                    />
                </VStack>
                <VStack alignItems="flex-start">
                    <Heading as="h2" size="sm">Email</Heading>
                    <Input
                        type="email"
                        placeholder="Your email address..."
                        ref={emailInput.current}
                    />
                </VStack>
                <Button colorScheme="blue" variant="cannyButton" onClick={handleSaveAccountData} isLoading={isSaveAccountDataLoading}>Save</Button>
            </Box>
            <Box my="2rem" border="1px solid #999">
                <Heading as="h2" size="sm">Update password</Heading>
                <Input
                    type="password"
                    placeholder="New password"
                    value={passwordUpdateField}
                    onChange={(ev: any) => setPasswordUpdateField(ev.target.value)}
                />
                <Button colorScheme="blue" variant="cannyButton" onClick={handleUpdatePassword} isLoading={isUpdatePasswordLoading}>Update password</Button>
            </Box>
        </Layout>
    )
}