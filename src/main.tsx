import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { account } from "./appwrite";
import "./index.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

function Router() {
  return createRouter({
    routeTree,
    context: {
      user: null,
    },
  });
}

const router = Router();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const query = useQuery({
    queryKey: ["account"],
    queryFn: () => account.get(),
    retry: 0,
  });

  const user = query.data;

  if (query.isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <Loader2 className="h-40 w-40 animate-spin" />
      </div>
    );
  }

  return <RouterProvider router={Router()} context={{ user }} />;
}

// Render the app
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
