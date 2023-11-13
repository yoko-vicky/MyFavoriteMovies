import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { GenrePills } from '@/components/base/GenrePills';
import HeroBg from '@/public/images/hero-bg.jpg';
import { useMovieCommonDataContext } from '@/store/MovieCommonDataContext';
import { useSearchContext } from '@/store/SearchContext';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import styles from './SearchField.module.scss';

export const SearchField = () => {
  const {
    handleInputWordChange,
    handleClearInputWord,
    // searchWord,
    handleSearchBtnClick,
    searchedMovies,
    existQuery,
    inputWord,
    isSearching,
    errorMsg,
  } = useSearchContext();
  const { genres } = useMovieCommonDataContext();

  return (
    <div
      className={clsx(
        styles.container,
        !!searchedMovies?.length || !!errorMsg ? styles.short : '',
      )}
    >
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={HeroBg}
            alt={'hero background'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
          />
          <div className={styles.imageCover}>
            <div className={styles.searchForm}>
              <h1 className={styles.title}>Discover the perfect film</h1>
              <div className={styles.searchField}>
                <label className={styles.inputLabel}>
                  <BsSearch />
                  <input
                    type="text"
                    placeholder="Movie Title here"
                    className={styles.input}
                    value={inputWord}
                    onChange={handleInputWordChange}
                  />
                  <span
                    onClick={handleClearInputWord}
                    className={styles.clearBtn}
                  >
                    <AiOutlineCloseCircle />
                  </span>
                </label>
                <button
                  className={styles.button}
                  onClick={handleSearchBtnClick}
                  disabled={!existQuery || isSearching}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
              {!searchedMovies?.length && !errorMsg && (
                <div className={styles.genreContainer}>
                  <GenrePills genres={genres} inHome={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
