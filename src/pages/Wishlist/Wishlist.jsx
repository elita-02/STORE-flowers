import React from 'react'
import "./Wishlist.scss"
import WishCard from '../../Components/wishCard/WishCard';
import { useSelector, useDispatch } from "react-redux";
function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleMoveAllToBag = () => {
    items.forEach(item => {
      dispatch(addToCart(item));
    });
  };

  if (items.length === 0) {
    return <div className="wishlist-empty">Your wishlist is empty</div>;
  }

  return (
    <div className="wishlist container">
    <div className="wishlist-header">
      <p>Wishlist ({items.length})</p>
      <button onClick={handleMoveAllToBag}>Заказать</button>
    </div>
    <div className="items-list">
      {items.map((item) => (
        <WishCard key={item.id} data={item}/>
      ))}
    </div>
  </div>
  )
}

export default Wishlist
