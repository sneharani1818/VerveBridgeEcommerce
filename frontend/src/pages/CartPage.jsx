import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    //total price function
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) => { total = total + item.price })
            return total
        } catch (err) {
            console.log(err)
        }
    }

    //remove item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-4'>
                            {`Hello ${auth?.token && auth?.user.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 0 ? `You have ${cart.length} items in your cart${auth?.token ? "" : " Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <div className="row">
                            {
                                cart?.map((p) => (
                                    <div className="row m-2  card flex-row">
                                        <div className="col-md-4">
                                            <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '150px', objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                                        </div>
                                        <div className="col-md-8">
                                            <h3>{p.name}</h3>
                                            <p>{p.description.substring(0, 30)}</p>
                                            <h4>Price :${p.price}</h4>
                                            <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove from Cart</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-5 px-4">
                        <div className='text-center'>
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                        </div>
                        <h4>Total: ${totalPrice()}</h4>
                        <div className="text-center m-5 p-3" style={{ width: '100%' }}>
                            <button className='btn btn-success'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage