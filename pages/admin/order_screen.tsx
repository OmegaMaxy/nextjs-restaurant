
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Message } from 'amqplib'
import { useEffect } from 'react'
import { initReceivingChannel, queue } from '../../lib/amqpLib'
import OrderAPI from '../../lib/OrderAPI'
import { Event, Order, OrderItem } from '../../lib/types'

export default function OrderScreen(props: any) {

    const orders = props.orders

    let chReceiving: any
    useEffect(() => {

        chReceiving = initReceivingChannel()

        chReceiving.consume(queue, (msg: Message) => {
            if (msg !== null) {
                console.log('Received:', msg.content.toString());
                const received_event: Event = JSON.parse(msg.content.toString())

                switch (received_event.event) {
                    case 'order-placed':
                        orders.push(received_event.message)
                        break;
                    case 'order-removed':
                        orders.pop('idk') // TODO
                    default:
                        break;
                }
                chReceiving.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    }, [])

    return (
        <Flex
            justifyContent="space-evenly">
            {
                orders.map((order: Order) => (
                    <Box
                        p="2rem"
                        m="1.5rem"
                        display="flex"
                        maxHeight="300px"
                        overflowY="scroll"
                        border="1px solid #333"
                        justifyContent="center"
                        alignContent="center">
                        <Heading as="h4" size="sm">#{order.order_nr}</Heading>
                        {order.order_items.map((item: OrderItem) => (
                            <Text color="gray.300">{item.amount}x {item.item.name}</Text>
                        ))}
                    </Box>
                ))
            }
        </Flex>
    )
}

export async function getServerSideProps(context: any) {

    const orders = await OrderAPI.getAllForAdmin(Date.now())

    return {
        props: {
            orders
        }
    }
}