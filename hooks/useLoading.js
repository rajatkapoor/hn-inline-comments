import { useState } from "react";

const useLoading = (initialState = true) => {
  const [isLoading, setLoading] = useState(initialState);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  return { isLoading, startLoading, stopLoading };
};

export default useLoading;
