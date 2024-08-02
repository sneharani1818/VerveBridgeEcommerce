import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Helmet from 'react-helmet'
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ title, children }) => {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{title}</title>
                {/* <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
                <meta name="author" content={props.author} /> */}

            </Helmet>
            <Header />
            <main className='container-fluid' >
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Ecommerce App | shop UR stuff',
}

export default Layout