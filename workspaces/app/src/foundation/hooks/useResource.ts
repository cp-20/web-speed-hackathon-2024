import useImmutableSWR from 'swr/immutable';

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export const useResource = (path: string) => {
  const { data } = useImmutableSWR(path, fetcher);
  return data;
};
