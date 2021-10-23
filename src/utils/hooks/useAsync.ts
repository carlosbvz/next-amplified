import * as React from "react";

// TODO: Type this file

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState = {}) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise) => {
      dispatch({ type: "pending" });
      promise.then(
        (fetchData) => {
          dispatch({ type: "resolved", data: fetchData });
        },
        (fetchError: Error) => {
          dispatch({ type: "rejected", error: fetchError });
        }
      );
    },
    [dispatch]
  );

  const setData = React.useCallback(
    (fetchData) => dispatch({ type: "resolved", data: fetchData }),
    [dispatch]
  );
  const setError = React.useCallback(
    (fetchError) => dispatch({ type: "rejected", error: fetchError }),
    [dispatch]
  );

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
}

export { useAsync };
