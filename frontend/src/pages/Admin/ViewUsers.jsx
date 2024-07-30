import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'

const ViewUsers = () => {
    return (
        <Layout title={"Admin dashboard- All Users | Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ViewUsers