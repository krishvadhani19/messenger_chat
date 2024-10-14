import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "./useSocket";
import queryString from "query-string";

type ChatQueryPropsType = {
  queryKey: string;
  apiUrl: string;
};

const useChatQuery = ({ queryKey, apiUrl }: ChatQueryPropsType) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = queryString.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);

    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      initialPageParam: undefined,
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useChatQuery;
