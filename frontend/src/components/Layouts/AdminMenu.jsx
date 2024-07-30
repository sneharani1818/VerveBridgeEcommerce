import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <h3 className='text-center'>Admin Panel</h3>
            <div className="text-center">
                <div className="list-group">
                    {/* <NavLink to='' className="list-group-item list-group-item-action active" aria-current="true">An active item</NavLink> */}
                    <NavLink to='/dashboard/admin/create-category' className="list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to='/dashboard/admin/create-product' className="list-group-item list-group-item-action">Add new Products</NavLink>
                    <NavLink to='/dashboard/admin/users' className="list-group-item list-group-item-action">View Users</NavLink>
                    {/* <NavLink to='' className="list-group-item list-group-item-action">And a fifth one</NavLink> */}
                </div>
            </div>

        </>
    )
}

export default AdminMenu