const mongoose = require("mongoose");
const vehicleModel = require("../models/VehicleModel");

const Vehicle = mongoose.model("Vehicle", vehicleModel);

module.exports = {
    async newVehicle(req, res){

    },

    async editVehicle(req, res){

    },

    async deleteVehicle(req, res){

    },

    async soldVehicle(req, res){

    },

    async listAllVehicles(req, res){

    },

    async listSoldVehicles(req, res){

    },

    async listStockVehicles(req, res){

    },

    async salesReport(req, res){

    },
};