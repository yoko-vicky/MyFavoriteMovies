import React, { ReactNode } from 'react';
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
    </>
  );
};

export default PageLayout;
