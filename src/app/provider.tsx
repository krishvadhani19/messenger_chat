import { QueryProvider } from "@/providers/QueryProvider";
import { SocketProvider } from "@/providers/SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SocketProvider>{children}</SocketProvider>
    </QueryProvider>
  );
}
