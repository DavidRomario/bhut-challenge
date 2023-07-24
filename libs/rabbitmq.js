const amqp = require("amqplib");
const API_QUEUE = process.env.API_QUEUE;

async function publishCarInfo(carInfo) {
  try {
    const connection = await amqp.connect(API_QUEUE);
    const channel = await connection.createChannel();
    const queueName = "cars";

    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(carInfo)), {
      persistent: true,
    });

    console.log("Informação do carro publicada na fila.");

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.log("Erro ao publicar informação do carro na fila:", error);
  }
}

module.exports = {
  publishCarInfo,
};
