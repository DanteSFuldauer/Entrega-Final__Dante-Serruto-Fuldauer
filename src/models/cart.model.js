import { Schema, model} from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products' //significa que este id hace ref a un id de la coleccio n productos
                },
                quentity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

//populate
//cada vez que ejcute findone, manejo via populate
cartSchema.pre('findOne', function() {
    this.populate('products.id_prod');
})

const cartModel = model("carts", cartSchema)
export default cartModel
