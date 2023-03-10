import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MoviesGalleryWrapper, Title } from 'pages/Home/Home.styled';

import MoviesGalleryList from 'components/MoviesGallery/MoviesGalleryList/MoviesGalleryList';
import Loader from 'components/Loader/Loader';
import { FetchTrendingMovies } from 'services/MoviesApi';
import * as Notify from 'services/Notify';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    fetchData();
  }, []);

  return (
    <main>
      <MoviesGalleryWrapper>
        <Title>Trending today</Title>
        <MoviesGalleryList movies={movies} />
        {isLoading && <Loader />}
      </MoviesGalleryWrapper>
    </main>
  );
}

Home.propTypes = {
  response: PropTypes.object,
};
