import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [id, setId] = useState('')
    const [shipping, setShipping] = useState(false)

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/categories')
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong in getting category')
        }
    }

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/get-product/${params.slug}`)
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setId(data.product._id)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
            setPhoto(data.product.photo)
        } catch (err) {
            console.log(err)
            toast.error('Error in fetching product details')
        }
    }

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            productData.append("shipping", shipping) // Add this line
            const data = await axios.put(`http://localhost:8080/api/v1/products/update-product/${id}`, productData)
            console.log('hello fjvnjfnvkjdfnvkj')
            console.log([...productData]); // Log FormData contents for debugging
            console.log(data.data.success)
            if (data?.data.success) {
                setTimeout(() => toast.success("Product updated successfully"), 1500)
                navigate('/dashboard/admin/products')
                // location.replace("http://localhost:3000/dashboard/admin/products")
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }

    //delete product function
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Do you really want to delete this product?")
            if (!answer)
                return
            const { data } = await axios.delete(`http://localhost:8080/api/v1/products/delete-product/${id}`)
            if (data.success) {
                setTimeout(() => toast.success('Product deleted successfully'), 1500)
                navigate('/dashboard/admin/products'); // Add this line
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err)
            setTimeout(() => toast.error('Error in deleting product'), 1500)
        }
    }

    useEffect(() => {
        getAllCategories()
        return;
    }, [])

    useEffect(() => {
        getSingleProduct()
        return;
        //eslint-disable-next-line
    }, [])

    return (
        <Layout title={"Admin dashboard- Products | Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row mb-5">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select variant={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }} value={category}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='Name the product' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text-area" value={description} placeholder='Description for the product' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={price} placeholder='Price of the product' className='form-control' onChange={(e) => setPrice(Number(e.target.value) || '')} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder='Quantity' className='form-control' onChange={(e) => setQuantity(Number(e.target.value) || '')} />
                            </div>
                            <div className="mb-3">
                                <select className="form-select" aria-label="Default select example" placeholder="Select Shipping" value={shipping ? '1' : '0'} onChange={(e) => setShipping(e.target.value === '1')}>
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>

                            </div>
                            <div className="mb-3">
                                <label className='btn btn-outline-warning col-md-12 align-center text-center'>
                                    {photo ? photo.name : "Upload photo"}
                                    <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3">{photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt='Product image' height='200px' className='img img-responsive' />
                                </div>
                            ) :
                                <div className="text-center">
                                    <img src={`http://localhost:8080/api/v1/products/product-photo/${id}`} alt='Image' height='200px' className='img img-responsive' />
                                </div>
                            }</div>
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <button className='btn btn-warning' onClick={handleUpdate}>Update Product</button>
                                    </div>
                                    <div className="mb-3">
                                        <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct