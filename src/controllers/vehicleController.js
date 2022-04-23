const mongoose = require("mongoose");
const vehicleModel = require("../models/VehicleModel");

const Vehicle = mongoose.model("Vehicle", vehicleModel);

module.exports = {
    async newVehicle(req, res){
        try{
            const { fabricante, modelo, placa, valor, caracteristicas } = req.body;
            if (!fabricante || !modelo || !placa || !valor)
                return res.status(404).json({ msg: "Parâmetros obrigatórios não informados" });
            const vendido = false;
            const dataVenda = null;
            const vehicle = new Vehicle({ fabricante, modelo, placa, valor, caracteristicas, vendido, dataVenda });
            if(!(await vehicle.save()))
                return res.status(400).json({ msg: "Não foi possível criar o veículo" });
            return res.status(200).json({ msg: "Veículo criado com sucesso." });
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async editVehicle(req, res){
        try{
            const vehicleId = req.params.id;
            const { fabricante, modelo, placa, valor, caracteristicas } = req.body;
            if (!fabricante || !modelo || !placa || !valor || !vehicleId)
                return res.status(404).json({ msg: "Parâmetros obrigatórios não informados" });
            const vehicle = await Vehicle.findByIdAndUpdate(vehicleId,
                {
                    fabricante,
                    modelo,
                    placa,
                    valor,
                    caracteristicas,
                },
                { new: true}
            );
            if(!vehicle || vehicle.length == 0)
                return res.status(404).json({ msg: "Veículo não encontrado." });
            else
                return res.status(200).json({ msg: "Veículo atualizado", vehicle });
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }

    },

    async deleteVehicle(req, res){
        try{
            const vehicleId = req.params.id;
            if (!vehicleId)
                return res.status(404).json({ msg: "Parâmetros obrigatórios não informados" });
            const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
            if(!vehicle || vehicle.length == 0)
                return res.status(404).json({ msg: "Veículo não encontrado.", vehicleId });
            else
                return res.status(200).json({ msg: "Veículo excluído com sucesso", vehicle });
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async soldVehicle(req, res){
        try{
            const vehicleId = req.params.id;
            var isVendido = true;
            var dataVenda = new Date(); 
            if (!vehicleId)
                return res.status(404).json({ msg: "Id do veículo não informado." });
            var vehicle = await Vehicle.findById(vehicleId);
            if(!vehicle || vehicle.length == 0)
                return res.status(404).json({ msg: "Veículo não encontrado.", vehicleId });
            if(vehicle.vendido){
                isVendido = false;
                dataVenda = null;
            }else{
                isVendido = true;
            } 
            vehicle = await Vehicle.findByIdAndUpdate(vehicleId,
                {
                    vendido : isVendido,
                    dataVenda,
                },
                );
            return res.status(200).json({ msg: "Status de venda do veículo atualizado com sucesso.", vehicle });
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async listAllVehicles(req, res){
        try{
            const vehicleList = await Vehicle.find();
            if(!vehicleList)
                return res.status(404).json({ msg: "Não existem veículos cadastrados." });
            else
                return res.status(200).json({ msg: "Lista de veículos cadastrados.",  vehicleList});
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async listSoldVehicles(req, res){
        try{
            const vehicleList = await Vehicle.find({ vendido: true });
            if(!vehicleList || vehicleList.length == 0)
                return res.status(404).json({ msg: "Não existem veículos vendidos para listar." });
            else
                return res.status(200).json({ msg: "Lista de veículos vendidos.",  vehicleList});
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async listStockVehicles(req, res){
        try{
            const vehicleList = await Vehicle.find({ vendido: false });
            if(!vehicleList || vehicleList.length == 0)
                return res.status(404).json({ msg: "Não existem veículos em estoque para listar." });
            else
                return res.status(200).json({ msg: "Lista de veículos em estoque.",  vehicleList});
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async salesReport(req, res){
        if (!req.body.dataInicio || !req.body.dataFim)
                return res.status(404).json({ msg: "Parâmetros obrigatórios não informados" });
        const dataInicio = new Date(req.body.dataInicio);
        const dataFim = new Date(req.body.dataFim);
        try{
            const vehicleList = await Vehicle.find({ dataVenda: { $gte: dataInicio, $lte: dataFim} });
            if(!vehicleList || vehicleList.length == 0)
                return res.status(404).json({ msg: "Não existem veículos vendidos no período informado." });
            else{
                var valorTotalDeVendasNoPeriodo = 0;
                for (i=0;i<vehicleList.length;i++){
                    valorTotalDeVendasNoPeriodo += vehicleList[i].valor;
                }
                const totalVeiculosVendidosPeriodo = vehicleList.length;
                return res.status(200).json({   msg: "Relatório de veículos vendidos no período informado",
                                                "Data de início do período de vendas" : dataInicio,
                                                "Data de término do período de vendas" : dataFim,
                                                "Quantidade total de veículos vendidos no período" : totalVeiculosVendidosPeriodo, 
                                                "Valor total em veículos vendido no período" : valorTotalDeVendasNoPeriodo
                                            });
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },
};