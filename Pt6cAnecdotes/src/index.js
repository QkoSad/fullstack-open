import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContexProvicer } from "./notificationContex";

import App from "./App";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContexProvicer>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationContexProvicer>
);

