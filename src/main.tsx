import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./brand.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Store/persistent.ts";
import Loader from "./components/Loader.tsx";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          {/* PersistGate delays rendering until the persisted state is rehydrated */}
          <PersistGate loading={<Loader />} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </Suspense>
    </ThemeProvider>
  </StrictMode>
);
