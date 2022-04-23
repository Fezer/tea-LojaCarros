const express = require("express");
const app = express();
const router = require("./src/routes/router");
const mongoose = require("mongoose");

try{
<<<<<<< HEAD
    mongoose.connect(process.env.DB_SERVER, {
=======
    mongoose.connect("***", {
>>>>>>> aa29c31921bf362af05560d7cc2e387445c0493a
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB.");
} catch(error){
    console.log("Erro de conexão com o MongoDB.");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server running on port ", process.env.SYSTEM_PORT);
});

module.exports = app;
