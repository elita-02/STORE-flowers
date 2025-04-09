import React from 'react'
import "./Korzina.scss"
import Cart from '../../Components/cart/Cart';
function Korzina() {
    const items = useSelector((state) => state.cart.items);

  return (
    <div className="container">
    {items.length === 0 ? (
      <p>Сиздин себетиңиз бош</p>
    ) : (
      items.map((item) => <Cart key={item.id} product={item} />)
    )}
  </div>
  )
}

export default Korzina
