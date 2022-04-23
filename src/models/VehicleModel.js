const mongoose = require("mongoose");

const VehicleModel = new mongoose.Schema({
    fabricante: String,
    modelo: String,
    placa: String,
    valor: Number,
    caracteristicas: [],
    vendido: Boolean,
    dataVenda: Date,
});

module.exports = VehicleModel;