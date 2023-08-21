import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import Layout from "../components/layouts/main"
import CategoryAPI from "../lib/CategoryAPI"
import { Category, Item, OrderItem } from "../lib/types"
import { initSendingChannel, queue } from "../lib/amqpLib"
import { useEffect } from "react"

export default function OrderPage(props: any) {

    const categories = props.categories
    const items: Item[] = []

    let item_list: {amount: number, item: Item} | any = []
    let chSending: any
    useEffect(() => {
        // use sockets
        chSending = initSendingChannel()
    }, [])

    function addItem(amount: number, item: Item) {
        item_list.push({amount, item})
    }
    function OrderOverview() {
        return (
            <Box>
                {item_list.map((order_item: {amount: number, item: Item}) => (
                    <Text>{order_item.amount}x {order_item.item.name}</Text>
                ))}
                <Button colorScheme="green" onClick={placeOrder}>Place order</Button>
            </Box>
        )
    }

    function placeOrder() {
        chSending.sendToQueue(queue, Buffer.from(JSON.stringify({ event: 'order-placed', })))
    }

    return (
        <Layout>
            <Flex p="1rem" overflowY="scroll">
                {
                    categories.map((category: Category) => (
                        <Box>
                            <Text>{category.name}</Text>
                        </Box>
                    ))
                }
            </Flex>
            <Box>
                <Heading as="h2" size="lg">Current Category</Heading>
                <Flex justifyContent="space-evenly">
                    {items.map((item: Item) => (
                        <Box onClick={() => addItem(2, item)}>
                            <Text>{item.name}</Text>
                        </Box>
                    ))}
                </Flex>
                <Box>
                    <Button colorScheme="green">View order</Button>
                </Box>
            </Box>
        </Layout>
    )
}


export async function getServerSideProps(context: any) {

    const categories = await CategoryAPI.getAll()

    return {
        props: {
            categories
        }
    }
}