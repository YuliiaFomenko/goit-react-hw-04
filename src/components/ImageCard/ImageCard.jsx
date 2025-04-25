import React from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={s.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={s.image}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;
