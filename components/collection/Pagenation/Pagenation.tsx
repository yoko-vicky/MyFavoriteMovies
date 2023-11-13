import React from 'react';
import Link from 'next/link';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

interface PagenationPropsType {
  currentPage: number;
  totalPages: number;
  pathToPage: string;
}

const Pagenation = ({
  currentPage,
  totalPages,
  pathToPage,
}: PagenationPropsType) => {
  const pathToNext =
    currentPage <= totalPages
      ? `${pathToPage}?page=${currentPage + 1}`
      : undefined;
  const pathToPrev =
    currentPage > 1 ? `${pathToPage}?page=${currentPage - 1}` : undefined;
  return (
    <div>
      {pathToPrev && (
        <Link href={pathToPrev}>
          <AiFillCaretLeft />
        </Link>
      )}
      <div>{`${currentPage} / ${totalPages}`}</div>
      {pathToNext && (
        <Link href={pathToNext}>
          <AiFillCaretRight />
        </Link>
      )}
    </div>
  );
};

export default Pagenation;
