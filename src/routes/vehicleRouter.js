const express = require("express");
const vehicleRouter = express.Router();
const vehicleController = require("../controllers/vehicleController");

vehicleRouter.post("/newVehicle", vehicleController.newVehicle);
vehicleRouter.get("/listAllVehicles", vehicleController.listAllVehicles);
vehicleRouter.put("/editVehicle/:id", vehicleController.editVehicle);
vehicleRouter.delete("/deleteVehicle/:id", vehicleController.deleteVehicle);
vehicleRouter.put("/soldVehicle/:id", vehicleController.soldVehicle);
vehicleRouter.get("/listSoldVehicles", vehicleController.listSoldVehicles);
vehicleRouter.get("/listStockVehicles", vehicleController.listStockVehicles);
vehicleRouter.get("/salesReport", vehicleController.salesReport);

module.exports = vehicleRouter;