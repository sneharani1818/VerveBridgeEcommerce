import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
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

    //add product function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            const { data } = await axios.post('http://localhost:8080/api/v1/products/create-product', productData)
            if (data?.success) {
                toast.success("Product added successfully")
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <Layout title={"Admin dashboard- Products | Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row mb-5">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9">
                        <h1>Add Products</h1>
                        <div className="m-1 w-75">
                            <Select variant={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
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
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Shipping</option>
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
                            <div className="mb-3">{photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt='Select an image' height='200px' className='img img-responsive' />
                                </div>
                            )}</div>
                            <div className="mb-5">
                                <button className='btn btn-warning' onClick={handleCreate}>Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct