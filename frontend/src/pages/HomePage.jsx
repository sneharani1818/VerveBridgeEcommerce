import React, { useState, useEffect } from 'react'
import Layout from '../components/Layouts/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/products/get-product')
            setProducts(data.products)
        } catch (err) {
            console.log(err)
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
        }
    }

    //filter function
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all);
    }

    //lifecycle method
    useEffect(() => {
        if (!checked.length || !radio)
            getAllProducts();
        else
            filterProduct()
        return
    }, [checked.length, radio.length])
    // useEffect(() => {
    //     if (checked.length || radio.length)
    //         filterProduct()
    //     return
    // }, [checked, radio])
    useEffect(() => { getAllCategories(); return }, [])

    //get filter product
    const filterProduct = async () => {
        try {
            console.log('in filter product function!!!!!!')
            const { data } = await axios.post('http://localhost:8080/api/v1/products/product-filters', { checked, radio })
            console.log(data)
            setProducts(data?.products || [])
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout title='Ecommerce App| shop UR stuff'>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className='text-center'>Filter by Category</h4>
                    <div className="d-flex flex-column mx-5 mt-3">
                        {categories?.map(c => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center mt-5'>Filter by Price</h4>
                    <div className="d-flex flex-column mx-5 mt-3">
                        <Radio.Group onChange={e => {
                            setRadio(e.target.value),
                                console.log("values are", checked, radio)
                            // handleFilter(checked, radio)
                        }}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array} >{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column mx-5 mt-3">
                        <button className='btn btn-outline-warning' onClick={() => window.location.reload()}>Reset Filters</button>
                    </div>

                </div>
                <div className="col-md-9">
                    {/* {JSON.stringify(radio, null, 4)}
                    {JSON.stringify(checked, null, 4)} */}
                    <h1 className='text-center'>All products</h1>
                    <div className="d-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {products?.map(p => (
                            // <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}>
                            <div className="card m-1" style={{ width: '18rem', textDecoration: 'none !important' }}>
                                <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '200px', objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button className='btn btn-outline-warning mx-2'>View Product</button>
                                    <button className='btn btn-warning'>Add to Cart</button>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                            // {/* </Link> */ }

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage