import { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';
// import { animateScroll as scroll } from 'react-scroll';

import {
  MoviesGalleryWrapper,
  Title,
} from 'components/TrendingMovies/TrendingMovies.styled';

import MoviesGalleryList from 'components/MoviesGalleryList/MoviesGalleryList';
import Loader from 'components/Loader/Loader';
import FetchTrendingMovies from 'services/MoviesApi';
import * as Notify from 'services/Notify';

export default function MoviesGallery() {
  const [movies, setMovies] = useState([]);
  //   const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //   const [prevSearchQuery, setPrevSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await FetchTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    //     async function fetchData() {
    //       let loadedImages = 0;
    //       try {
    //         const response = await FetchImages(searchQuery, page, imagesPerPage);

    //         setIsLoading(true);
    //         setPrevSearchQuery(searchQuery);

    //         if (searchQuery !== prevSearchQuery) {
    //           setImages(response.data.hits);
    //           setIsLoading(false);
    //           setTotalImages(response.data.total);
    //           loadedImages = response.data.hits.length;
    //         } else {
    //           const newImages = [...images, ...response.data.hits];
    //           setImages(newImages);
    //           loadedImages = newImages.length;
    //         }

    //         if (
    //           response.data.hits.length > 0 &&
    //           response.data.hits.length < imagesPerPage
    //         ) {
    //           Notify.NotificationInfo(Notify.INFO_MESSAGE);
    //         }

    //         if (!response.data.hits.length) {
    //           Notify.NotificationError(Notify.NO_FOUND_MESSAGE);
    //         }
    //       } catch (error) {
    //         Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
    //       } finally {
    //         setIsLoading(false);
    //       }

    //       if (loadedImages > imagesPerPage) {
    //         scroll.scrollToBottom();
    //       } else {
    //         scroll.scrollToTop();
    //       }
    //     }
    fetchData();
  }, []);

  return (
    <MoviesGalleryWrapper>
      <Title>Trending today</Title>
      <MoviesGalleryList movies={movies} />
      {isLoading && <Loader />}
    </MoviesGalleryWrapper>
  );
}

// MoviesGallery.propTypes = {
//   searchQuery: PropTypes.string,
//   page: PropTypes.number,
//   imagesPerPage: PropTypes.number,
//   loadMore: PropTypes.func,
// };
