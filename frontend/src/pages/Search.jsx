import React from 'react'
import Layout from './../components/Layouts/Layout';
import { useSearch } from '../context/search';

const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={'Search Results|shop Ur stuff'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search results</h1>
                    <h6>{values?.result.length < 1 ? 'No product found' : `${values?.result.length}`}</h6>
                    <div className="d-flex m-5" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {values?.result.map(p => (
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

export default Search