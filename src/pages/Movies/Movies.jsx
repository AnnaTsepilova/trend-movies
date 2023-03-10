import { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import { MoviesGalleryWrapper } from 'pages/Home/Home.styled';
import { MoviesPageWrapper } from 'pages/Movies/Movies.styled';

import MoviesSearch from 'components/MoviesSearch/MoviesSearch';
import MoviesGalleryList from 'components/MoviesGallery/MoviesGalleryList/MoviesGalleryList';
import Loader from 'components/Loader/Loader';
import { FetchQueryMovies } from 'services/MoviesApi';
import * as Notify from 'services/Notify';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = newSearchQuery => {
    setSearchQuery(newSearchQuery);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await FetchQueryMovies(searchQuery);
        setMovies(response.data.results);

        if (!response.data.results.length) {
          Notify.NotificationError(Notify.NO_FOUND_MESSAGE);
        }
      } catch (error) {
        Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchQuery]);

  return (
    <MoviesPageWrapper>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <MoviesSearch onSubmit={handleFormSubmit} />
      <MoviesGalleryWrapper>
        {movies && <MoviesGalleryList movies={movies} />}
        {isLoading && <Loader />}
      </MoviesGalleryWrapper>
    </MoviesPageWrapper>
  );
}

Movies.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
