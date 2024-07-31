import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-dark text-light mb-0 p-1 sticky-bottom' style={{ marginTop: '70vh' }}>
            <p className="text-center text-light">
                <Link to='/about' className='text-light link-warning' style={{ textDecoration: 'none' }}>About </Link>
                |
                <Link to='/contact' className='text-light link-warning' style={{ textDecoration: 'none' }}> Contact </Link>
                |
                <Link to='/policy' className='text-light link-warning' style={{ textDecoration: 'none' }}> Privacy Policy</Link>
            </p>
            <h5 className='text-center'>All rights reserved &copy;sneharani1818</h5>
        </div>
    )
}

export default Footer