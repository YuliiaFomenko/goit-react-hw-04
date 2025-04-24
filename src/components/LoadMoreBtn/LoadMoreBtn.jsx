import React from "react";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button
        className={s.button}
        type="button"
        onClick={onClick}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
