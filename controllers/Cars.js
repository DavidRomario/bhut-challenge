const logSchema = require("../models/logModel");
const axios = require("axios");
const API_TESTE = process.env.API_TESTE;
const rabbitmq = require("../libs/rabbitmq");

async function getListCars(req, res) {
  try {
    const response = await axios.get(`${API_TESTE}/api/cars`);
    const cars = response.data;

    return res.status(200).json({
      success: true,
      message: "",
      payload: cars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function createCar(req, res) {
  try {
    const body = req.body;

    const carInfo = await axios.post(`${API_TESTE}/api/cars`, {
      title: body.title,
      brand: body.brand,
      price: body.price,
      age: body.age,
    });
    const logData = {
      car_id: carInfo.data._id,
      data_hora: new Date(),
    };

    const log = logSchema(logData);
    await log.save();

    await rabbitmq.publishCarInfo(carInfo.data);

    return res.status(200).json({
      success: true,
      message: "",
      payload: [carInfo.data],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function getLogs(req, res) {
  try {
    const logs = await logSchema.find();

    return res.status(200).json({
      success: true,
      message: "",
      payload: logs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      payload: [],
      message: "error on api",
    });
  }
}

module.exports = { getListCars, createCar, getLogs };
