const express = require("express");
const vehicleRouter = require("./vehicleRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Funcionando!");
});

router.use("/vehicle", vehicleRouter);

module.exports = router;