import React from 'react'
import { NavLink, Link, Navigate } from 'react-router-dom'
import { IoCart } from 'react-icons/io5'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'

const Header = () => {
    const [auth, setAuth] = useAuth()

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        })
        localStorage.removeItem('auth')
        setTimeout(() => {
            toast.success('Logged out');
        }, 3000);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark text-white sticky-top">
                <div className="container-fluid">
                    {/* <NavLink to='/' className="navbar-brand" href="#">Ecommerce App</NavLink> */}
                    <Link to='/' className="navbar-brand text-light" href="#">
                        <img src='/ecommerce-app-high-resolution-logo-transparent.svg' alt="Logo" width="30" height="24" className="d-inline-block align-text-top font-weight-bold" />
                        Ecommerce
                    </Link>

                    <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link active text-light link-warning" aria-current="page" >Home</NavLink>
                            </li>
                            {
                                !auth.user ?
                                    (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to='/register' className="nav-link text-light link-warning">Register</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to='/login' className="nav-link text-light link-warning">Login</NavLink>
                                            </li>
                                        </>
                                    ) :
                                    <>
                                        <li className="nav-item">
                                            <NavLink onClick={handleLogout} to='/login' className="nav-link text-light link-warning">Logout</NavLink>
                                        </li>
                                    </>

                            }
                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link text-light link-warning" ><IoCart />(0)</NavLink>
                            </li>

                        </ul>
                        {/* <form className="d-flex" role="search"> */}
                        <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" style={{ width: '20vw' }} />
                        <button className="btn btn-outline-warning" type="submit">Search</button>
                        {/* </form> */}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header