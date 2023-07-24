const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  car_id: {
    type: String,
    required: true,
  },
  data_hora: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const logModel = mongoose.model("car", logSchema);


module.exports = logModel;
