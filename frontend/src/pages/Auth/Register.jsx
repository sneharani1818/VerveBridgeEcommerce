import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()

    //form handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password, phone, address, answer })
            if (res.data.success) {
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 5000);
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong :(')
        }
    }
    return (
        <Layout title='Register | Ecommerce App'>
            <div>
                <h1 className='text-center mb-4'>Register</h1>
                {/* below is form */}
                <div className="row g-3">
                    <div className="col-6">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input required type="text" value={name} className="form-control bg-warning-subtle" name='name' id="inputName" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input required type="email" value={email} className="form-control bg-warning-subtle" name='email' id="inputEmail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input required type="password" value={password} className="form-control bg-warning-subtle" name='password' id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPhone" className="form-label">Phone number</label>
                        <input required type="text" value={phone} className="form-control bg-warning-subtle" name='phone' id="inputPhone" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input required type="text" value={address} className="form-control bg-warning-subtle" name='address' id="inputAddress" onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <input placeholder='What is your primary school name?' required type="text" value={answer} className="form-control bg-warning-subtle" name='answer' id="inputAnswer" onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Register</button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Register