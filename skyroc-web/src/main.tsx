import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

import { ThemeProvider } from "./features/theme";

createRoot(document.getElementById("root")!).render(
  <>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
  </>,
);
