import React from 'react';
import styles from './Story.module.scss';

interface StoryPropsType {
  story: string;
}

export const Story = ({ story }: StoryPropsType) => {
  if (!story) {
    return <></>;
  }
  return (
    <div className={styles.story}>
      <div className={styles.title}>Story</div>
      <div>{story}</div>
    </div>
  );
};

export default Story;
