import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <h3 className='text-center'>Dashboard</h3>
            <div className="text-center">
                <div className="list-group">
                    {/* <NavLink to='' className="list-group-item list-group-item-action active" aria-current="true">An active item</NavLink> */}
                    <NavLink to='/dashboard/user/profile' className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to='/dashboard/user/orders' className="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>

        </>
    )
}

export default UserMenu