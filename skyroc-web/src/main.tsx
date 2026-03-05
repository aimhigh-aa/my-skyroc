import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

import { ClickToComponent } from "click-to-react-component";

createRoot(document.getElementById("root")!).render(
  <>
    <ClickToComponent />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
);
