import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// providers
import { LocalesProvider } from "./core/locale/locale.provider";
import { ErrorProvider } from "./core/error/error.provider";

// components
import App from "./app/app";

// helpers
import { getI18nInstance } from "./core/locale/locale.helpers";

const language = LocalesProvider.validateLanguage(
  document.getElementsByTagName("html")[0].getAttribute("lang")
);

const i18n = getI18nInstance(language);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <LocalesProvider i18n={i18n}>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </LocalesProvider>
  </StrictMode>
);
