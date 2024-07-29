import React from 'react'
import Layout from '../components/Layouts/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
    return (
        <Layout>
            <div className='text-center align-self-center my-auto mt-5'>
                <h1>404</h1>
                <h3>Oops! Page not found</h3>
                <Link to="/" className="pnf-btn">
                    <button className='btn btn-warning'>Go Back</button>
                </Link>
            </div>
        </Layout>
    )
}

export default Pagenotfound