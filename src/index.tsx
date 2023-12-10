import React from "react";
import ReactDOM from "react-dom/client";

// providers
import { LocalesProvider } from "./core/locale/locale.provider";

// components
import App from "./App";

// helpers
import { getI18nInstance } from "./core/locale/locale.helpers";
import reportWebVitals from "./reportWebVitals";

// styles
import "./index.css";

const language = LocalesProvider.validateLanguage(
  document.getElementsByTagName("html")[0].getAttribute("lang")
);

const i18n = getI18nInstance(language);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalesProvider i18n={i18n}>
      <App />
    </LocalesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
