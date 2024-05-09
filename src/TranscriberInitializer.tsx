
import { useEffect } from 'react';
import { loadTranscriber } from '.';

export const TranscriberInitializer = ({ children }) => {
  useEffect(() => {
    console.log("Running the initialization effect for the transcriber");
    loadTranscriber().then((res) => console.log(res ? "success" : "failure"));
  }, []);

  return <>{children}</>;
}