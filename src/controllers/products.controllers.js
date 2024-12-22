import productModel from "../models/product.model.js";


//obtener todos los productos
export const getProducts = async (req,res) => {
    try { //ejecuto el codigo
        const {limit} = req.query
        const prods = await productModel.paginate({}, {limit:1, page:1})
        console.log(prods)
        
        red.status(200).render('templates/home', {productos: prods, js: 'productos.js', css: 'productos.css'})

    } catch(e) { //si suceden errores
        res.status(500).send("Error al consultar productos: ", e)
    }
}

//buscar producto por id
export const getProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)

        if (prod)
            res.status(200).send(prod)
        else
        res.status(404).send("Producto no existe")

    } catch (e) {
        res.status(500).send("Error al consultar producto: ", e)
    }
}

//crear producto
export const createProduct = async (req, res) => {
    try {
        const product = req.body
        const respuesta = await productModel.create(product)
        res.status(201).send("Producto creado correctamente")
    } catch (e) {
        res.status(500).send("Error al crear producto: ", e)
    }
}

//actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid // consulto un id
        const updateProduct = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProd, updateProduct) //dado el id y el objeto a actualizar
        res.status(200).send("Producto actaulizado correctamente")
    } catch (e) {
        res.status(500).send("Error al actualizar producto: ", e)

    }
}

//borrar producto
export const deleteProduct = async (req, res) => {
    try {
        const idProd = req.params.pid // consulto un id
        const respuesta = await productModel.findByIdAndDelete(idProd) //borro segun el id
        res.status(200).send("Producto eliminado correctamente")
    } catch (e) {
        res.status(500).send("Error al eliminar el producto: ", e)
    }
}






