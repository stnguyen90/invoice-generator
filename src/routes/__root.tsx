import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { Models } from "appwrite";

interface RouteContext {
  user: Models.User<Models.Preferences> | null;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  beforeLoad: async ({ context, location }) => {
    console.log("root beforeLoad");

    const { user } = context;
    if (!user) {
      console.log("User isn't logged in");
      if (location.pathname.startsWith("/auth")) return;
      console.log("Redirecting to /auth/sign-in");
      throw redirect({
        to: "/auth/sign-in",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
    console.log("User is logged in");
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
