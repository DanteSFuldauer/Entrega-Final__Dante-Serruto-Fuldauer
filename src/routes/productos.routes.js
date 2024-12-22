import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js'

const productRouter = Router()

productRouter.get('/', getProducts)//consultar productos
productRouter.get('/:pid', getProduct)//consultar producto via id
productRouter.post('/', createProduct) /// crear nuevo producto
productRouter.put('/:pid', updateProduct) //actaliza un prod dado su id y pido datos a actualizar
productRouter.delete('/:pid', deleteProduct) //elimina producto dado su id

export default productRouter


