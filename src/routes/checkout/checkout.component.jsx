import './checkout.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CheckOutItem from '../../components/checkout-tem/checkout-item.component'

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext)
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    Product
                </div>
                <div className='header-block'>
                    Description
                </div>
                <div className='header-block'>
                    Quantity
                </div>
                <div className='header-block'>
                    Price   
                </div>
                <div className='header-block'>
                    Remove
                </div>
            </div>


                {cartItems.map((cartItem) => {
                    const {id, name, quantity} = cartItem
                    return  <CheckOutItem key={cartItem.id} cartItem={cartItem} />
                    
                            })}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout