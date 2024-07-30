import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()

    //form handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', { email, newPassword, answer })
            if (res && res.data.success) {
                setTimeout(() => {
                    toast.success(res.data && res.data.message);
                }, 3000);

                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log(err);
            toast.error('Unable to reset Password :(')
        }
    }

    return (
        <Layout title={'Password reset | Ecommerce App'}>
            <div>
                <h1 className='text-center mb-4'>Reset Password</h1>
                {/* below is form */}
                <div className="row g-3 text-start" style={{ margin: '0 20vw' }}>

                    <div className="">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input required type="email" value={email} className="form-control bg-warning-subtle" name='email' id="inputEmail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="">
                        <label htmlFor="inputAnswer" className="form-label">What is your primary school name?</label>
                        <input required type="text" value={answer} className="form-control bg-warning-subtle" name='answer' id="inputAnswer" onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                    <div className="">
                        <label htmlFor="inputPassword" className="form-label">New Password</label>
                        <input required type="password" value={newPassword} className="form-control bg-warning-subtle" name='password' id="inputPassword" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Reset password</button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default ForgotPassword