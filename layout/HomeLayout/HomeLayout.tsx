import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer />
    </>
  );
};

export default HomeLayout;
