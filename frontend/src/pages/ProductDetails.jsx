import React, { useState, useEffect } from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    console.log(product)
    //initiall details
    useEffect(() => {
        console.log(params)
        if (params?.slug) getProduct()
    }, [params.slug])
    //get product
    const getProduct = async () => {
        try {
            console.log(params.slug)
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product)
            console.log(JSON.stringify(data?.product))
            getSimilarProduct(data?.product?._id, data?.product?.category?._id)
        } catch (err) {
            console.log(err)
        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
            {
                products?.map(p => (
                    // <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}>
                    <div className="card m-1" style={{ width: '18rem', textDecoration: 'none !important' }}>
                        <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '200px', objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 30)}</p>
                            <p className="card-text"> $ {p.price}</p>
                            <button className='btn btn-outline-warning mx-2' onClick={() => navigate(`/product/${p.slug}`)}>View Product</button>
                            <button className='btn btn-warning'>Add to Cart</button>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                    // {/* </Link> */ }

                ))
            }
            console.log(JSON.stringify(data.products))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img src={`http://localhost:8080/api/v1/products/product-photo/${product._id}`} className="card-img-top" alt={product.name} style={{ height: '70vh', objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h4>Name :{product?.name}</h4>
                    <h4>Description :{product?.description}</h4>
                    <h4>Price :{product?.price}</h4>
                    <h4>Category :{product?.category?.name}</h4>
                    <h4>Shipping :{product?.shipping ? 'Yes' : "No"}</h4>
                    <button className='btn btn-warning'>Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row mt-2 p-3">
                <h5>Similar Products</h5>
                {relatedProducts?.map(p => (
                    // <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}>
                    <div className="card m-1" style={{ width: '18rem', textDecoration: 'none !important' }}>
                        <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '200px', objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 30)}</p>
                            <p className="card-text"> $ {p.price}</p>
                            {/* <button className='btn btn-outline-warning mx-2' onClick={() => navigate(`/product/${p.slug}`)}>View Product</button> */}
                            <button className='btn btn-warning'>Add to Cart</button>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                    // {/* </Link> */ }

                ))}
            </div>
        </Layout>
    )
}

export default ProductDetails