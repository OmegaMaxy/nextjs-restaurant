import { ChevronUpIcon } from "@chakra-ui/icons";
import { Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import RequestItemAPI from "../lib/RequestItemAPI";
import { RequestItem } from "../lib/types";


export default function UpvoteButton({children, ...props}: any) {

    const item: RequestItem = props.request_item
    delete  props.request_item
    
    const [votes, setVotes] = useState(item.votes as number)
    //const hasVoted = useRef(false)
    async function upvotePost() {
        setVotes(votes => votes+1)
        const res = await RequestItemAPI.vote(item.id)
        if (res.error) {
            setVotes(votes => votes-1)
        } else {
            // change hasVoted status
        }
    }

    /*useEffect(() => {
        hasVoted.current.value = true
    }, [hasVoted])*/

    return (
        <VStack
            p="0.7rem"
            border="1px solid rgba(255,255,255,.2)"
            bg={"transparent"}
            borderRadius="6px"
            transition="all .1s ease-in-out"
            cursor="pointer"
            _hover={{ borderColor: useColorModeValue("rgba(35,35,35,.2)", "#e6e6e6") }}
            onClick={upvotePost}
            {...props}>
            <ChevronUpIcon color="#888" fontSize="xs" />
            <Text m="0" p="0" color={useColorModeValue("#333", "#fff")}>{votes}</Text>
        </VStack>
        // <VStack
        //     p="0.7rem"
        //     border="1px solid #e6e6e6"
        //     bg="hsla(0,0%,100%,.8)"
        //     borderRadius="6px"
        //     transition="all .1s ease-in-out"
        //     cursor="pointer"
        //     _hover={{ borderColor: "rgba(35,35,35,.2)" }}
        //     onClick={upvotePost}
        //     {...props}>
        //     <ChevronUpIcon color="#888" fontSize="4xl" />
        //     <Text m="0" color="#333">{votes}</Text>
        // </VStack>
    )
}