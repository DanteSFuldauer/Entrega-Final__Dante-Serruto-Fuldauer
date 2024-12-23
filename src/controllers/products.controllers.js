import productModel from "../models/product.model.js";


//obtener todos los productos
export const getProducts = async (req,res) => {
    try { //ejecuto el codigo
        const {limit, page, filter, metFilter, ord} = req.query

        const pag = page !== undefined ? page : 1 //si al pagina ingresada consulto por ella sino 1
        const lim = limit !== undefined ? limit : 10
        const query = metFilter !== undefined ? {[metFilter]: filter } : {} //madnar status o ctegory como metodo de filter
        const sortOption = ord ? { price: ord === 'asc' ? 1 : -1 } : {}; //mandar asc o desc

        const prods = await productModel.paginate(query, {limit: lim, page: pag, sort: sortOption})
        console.log(prods);

        // Enviar los productos 
        res.render('index', { title: 'Lista de Productos', productos: prods.docs, hasPrev: prods.hasPrevPage, hasNext: prods.hasNextPage, prevPage: prods.prevPage, nextPage: prods.nextPage, css: 'index.css', js: 'index.js'});

    } catch(e) { //si suceden errores
        res.status(500).send("Error al consultar productos: ", e)
    }
}

//buscar producto por id
export const getProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)

        if (prod) {
             res.render('product', { title: prod.title, product: prod, css: 'product.css', js: 'product.js' });
        } else {
        res.status(404).send("Producto no existe")
        }
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






