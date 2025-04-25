import React, { useEffect, useRef, useState } from 'react';
import "./Map.scss";

function Mapp() {


  return (

        <div className="map-container">
         <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.444282929978!2d74.59411732424317!3d42.86913787104486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9149c9909b7%3A0x22b7996207594ff!2z0JrRg9GI0LrQuNC90YHQutC-0LTQuNC90L3QsNGPINGE0LDRgNCw0YHQutCw0Y8gMTg4LzEsINCR0LDRgNCw0L3Rj9C70LDQstGB0LrQuNC5!5e0!3m2!1sru!2skg!4v1714041944888!5m2!1sru!2skg"
          loading="lazy"
        >
        </iframe>
      </div>
  );
}

export default Mapp;