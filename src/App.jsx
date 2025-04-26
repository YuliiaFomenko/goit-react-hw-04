import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { searchImages } from "./Api";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const perPage = getAdaptivePerPage();
        const results = await searchImages(
          query,
          perPage,
          page
        );

        setImages((prevImages) =>
          page === 1 ? results : [...prevImages, ...results]
        );
        setHasMore(results.length > 0);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };

  useEffect(() => {
    if (page > 1 && !loading) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [images]);

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
      {loading ? (
        <Loader />
      ) : (
        hasMore && <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
