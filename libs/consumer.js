const amqp = require("amqplib");
const API_QUEUE = process.env.API_QUEUE;

async function consumeAndSendWebhook() {
  try {
    const connection = await amqp.connect(API_QUEUE);
    const channel = await connection.createChannel();
    const queueName = "cars";

    await channel.assertQueue(queueName, { durable: true });

    console.log("Aguardando mensagens da fila...");

    channel.consume(queueName, async (message) => {
      const carInfo = JSON.parse(message.content.toString());

      await processCarInfo(carInfo);

      channel.ack(message);
    });
  } catch (error) {
    console.log("Erro ao consumir a fila e enviar o webhook:", error);
  }
}

async function processCarInfo(carInfo) {
  try {
    console.log("Webhook enviado com sucesso:", carInfo);
  } catch (error) {
    console.log(
      "Erro ao processar a informação do carro e enviar o webhook:",
      error
    );
  }
}

consumeAndSendWebhook();
