import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../Footer';
import { Header, HeaderVariantType } from '../Header';

interface PageLayoutPropsType {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutPropsType) => {
  return (
    <>
      <Header variant={HeaderVariantType.DEFAULT} />
      {children}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default PageLayout;
