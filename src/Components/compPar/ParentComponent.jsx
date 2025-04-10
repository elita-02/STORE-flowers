import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/Modal'; 
import { openModal, closeModal, removeItem } from './modalSlice'; 

const ParentComponent = () => {
    const dispatch = useDispatch();
    const { items, isOpen } = useSelector((state) => state.modal);

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id)); // removeItem экшнди чакыруу
    };

    const handleOpenModal = () => {
        dispatch(openModal([{ id: 1, title: 'Товар 1', price: '1000', image: 'image1.jpg' }, { id: 2, title: 'Товар 2', price: '2000', image: 'image2.jpg' }]));
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Модалды ачууну аракет кылыңыз</button>
            <Modal
                isOpen={isOpen} 
                items={items} 
                onClose={() => dispatch(closeModal())} 
                onRemoveItem={handleRemoveItem} 
            />
        </div>
    );
};

export default ParentComponent;
