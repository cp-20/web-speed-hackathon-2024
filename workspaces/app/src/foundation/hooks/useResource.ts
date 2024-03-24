import { useEffect, useState } from 'react';

export const useResource = (path: string) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then(setData);
  }, [path]);

  return data;
};
