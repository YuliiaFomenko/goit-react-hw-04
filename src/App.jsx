import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { searchImages } from "./Api";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const getAdaptivePerPage = () => {
    const itemWidth = 200 + 16;
    const itemHeight = 200 + 16;

    const maxContentWidth = 1200;
    const effectiveWidth = Math.min(
      window.innerWidth,
      maxContentWidth
    );

    const columns = Math.floor(effectiveWidth / itemWidth);

    const availableHeight = window.innerHeight - 160;
    const rows = Math.ceil(availableHeight / itemHeight);

    return columns * rows || 15;
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setImages([]);
      setHasMore(false);
      setCurrentPage(query);
      setPage(1);

      const perPage = getAdaptivePerPage();

      const results = await searchImages(query, perPage, 1);

      setImages(results);
      setHasMore(results.length > 0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const perPage = getAdaptivePerPage();
    const nextPage = page + 1;

    try {
      setLoadingMore(true);
      setPage(nextPage);

      const results = await searchImages(
        currentPage,
        perPage,
        nextPage
      );

      setImages((prevImages) => [
        ...prevImages,
        ...results,
      ]);
      setHasMore(results.length > 0);

      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }, 100);
    } catch {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && (
        <ErrorMessage text="Something went wrong. Please try again." />
      )}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImageClick={openModal}
        />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
      {loadingMore ? (
        <Loader />
      ) : (
        hasMore && <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
