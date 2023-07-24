const rabbitmq = require('./rabbitmq');

async function publishCarInfo(carInfo) {
  try {
    const queue = await rabbitmq.connect("cars");

    queue.channel.sendToQueue("cars", Buffer.from(JSON.stringify(carInfo)), {
      persistent: true,
    });

    console.log("Info published on the queue");

    setTimeout(async () => {
      await rabbitmq.closeConnect(queue.channel, queue.connection)
    }, 500);
  } catch (error) {
    console.log("Error on published info", error);
  }
}

module.exports = {
  publishCarInfo,
};
