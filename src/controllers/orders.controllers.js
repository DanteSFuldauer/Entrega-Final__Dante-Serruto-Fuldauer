import orderModel from "../models/order.model.js";

//obtener todos los order
export const getOrders = async (req,res) => {
    try { //ejecuto el codigo
        const {limit} = req.query
        //const orders = await orderModel.find().limit(limit)
        const orders = await orderModel.aggregate([

            //busco solo pizzas medium
            {$match: {size:"small"}}, //stage 1 filtro por pizzas medianas

            //{$group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}}, //stage 2 filtro por nombre y x suma de cntidades

            {$group: {_id: "$name", totalVentas: {$sum: "$price"}}}, //filtra por precio

            { $sort: {totalQuantity: 1}}, //filtra de 1 mayor a menor, -1 menor a mator

            { $group: {_id: 1, orders: {$push: "$$ROOT"}}}, //agrupo el resultado y guarda todo el contenido del array anterior

            {$project: {"_id" : 0, orders: "$orders"}}, //guardo en una coleccion llamada orders el contyautogenero el id

            {$merge: {into: "reports"}} //guardame en la coleccion reports de mi bdd

        ])
        res.status(200).send("Reportes generados")

    } catch(e) { //si suceden errores
        res.status(500).send("Error al consultar ordenes: ", e)
    }
}



//crear order
export const createOrder = async (req, res) => {
    try {
        const order = req.body
        const respuesta = await orderModel.create(order)
        res.status(201).send("Orden creada correctamente")
    } catch (e) {
        res.status(500).send("Error al crear Orden: ", e)
    }
}








