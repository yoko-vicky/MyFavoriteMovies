import React from 'react';
import styles from './SubTitle.module.scss';

interface SubTitlePropsType {
  title: string;
  tag?: 'h2' | 'h3' | 'div';
}
export const SubTitle = ({ title, tag }: SubTitlePropsType) => {
  if (tag === 'h2') return <h2 className={styles.title}>{title}</h2>;
  if (tag === 'h3') return <h3 className={styles.title}>{title}</h3>;
  if (tag === 'div') return <div className={styles.title}>{title}</div>;
};

export default SubTitle;
