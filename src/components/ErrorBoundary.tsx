import {Component, PropsWithChildren, ReactNode} from 'react';

type ErrorBoundaryState = {
  error: Error | any;
};

const initialState: ErrorBoundaryState = {
  error: null,
};

export type FallbackProps = {
  error: Error | any;
  resetErrorBoundary: (...args: any[]) => void;
};

type ErrorBoundaryProps = PropsWithChildren<{
  onError: (err: Error) => void;
  onReset?: (err: Error) => void;
  fallback: (props: FallbackProps) => ReactNode;
}>;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  resetErrorBoundary() {
    const {error} = this.state;

    if (error !== null) {
      this.props.onReset?.(error);
      this.setState(initialState);
    }
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    const {fallback} = this.props;
    const {error} = this.state;

    if (error !== null) {
      return fallback({
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }
    return this.props.children;
  }
}
