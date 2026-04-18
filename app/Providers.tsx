"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import AuthLoading from "@/components/loading/AuthLoading";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24 * 7,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkLoaded>{children}</ClerkLoaded>
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen">
              <AuthLoading />
            </div>
          </ClerkLoading>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
