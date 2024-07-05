import * as React from "react";

function useDebounce<T>(callback: (...args: T[]) => void, delay: number) {
  const [args, setArgs] = React.useState<T[] | null>(null);

  React.useEffect(() => {
    if (args === null) return;

    const handler = setTimeout(() => {
      callback(...args);
      setArgs(null);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [args, callback, delay]);

  return React.useCallback((...args: T[]) => {
    setArgs(args);
  }, []);
}

export default useDebounce;
