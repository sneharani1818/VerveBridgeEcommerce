import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Forms/CategoryForm'
import { Button, Modal } from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', { name })
            console.log(data)
            if (data?.success) {
                toast.success(`${name} is added`)
                setName('')
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong in Input form')
        }
    }

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

    useEffect(() => {
        getAllCategories()
    }, [])

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} updated`)
                setSelected(null)
                setUpdatedName('')
                setVisible(false)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error('Something went wrong')
        }
    }

    //delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`)
            if (data.success) {
                toast.success(`Categoery is deleted`)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title={"Admin dashboard- Categories | Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row mb-5">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9 " style={{ alignItems: 'center' }}>
                        <h1>Manage Categories</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c, index) => (
                                        <>
                                            <tr key={c._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-info mx-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => { handleDelete(c._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory