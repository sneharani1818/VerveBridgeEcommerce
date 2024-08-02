import React, { useState, useEffect } from 'react'
import AdminMenu from './../../components/Layouts/AdminMenu';
import Layout from './../../components/Layouts/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([])

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/products/get-product')
            setProducts(data.products)
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }

    //lifecycle method
    useEffect(() => { getAllProducts() }, [])
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Products list</h1>
                    <div className="d-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {products?.map(p => (
                            <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}>
                                <div className="card m-1" style={{ width: '18rem', textDecoration: 'none !important' }}>
                                    <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '200px', objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Products