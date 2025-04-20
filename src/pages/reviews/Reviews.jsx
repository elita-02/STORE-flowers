import React, { useState } from 'react';
import { db, storage } from '../../firebase'; 
import ReviewForm from '../../Components/ReviewForm/ReviewForm';

function Reviews() {


  return (
    <div>
       <ReviewForm/>
    </div>
  );
}

export default Reviews;
