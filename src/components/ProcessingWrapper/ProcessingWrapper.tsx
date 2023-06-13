import React, { FC, PropsWithChildren } from 'react';
import { ErrorPage } from '../ErrorPage';
import { Loading } from '../Loading';

interface ProcessingWrapperProps extends PropsWithChildren {
  loading: boolean;
  errorCode?: number;
}

export const ProcessingWrapper: FC<ProcessingWrapperProps> = ({ errorCode, loading, children }) => {
  if (errorCode) return <ErrorPage code={errorCode} />;

  if (loading) return <Loading />;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
