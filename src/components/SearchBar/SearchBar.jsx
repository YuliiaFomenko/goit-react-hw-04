import React, { useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    onSubmit(inputValue.trim());
    setInputValue("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <IoSearchOutline />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
