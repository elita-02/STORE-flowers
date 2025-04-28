import React from 'react';
import "./Wishlist.scss";
import WishCard from '../../Components/wishCard/WishCard';
import { useSelector, useDispatch } from "react-redux";
import { removeWish } from '../../redux/wish/wishSlice';

function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeWish(itemId));
  };

  if (items.length === 0) {
    return <div className="wishlist-empty"> У вас нет избранных товаров</div>;
  }

  return (
    <div className="wishlist-page bg "> {/* bg классы бул жерге жылдырылды */}
      <div className="wishlist container ">
        <div className="wishlist-header">
          <p>Список желаемого ({items.length})</p>
        </div>

        <div className="items-list aksy-card-style"> {/* Жаңы класс кошулду */}
  {items.map((item) => (
    <WishCard
      key={item.id}
      data={item}
      onRemove={handleRemoveItem}
    />
  ))}
</div>
      </div>
    </div>
  );
}

export default Wishlist;