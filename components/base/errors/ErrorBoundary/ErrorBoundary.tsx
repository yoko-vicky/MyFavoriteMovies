/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/utils/logger';
import styles from './ErrorBoundary.module.scss';
import { Button } from '../../Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className={styles.errorBoundary}>
            <div className={styles.content}>
              <h1 className={styles.title}>Sorry... there was an error.</h1>
              <Button
                onClick={() => this.setState({ hasError: false })}
                variant={'outlined'}
                label={'Try Again'}
                className={styles.btn}
              />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
