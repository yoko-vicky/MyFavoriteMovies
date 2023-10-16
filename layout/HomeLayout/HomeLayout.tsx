import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import { Header, HeaderVariantType } from '../Header';

interface HomeLayoutPropsType {
  children: ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutPropsType) => {
  return (
    <>
      <Header variant={HeaderVariantType.FIXED} />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
