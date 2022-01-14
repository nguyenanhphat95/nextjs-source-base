import { PropsWithChildren } from "react";

import {
  QueryClientProvider as RqQueryClientProvider,
  QueryClient,
} from "react-query";

const queryClient = new QueryClient();
function QueryClientProvider({ children }: PropsWithChildren<{}>) {
  return (
    <RqQueryClientProvider client={queryClient}>
      {children}
    </RqQueryClientProvider>
  );
}

export default QueryClientProvider;
