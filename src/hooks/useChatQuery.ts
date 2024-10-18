import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "./useSocket";
import queryString from "query-string";
import { MessagesStore } from "@/stores/useMessagesStore";
import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";

type ChatQueryPropsType = {
  queryKey: string;
  apiUrl: string;
};

const useChatQuery = ({ queryKey, apiUrl }: ChatQueryPropsType) => {
  const { isConnected } = useSocket();
  const { setMessages } = MessagesStore();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = queryString.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
        },
      },
      // skip query param if cursor is null
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

  setMessages(
    (data?.pages?.flatMap(
      (page) => page?.messages
    ) as MESSAGE_WITH_MEMBER_WITH_PROFILE[]) || null
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useChatQuery;
