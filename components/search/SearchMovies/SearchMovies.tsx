import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import Pagenation from '@/components/base/Pagenation/Pagenation';
import { SubTitle } from '@/components/base/SubTitle';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { useSearchContext } from '@/store/SearchContext';
import styles from './SearchMovies.module.scss';

export const SearchMovies = () => {
  const {
    handleInputWordChange,
    searchQuery,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
    handleClearInputWord,
    currentPage,
    totalPages,
  } = useSearchContext();

  if (isSearching) {
    return <LoadingSpinner />;
  }

  if (errorMsg) {
    return (
      <div className={styles.container}>
        <SubTitle title={'Sorry... Could not find a film'} />
        <div className={styles.errorMsg}>{errorMsg}</div>
      </div>
    );
  }

  if (searchedMovies && searchedMovies.length > 0) {
    // return <SliderMovies title={'Search Result'} movies={searchedMovies} />;
    return (
      <div className={styles.container}>
        <SubTitle
          title={`Titles related to: ${searchQuery.replaceAll('+', ' ')}`}
        />
        <MoviesList movies={searchedMovies} />
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          pathToPage={`/search/${searchQuery}`}
        />
      </div>
    );
  }

  return <div></div>;
};

export default SearchMovies;
