/* eslint-disable @typescript-eslint/no-shadow */
import {useCallback, useReducer, useRef} from 'react';

export interface State<T = any> {
  status: 'idle' | 'pending' | 'resolved' | 'rejected' | 'refetching';
  data: T;
  error: Error | null;
}

interface Options<T> {
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
  onCancel?: () => void;
}

const defaultInitialState: State = {
  status: 'idle',
  data: null,
  error: null,
};

export function useAsync<T = any>(initialState: T, opts: Options<T> = {}) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    data: initialState,
  });
  const refOpts = useRef(opts);
  const [{status, data, error}, setState] = useReducer(
    (s: State<T>, a: Partial<State<T>>) => ({...s, ...a}),
    initialStateRef.current,
  );

  const setData = useCallback(
    (data: T) => setState({data, status: 'resolved'}),
    [setState],
  );

  const setError = useCallback(
    (error: Error) => setState({error, status: 'rejected'}),
    [setState],
  );
  const reset = useCallback(
    () => setState(initialStateRef.current),
    [setState],
  );

  refOpts.current = opts;

  const run = useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error('The argument passed must be a promise.');
      }

      setState({status: 'pending'});

      return promise.then(
        (data: T) => {
          setData(data);
          opts.onSuccess?.(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          opts.onError?.(error);
        },
      );
    },
    [setState, setData, setError, opts],
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
