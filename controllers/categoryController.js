import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new category created"
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: 'Error in category'
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            err, message: "error while updating category"
        })
    }
}

//getAll categoty
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All categories",
            category
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in getting categories",
            err,
        })
    }
}

//get single category
export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "category found",
            category
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in fetching the category",
            err,
        })
    }
}

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            err,
        })
    }
}
