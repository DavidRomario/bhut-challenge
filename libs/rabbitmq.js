const amqp = require("amqplib");
const API_QUEUE = process.env.API_QUEUE;

async function connect(queueName) {
  const connection = await amqp.connect(API_QUEUE);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  return {
    connection: connection,
    channel: channel
  }
}

async function closeConnect(channel, connection) {
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
}

module.exports = {
  connect,
  closeConnect,
};
