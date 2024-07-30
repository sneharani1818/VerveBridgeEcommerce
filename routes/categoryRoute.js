import express from "express";
import { isAdmin, requireSigIn } from './../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, getSingleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//router
//create category
router.post('/create-category', requireSigIn, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSigIn, isAdmin, updateCategoryController)

//getAll category
router.get('/categories', categoryController)

//get single category
router.get('/single-category/:slug', getSingleCategoryController)

//delete categoty
router.delete('/delete-category/:id', requireSigIn, isAdmin, deleteCategoryController)

export default router