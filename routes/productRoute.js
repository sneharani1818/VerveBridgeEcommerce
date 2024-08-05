import express from "express";
import { isAdmin, requireSigIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable'

const router = express.Router()

//routes
//add product
router.post('/create-product', requireSigIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSigIn, isAdmin, formidable(), updateProductController)

//get products
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//get product photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//filter products
router.post('/product-filters', productFiltersController)

export default router