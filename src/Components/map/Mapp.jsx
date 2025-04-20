import React, { useEffect, useRef, useState } from 'react';
import "./Map.scss";

function Mapp() {


  return (

        <div className="map-container">
        <iframe 
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.776284900489!2d76.85162331548127!3d43.23543097913785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883692f027581ad%3A0x2426740f56437e63!2z0JDQu9C80LDRgtGL!5e0!3m2!1sru!2skz!4v1625559876000!5m2!1sru!2skz" 
          loading="lazy">
        </iframe>
      </div>
  );
}

export default Mapp;