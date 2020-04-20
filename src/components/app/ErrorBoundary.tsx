import React from 'react';

type IState = {
  error: any;
  errorInfo: any;
};

class ErrorBoundary extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <div>Please refresh the page</div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
