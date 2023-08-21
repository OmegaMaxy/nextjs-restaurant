import amqplib from 'amqplib';

// (async () => {
//     const conn = await amqplib.connect('amqp://localhost')
    
//     const chReceiving = await conn.createChannel()
//     await chReceiving.assertQueue(queue)
//     const chSending = await conn.createChannel()
// })
async function initReceivingChannel() {

    console.log(`connecting with amqp://${process.env.RABBITMQ_URL}`)
    const conn = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}`)
    
    const chReceiving = await conn.createChannel()
    await chReceiving.assertQueue(queue)

    return chReceiving
} 
async function initSendingChannel() {

    console.log(`connecting with amqp://${process.env.RABBITMQ_URL}`)
    const conn = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}`)
    const chSending = await conn.createChannel()

    return chSending
} 
const queue = 'tasks'
export { initReceivingChannel, initSendingChannel, queue }