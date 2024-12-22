import {Schema, model } from 'mongoose'



//pizza, no entra en el tp final
const orderSchema = new Schema({
    name: String,
    size: {
        type: String,
        enum: ["small", "medium", "large"], //tipos de daos numerados
        default: "medium"
    
    },
    price: Number,
    quantity: Number,
    date: Date
}
)

const orderModel = model("orders", orderSchema)

export default orderModel