import productModel from "../models/productModel.js"
import fs from 'fs' //file system
import slugify from "slugify"

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" })
            case !description:
                return res.status(500).send({ error: "Description is required" })
            case !price:
                return res.status(500).send({ error: "Price is required" })
            case !category:
                return res.status(500).send({ error: "Category is required" })
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and <1MB size" })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product added successfully",
            products
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: "Error in adding new product"
        })
    }
}

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            total: products.length,
            message: "All products fetched",
            products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            err
        })
    }
}

//get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in getting the desired product",
            err,
        })
    }
}

//product photu controller
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Could not get photo",
            err,
        })
    }
}

//delete product using its ID
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        await productModel.findByIdAndDelete(req.params.pid).select("photo")
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Product not deleted",
            err,
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" })
            case !description:
                return res.status(500).send({ error: "Description is required" })
            case !price:
                return res.status(500).send({ error: "Price is required" })
            case !category:
                return res.status(500).send({ error: "Category is required" })
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and <1MB size" })
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Product not updated",
            err,
        })
    }
}

//product filter controller
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        console.log('In controller function')
        console.log('Received filters:', { checked, radio }); // Debug log
        // if (checked.length > 0) args.category = { $in: checked }
        if (checked.length > 0) args.category = { '$in': [(checked)] }
        // if (radio != []) { args.price = { $gte: radio[0], $lte: radio[1] } } //gte=greater than equal
        if (JSON.stringify(radio) != '[]') { args.price = { '$gte': radio[0], '$lte': radio[1] } } //gte=greater than equal

        console.log('Query arguments:', args); // Debug log

        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products,
            args,
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            err
        })
    }
}

//product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error in product count",
            err
        })
    }
}

//product list based on page number
export const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            message: 'Error in per page controller',
            err
        })
    }
}

//search product 
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            message: '"Error in searching product',
            err
        })
    }
}

//similar product controller
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid, _id: { $ne: pid } //ne means not included
        }).select("-photo").limit(4).populate("category")
        res.status(200).send({
            success: true,
            products,
        })

    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error whle getting related product",
            err
        })
    }
}