import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    //form handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password })
            if (res.data.success) {
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 3000);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong :(')
        }
    }
    return (
        <Layout title='Login | Ecommerce App'>
            <div>
                <h1 className='text-center mb-4'>Login</h1>
                {/* below is form */}
                <div className="row g-3 text-start" style={{ margin: '0 20vw' }}>

                    <div className="">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input required type="email" value={email} className="form-control bg-warning-subtle" name='email' id="inputEmail4" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input required type="password" value={password} className="form-control bg-warning-subtle" name='password' id="inputPassword4" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-outline-warning" onClick={() => { navigate('/forgot-password') }}>Forgot password</button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Login