import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { queryClient } from "../../lib/app/queryClient";

/**
 * As we are often left with a ton of providers wrapping your app, I like to abstract them all out into one component to
 * keep things readable
 */
export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
