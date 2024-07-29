import React from 'react'
import Layout from '../components/Layouts/Layout'
import { IoIosMail } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";

const Contact = () => {
    return (
        <Layout title='ContactUs|Ecommerce'>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <img src="/images/contactus.jpg" alt="img" style={{ height: '70vh' }} />
                    </div>
                    <div class="col mt-3">
                        <div className='bg-dark text-light'><h3>CONTACT US</h3></div>
                        <div className="m-4 text-start">
                            <div className="row">Connect with us 24X7</div>
                            <div className='p-2 row'>
                                <div className="col-1"><IoIosMail /></div>
                                <div className="col">ecommerce@gmail.com</div>
                            </div>
                            <div className='p-2 row'>
                                <div className="col-1"><FaPhoneVolume /></div>
                                <div className="col">+123-4567890</div>
                            </div>
                            <div className='p-2 font-italic row'>
                                <div className="col-1"><IoLocation /></div>
                                <div className="col">Address Line1 <br />Adress Line 2 <br /> Address Line 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact