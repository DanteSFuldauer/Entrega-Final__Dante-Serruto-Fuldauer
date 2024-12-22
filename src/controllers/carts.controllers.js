import cartModel from "../models/cart.model.js";

export const getCart = async (req,res) => {
    try {

        const cartId = req.params.cid                           //atributo id rederencia
        const cart = await cartModel.findOne({_id: cartId}) //findOne ({nombre_atributo: valor}) --> findOne({_id: cartId })
        res.status(200).send(cart)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

}

export const createCart = async (req,res) => {
    try {
        const respuesta = await cartModel.create({products: []})
        res.status(201).send(respuesta)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

}

export const insertProductCart = async (req,res) => {
    try {
        const  cartId = req.params.cid
        const productId = req.params.pid
        const {quantity} = req.body
        const cart = await cartModel.findById(cartId) //como agrego un nuebo producto, no es necesario traer todo via popualte

        //consulto si el carrito existe
        if(cart) {
        //consulto si existe o no en el carrito // comparo los id existentes con el producto que ingresa mi usuario
            const indice = cart.products.findIndex(prod => prod.id_prod == productId)

            if (indice != -1) { // si el producto existe
                cart.products[indice].quantity = quantity // actualizo cantidad
            } else {
                cart.products.push({id_prod : productId, quantity: quantity}) //sino creo el producto
            }
        const mensaje = await cartModel.findByIdAndUpdate(cartId, cart) // guardando los cambios
        return res.status(200).send(mensaje)
        
        } else {
            res.status(404).send("Carrito no existe")
        }

   

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

}

