import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Root } from "./routes/root";
import {
  actionProject,
  loaderProject,
  loaderProjectId,
} from "./services/project_helpers";
import { ErrorPage } from "./routes/error";
import { ResultPanel, ContentPanel } from "./components/panel/panel";
import {
  actionHandleRequest,
  loaderRequestID,
} from "./services/request_helpers";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "./theme";
import "@ailiyah-ui/utils/src/tailwind.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loaderProject,
    errorElement: <ErrorPage />,
    action: actionProject,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/project/:projectId",
            element: <ContentPanel />,
            loader: loaderProjectId,
            action: actionHandleRequest,

            children: [
              {
                path: "/project/:projectId/:requestId",
                action: actionHandleRequest,
                element: <ResultPanel />,
                loader: loaderRequestID,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
