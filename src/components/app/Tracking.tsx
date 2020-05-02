import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

ReactGA.initialize('UA-165336101-1');

export const PageView = (path?: string) => {
  ReactGA.pageview(path || window.location.pathname + window.location.search);
};

export const Event = (category: string, action: string, label: string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export const WithTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
    console.log('PageTracking', page);
  };

  const HOC = (props: P) => {
    useEffect(() => trackPage(props.location.pathname), [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};
