import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useCurrentUser = () => {
  const session = useSession();

  const currentUser = useMemo(() => {
    return session?.data?.user;
  }, [session?.data?.user]);

  return currentUser;
};

export default useCurrentUser;
