import { Box, Flex, Heading } from '@chakra-ui/react'
import { Message } from 'amqplib'
import { useEffect } from 'react'
import { initReceivingChannel, queue } from '../lib/amqpLib'
import OrderAPI from '../lib/OrderAPI'
import { Order, Event } from '../lib/types'

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
                props.orders != null && props.orders.map((order: Order) => (
                    <Box
                        p="2rem"
                        m="1.5rem"
                        display="flex"
                        border="1px solid #333"
                        justifyContent="center"
                        alignContent="center">
                        <Heading as="h2" size="md">{order.order_nr}</Heading>
                    </Box>
                ))
            }
        </Flex>
    )
}

export async function getServerSideProps(context: any) {

    const data = await OrderAPI.getAllForClient(Date.now())
    console.log("orders")
    console.log(data.orders)

    return {
        props: {
            orders: data.orders
        }
    }
}