const rabbitmq = require("./rabbitmq");

async function consumeAndSendWebhook() {
  try {
    const queue = await rabbitmq.connect("cars");
    console.log("Waiting cars on the queue");

    queue.channel.consume("cars", async (message) => {
      const carInfo = JSON.parse(message.content.toString());

      await processCarInfo(carInfo);

      queue.channel.ack(message);
    });
  } catch (error) {
    console.log("Error on send to webhook", error);
  }
}

async function processCarInfo(carInfo) {
  try {
    console.log("Webhook successfully sent!", carInfo);
  } catch (error) {
    console.log("Error on process info and send to webhook", error);
  }
}

consumeAndSendWebhook();
