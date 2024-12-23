import cartModel from "../models/cart.model.js";

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { limit = 10, page = 1, filter, metFilter, ord } = req.query;

        const pag = page !== undefined ? page : 1; // Si la página es ingresada, la consulto; sino, página 1
        const lim = limit !== undefined ? limit : 10; // Si el límite es ingresado, lo utilizo; sino, 10
        const query = metFilter !== undefined ? { [`products.id_prod.${metFilter}`]: new RegExp(filter, 'i') } : {}; // Filtrar por categoría o estado
        const sortOption = ord ? { "products.id_prod.price": ord === 'asc' ? 1 : -1 } : {}; // Ordenar por precio ascendente o descendente

        const cart = await cartModel.findOne({ _id: cartId }).populate({
            path: 'products.id_prod',
            match: query,
            options: {
                limit: lim,
                skip: (pag - 1) * lim,
                sort: sortOption
            }
        });

        if (cart) {
            // Calcular el número total de productos que coinciden con el filtro
            const productsCount = await cartModel.aggregate([
                { $match: { _id: cart._id } },
                { $unwind: "$products" },
                { $match: query },
                { $count: "total" }
            ]);

            const totalProducts = productsCount.length ? productsCount[0].total : 0;

            res.render('cart', {
                title: 'Carrito de Compras',
                cart: cart,
                css: 'cart.css',
                js: 'cart.js',
                hasPrev: pag > 1,
                hasNext: (pag * lim) < totalProducts,
                prevPage: pag - 1,
                nextPage: pag + 1
            });
        } else {
            res.status(404).send("Carrito no existe");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};



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
            const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)

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

export const updateProductsCart = async (req,res) => {
    try {

        const cartId = req.params.cid                           //atributo id rederencia
        const {newProducts} = req.body
        const cart = await cartModel.findOne({_id: cartId}) //findOne ({nombre_atributo: valor}) --> findOne({_id: cartId })
        cart.products = newProducts
        cart.save() //guardo cambios en el modelo de mi bdd
        res.status(200).send(cart)
        
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

}

export const updateQuantityProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid                           //atributo id rederencia
        const productId = req.params.pid
        const {quantity} = req.body
        const cart = await cartModel.findOne({_id: cartId}) //findOne ({nombre_atributo: valor}) --> findOne({_id: cartId })
        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
        if (indice != -1) {
            cart.products[indice].quantity = quantity //actualizo la cantidad
            cart.save() //guardo cambios en el modelo de mi bdd
            res.status(200).send(cart)
        } else {
            res.status(404).send("Producto no existe")
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

}


export const deleteProductCart = async (req,res) => {
    try {

        const cartId = req.params.cid                           //atributo id rederencia

        const productId = req.params.pid
        const cart = await cartModel.findOne({_id: cartId}) //findOne ({nombre_atributo: valor}) --> findOne({_id: cartId })
        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
        if (indice != -1) {
            cart.products.splice(indice, 1)
            cart.save() //guardo cambios en el modelo de mi bdd
            res.status(200).send(cart)
        } else {
            res.status(404).send("Producto no existe")
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

}

export const deleteCart = async (req,res) => {
    try {

        const cartId = req.params.cid                           //atributo id rederencia
        const cart = await cartModel.findOne({_id: cartId}) //findOne ({nombre_atributo: valor}) --> findOne({_id: cartId })
        cart.products = []
        cart.save()

        res.status(200).send(cart)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

}

