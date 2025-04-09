import React from 'react'
import "./Cart.scss"
function Cart() {
    const items = useSelector((state) => state.cart.items); // Корзинадагы бардык товарларды алуу
    const dispatch = useDispatch(); // Экшнди dispatch кылуу үчүн
  
    // Товардын санын өзгөртүү
    const handleIncrement = (id) => {
      dispatch(updateQuantity({ id, quantity: 1 })); // Товарды көбөйтүү
    };
  
    const handleDecrement = (id) => {
      dispatch(updateQuantity({ id, quantity: -1 })); // Товарды азайтуу
    };
  return (
    <div className="cart container">
    <div className="cart_top">
      <p>Product</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Subtotal</p>
    </div>
  
    {items.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      items.map((item) => (
        <div className="cart_product container" key={item.id}>
          <div>
            <img src={item.thumbnail} alt={item.title} />
          </div>
          <span className="new-price">${item.price}</span>
          <div className="quantity-controls">
            <p>{item.quantity}</p>
            <button>
                <img
                  src={verh}
                  alt="increment"
                  onClick={() => handleIncrement(item.id)} // Санды көбөйтүү
                />
              <img
                src={niz}
                alt="decrement"
                onClick={() => handleDecrement(item.id)} // Санды азайтуу
              />
            </button>
          </div>
          <span className="old-price">
            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
          </span>
        </div>
      ))
    )}
    {/* <div className="btn">
      <button>Return To Shop</button>
      <button>Update Cart</button>
    </div> */}
  </div>
  )
}

export default Cart
