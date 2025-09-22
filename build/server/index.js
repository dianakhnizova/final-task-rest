import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Meta, Links, Link, useLoaderData, Form as Form$1, useNavigate, isRouteErrorResponse, createCookie, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, ScrollRestoration, Scripts, useLocation, useSearchParams, useFetcher, redirect } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createSlice, configureStore, bindActionCreators } from "@reduxjs/toolkit";
import { useState, useEffect, useRef, createContext, useContext, useLayoutEffect, useMemo, useId, lazy, Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation, initReactI18next, I18nextProvider } from "react-i18next";
import { useDispatch, useSelector, Provider } from "react-redux";
import clsx$1, { clsx } from "clsx";
import { createBrowserClient, createServerClient, serializeCookieHeader, parseCookieHeader } from "@supabase/ssr";
import i18n$1 from "i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import Prism from "prismjs";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-markup.js";
import Editor from "react-simple-code-editor";
import { Prism as Prism$1 } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body2 = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body2);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body2);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error2) {
          reject(error2);
        },
        onError(error2) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error2);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const initialState$2 = {
  globalVariables: [],
  isLoaded: false
};
const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState$2,
  reducers: {
    addVariable: (state, action2) => {
      state.globalVariables.push(action2.payload);
    },
    removeVariable: (state, action2) => {
      let variables = [...state.globalVariables];
      variables = variables.filter((variable) => variable.id !== action2.payload);
      state.globalVariables = variables;
    },
    updateVariable: (state, action2) => {
      const variables = [...state.globalVariables];
      const index2 = variables.findIndex(
        (variable) => variable.id === action2.payload.id
      );
      variables[index2] = action2.payload;
      state.globalVariables = variables;
    },
    loadSettings: (_state, action2) => {
      return { ...action2.payload, isLoaded: true };
    }
  }
});
const settingsReducer = settingsSlice.reducer;
const settingsActions = settingsSlice.actions;
const settingsLSKey = "settings";
const saveSettingsToLS = (settings) => {
  const json = JSON.stringify(settings);
  localStorage.setItem(settingsLSKey, json);
};
const loadSettingsFromLS = () => {
  const json = localStorage.getItem(settingsLSKey);
  return json ? JSON.parse(json) : initialState$2;
};
const clearSettingsLS = () => localStorage.removeItem(settingsLSKey);
const initialState$1 = {
  currentUser: null,
  error: null
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState$1,
  reducers: {
    setUser: (state, action2) => {
      state.currentUser = action2.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setError: (state, action2) => {
      state.error = action2.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});
const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
var Variant = /* @__PURE__ */ ((Variant2) => {
  Variant2["PRIMARY"] = "primary";
  Variant2["SECONDARY"] = "secondary";
  Variant2["TERTIARY"] = "tertiary";
  Variant2["ICON"] = "icon";
  return Variant2;
})(Variant || {});
var AppRoutes = /* @__PURE__ */ ((AppRoutes2) => {
  AppRoutes2["HOME"] = "/";
  AppRoutes2["PRIVATE"] = "";
  AppRoutes2["NOT_FOUND"] = "*";
  AppRoutes2["SIGN_IN"] = "/signIn";
  AppRoutes2["SIGN_UP"] = "/signUp";
  AppRoutes2["VARIABLES"] = "/variables";
  AppRoutes2["HISTORY"] = "/history";
  AppRoutes2["REST_CLIENT"] = "/restClient";
  AppRoutes2["FETCH"] = "/api/fetch";
  AppRoutes2["LANGUAGE"] = "/set-language";
  return AppRoutes2;
})(AppRoutes || {});
var InputType = /* @__PURE__ */ ((InputType2) => {
  InputType2["TEXT"] = "text";
  InputType2["CHECKBOX"] = "checkbox";
  InputType2["RADIO"] = "radio";
  InputType2["PASSWORD"] = "password";
  InputType2["E_MAIL"] = "email";
  InputType2["HIDDEN"] = "hidden";
  return InputType2;
})(InputType || {});
var InputID = /* @__PURE__ */ ((InputID2) => {
  InputID2["ID_EMAIL"] = "email";
  InputID2["ID_NAME"] = "name";
  InputID2["ID_PASSWORD"] = "password";
  InputID2["ID_CONFIRM_PASSWORD"] = "confirmPassword";
  InputID2["ID_URL"] = "url";
  InputID2["ID_HEADER_KEY"] = "header_key";
  InputID2["ID_HEADER_VALUE"] = "header_value";
  InputID2["ID_METHOD"] = "method";
  InputID2["ID_PROTOCOL"] = "protocol";
  InputID2["ID_BODY"] = "body";
  InputID2["ID_HEADERS"] = "headers";
  InputID2["ID_VARIABLES"] = "variables";
  return InputID2;
})(InputID || {});
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2[ErrorCode2["OK"] = 200] = "OK";
  ErrorCode2[ErrorCode2["CREATED"] = 201] = "CREATED";
  ErrorCode2[ErrorCode2["NO_CONTENT"] = 204] = "NO_CONTENT";
  ErrorCode2[ErrorCode2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  ErrorCode2[ErrorCode2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  ErrorCode2[ErrorCode2["FORBIDDEN"] = 403] = "FORBIDDEN";
  ErrorCode2[ErrorCode2["NOT_FOUND"] = 404] = "NOT_FOUND";
  ErrorCode2[ErrorCode2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  ErrorCode2[ErrorCode2["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  ErrorCode2[ErrorCode2["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  return ErrorCode2;
})(ErrorCode || {});
var ButtonType = /* @__PURE__ */ ((ButtonType2) => {
  ButtonType2["SUBMIT"] = "submit";
  return ButtonType2;
})(ButtonType || {});
var DisplayName = /* @__PURE__ */ ((DisplayName2) => {
  DisplayName2["PORTAL"] = "Portal";
  DisplayName2["BUTTON"] = "Button";
  DisplayName2["LOADER"] = "Waiting Loader";
  return DisplayName2;
})(DisplayName || {});
var LS_KEY = /* @__PURE__ */ ((LS_KEY2) => {
  LS_KEY2["USER"] = "user";
  LS_KEY2["THEME"] = "theme";
  return LS_KEY2;
})(LS_KEY || {});
var AuthErrors = /* @__PURE__ */ ((AuthErrors2) => {
  AuthErrors2["USER_EXIST"] = "user_already_exists";
  AuthErrors2["CREDENTIALS_INVALID"] = "invalid_credentials";
  AuthErrors2["NOT_CONFIRMED"] = "email_not_confirmed";
  return AuthErrors2;
})(AuthErrors || {});
var WrapperId = /* @__PURE__ */ ((WrapperId2) => {
  WrapperId2["default"] = "wrapper";
  WrapperId2["header"] = "wrapperHeader";
  WrapperId2["footer"] = "wrapperFooter";
  return WrapperId2;
})(WrapperId || {});
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2["DARK"] = "dark";
  Theme2["LIGHT"] = "light";
  return Theme2;
})(Theme || {});
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["EN"] = "en";
  Language2["RU"] = "ru";
  return Language2;
})(Language || {});
var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
  HttpMethods2["GET"] = "GET";
  HttpMethods2["POST"] = "POST";
  HttpMethods2["PUT"] = "PUT";
  HttpMethods2["PATCH"] = "PATCH";
  HttpMethods2["DELETE"] = "DELETE";
  HttpMethods2["HEAD"] = "HEAD";
  HttpMethods2["OPTIONS"] = "OPTIONS";
  HttpMethods2["TRACE"] = "TRACE";
  HttpMethods2["CONNECT"] = "CONNECT";
  return HttpMethods2;
})(HttpMethods || {});
var InputName = /* @__PURE__ */ ((InputName2) => {
  InputName2["URL"] = "url";
  InputName2["METHOD"] = "method";
  InputName2["PROTOCOL"] = "protocol";
  InputName2["BODY"] = "body";
  InputName2["HEADERS"] = "headers";
  InputName2["VARIABLES"] = "variables";
  InputName2["LANGUAGE"] = "lng";
  return InputName2;
})(InputName || {});
var Protocols = /* @__PURE__ */ ((Protocols2) => {
  Protocols2["HTTP"] = "http://";
  Protocols2["HTTPS"] = "https://";
  return Protocols2;
})(Protocols || {});
var Parsers = /* @__PURE__ */ ((Parsers2) => {
  Parsers2["JSON"] = "json";
  Parsers2["TEXT"] = "text";
  Parsers2["RAW"] = "raw";
  Parsers2["HTML"] = "html";
  Parsers2["XML"] = "xml";
  return Parsers2;
})(Parsers || {});
var HttpStatusText = /* @__PURE__ */ ((HttpStatusText2) => {
  HttpStatusText2["OK"] = "OK";
  HttpStatusText2["CREATED"] = "Created";
  HttpStatusText2["NO_CONTENT"] = "No Content";
  HttpStatusText2["BAD_REQUEST"] = "Bad Request";
  HttpStatusText2["UNAUTHORIZED"] = "Unauthorized";
  HttpStatusText2["FORBIDDEN"] = "Forbidden";
  HttpStatusText2["NOT_FOUND"] = "Not Found";
  HttpStatusText2["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
  HttpStatusText2["BAD_GATEWAY"] = "Bad Gateway";
  HttpStatusText2["SERVICE_UNAVAILABLE"] = "Service Unavailable";
  HttpStatusText2["UNKNOWN"] = "Unknown";
  return HttpStatusText2;
})(HttpStatusText || {});
var CodeLanguage = /* @__PURE__ */ ((CodeLanguage2) => {
  CodeLanguage2["CURL"] = "curl";
  CodeLanguage2["JAVASCRIPT"] = "JavaScript";
  CodeLanguage2["XHR"] = "XHR";
  CodeLanguage2["NODEJS"] = "nodejs";
  CodeLanguage2["PYTHON"] = "python";
  CodeLanguage2["JAVA"] = "java";
  CodeLanguage2["CSHARP"] = "csharp";
  CodeLanguage2["GO"] = "go";
  return CodeLanguage2;
})(CodeLanguage || {});
var CodeVariant = /* @__PURE__ */ ((CodeVariant2) => {
  CodeVariant2["FETCH"] = "fetch";
  CodeVariant2["XHR"] = "xhr";
  CodeVariant2["NATIVE"] = "native";
  CodeVariant2["REQUEST"] = "request";
  CodeVariant2["HTTP_CLIENT"] = "http-client";
  CodeVariant2["CURL"] = "curl";
  CodeVariant2["HTTP"] = "http";
  CodeVariant2["NET_HTTP"] = "net-http";
  return CodeVariant2;
})(CodeVariant || {});
var LoaderStatus = /* @__PURE__ */ ((LoaderStatus2) => {
  LoaderStatus2["LOADING"] = "loading";
  LoaderStatus2["SUBMITTING"] = "submitting";
  return LoaderStatus2;
})(LoaderStatus || {});
var EditableField = /* @__PURE__ */ ((EditableField2) => {
  EditableField2["KEY"] = "key";
  EditableField2["VALUE"] = "value";
  return EditableField2;
})(EditableField || {});
const initialState = {
  method: HttpMethods.GET,
  protocol: Protocols.HTTP,
  url: "",
  headers: [],
  parser: Parsers.JSON,
  body: "",
  code: {
    generatedCode: null,
    error: null
  },
  language: CodeLanguage.JAVASCRIPT
};
const restClientSlice = createSlice({
  name: "restClient",
  initialState,
  reducers: {
    setState: (_state, action2) => {
      return action2.payload;
    },
    setMethod(state, action2) {
      state.method = action2.payload;
    },
    setProtocol(state, action2) {
      state.protocol = action2.payload;
    },
    setUrl(state, action2) {
      state.url = action2.payload;
    },
    setParser(state, action2) {
      state.parser = action2.payload;
    },
    setBody: (state, action2) => {
      state.body = action2.payload;
    },
    setCode(state, action2) {
      state.code = action2.payload;
    },
    clearCode(state) {
      state.code = { generatedCode: null, error: null };
    },
    setLanguage(state, action2) {
      state.language = action2.payload;
    },
    addHeader(state, action2) {
      state.headers.push(action2.payload);
    },
    updateHeader(state, action2) {
      const updatedHeader = action2.payload;
      const index2 = state.headers.findIndex(
        (header2) => header2.id === updatedHeader.id
      );
      state.headers[index2] = updatedHeader;
    },
    removeHeader(state, action2) {
      let headers2 = [...state.headers];
      headers2 = headers2.filter((header2) => header2.id !== action2.payload);
      state.headers = headers2;
    }
  }
});
const restClientReducer = restClientSlice.reducer;
const restClientActions = restClientSlice.actions;
const store = configureStore({
  reducer: {
    auth: authReducer,
    restClient: restClientReducer,
    settings: settingsReducer
  }
});
store.subscribe(() => {
  const state = store.getState();
  if (!state.settings.isLoaded) return;
  saveSettingsToLS(state.settings);
});
const errors = {
  parseError: "Failed to parse user data from localStorage:",
  codeGeneratorError: "Error code generation",
  urlError: "Cannot generate code: URL is required",
  languageError: "Code generation for this language is not supported",
  themeError: "useTheme must be used within ThemeProvider"
};
const allActions = {
  ...authActions,
  ...restClientActions,
  ...settingsActions
};
const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
const useSaveUserToLS = (key, initialValue) => {
  const { setUser } = useActions();
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setUserToStorage = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
      if (key === LS_KEY.USER) {
        setUser(value);
      }
    } catch (error2) {
      console.log(errors.parseError, error2);
      localStorage.removeItem(LS_KEY.USER);
    }
  };
  const removeUserFromStorage = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (error2) {
      console.log(errors.parseError, error2);
    }
  };
  return { storedValue, setUserToStorage, removeUserFromStorage };
};
const useAppInitializer = () => {
  const { setUser, loadSettings } = useActions();
  const { removeUserFromStorage } = useSaveUserToLS(LS_KEY.USER, null);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LS_KEY.USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error2) {
      console.log(errors.parseError, error2);
      removeUserFromStorage();
      clearSettingsLS();
    }
    loadSettings(loadSettingsFromLS());
    setIsInitialized(true);
  }, []);
  return isInitialized;
};
function AppInitWrapper({ children }) {
  useAppInitializer();
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const WRAPPER_ROOT_PORTAL_ID = "root-portal";
const GITHUB_PROJECT_URL = "https://github.com/dianakhnizova/final-task-rest";
const RSS_COURSE_URL = "https://rs.school/courses/reactjs";
const PASSWORD_UNICODE_REGEX = {
  LETTER: new RegExp("\\p{L}", "u"),
  DIGIT: new RegExp("\\p{N}", "u"),
  SPECIAL: /[^ \p{L}\p{N}]/u
};
const NAME_REGEX = /^[A-ZА-ЯЁ]/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const LOGO_URL = "./snake.svg";
const TOAST_DURATION = 4e3;
const TOAST_DURATION_LONG = 2e4;
({
  [CodeLanguage.CURL]: [CodeVariant.CURL],
  [CodeLanguage.JAVASCRIPT]: [CodeVariant.FETCH, CodeVariant.XHR],
  [CodeLanguage.NODEJS]: [CodeVariant.NATIVE, CodeVariant.REQUEST],
  [CodeLanguage.PYTHON]: [CodeVariant.HTTP_CLIENT],
  [CodeLanguage.JAVA]: [CodeVariant.HTTP_CLIENT],
  [CodeLanguage.CSHARP]: [CodeVariant.HTTP_CLIENT],
  [CodeLanguage.GO]: [CodeVariant.HTTP],
  [CodeLanguage.XHR]: [CodeVariant.XHR]
});
const GITHUB_ALEXANDR = "https://github.com/alvi0avcc";
const GITHUB_DIANA = "https://github.com/dianakhnizova";
const GITHUB_ALEX = "https://github.com/VavilovAlex";
const DEFAULT_BODY = `{
	"name": "Add your name in the body"
}`;
const REQUEST_DATA_NAME = "requestData";
const headerLogo = "_headerLogo_13vs1_1";
const headerIcon = "_headerIcon_13vs1_13";
const footerIcon = "_footerIcon_13vs1_18";
const styles$s = {
  headerLogo,
  headerIcon,
  footerIcon
};
const GithubLogo = () => /* @__PURE__ */ jsx(
  "svg",
  {
    "data-testid": "icon",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-2 -2 24 24",
    fill: "currentColor",
    className: styles$s.footerIcon,
    children: /* @__PURE__ */ jsx("path", { d: "M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" })
  }
);
const header$5 = {
  textInsteadLogo: 'Snake logo of the "Studio team"'
};
const Logo = () => /* @__PURE__ */ jsx("div", { className: styles$s.headerLogo, children: /* @__PURE__ */ jsx("img", { "data-testid": "icon", src: LOGO_URL, alt: header$5.textInsteadLogo }) });
const RsSchoolLogo = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    "data-testid": "icon",
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: styles$s.footerIcon,
    children: [
      /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_5701_38384)", children: [
        /* @__PURE__ */ jsx("circle", { cx: "32", cy: "32", r: "32", fill: "black" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M13 21.5095V42.5L19.3067 42.4621V33.9474C20.0567 33.9474 20.7616 33.9775 21.4049 34.4267C21.8946 34.8785 22.2838 35.4335 22.546 36.054L25.9202 42.4621H33C31.5957 39.6675 30.4706 36.1327 28.0552 34.0104C27.5455 33.6749 26.9919 33.4158 26.411 33.241C27.1873 33.0779 27.9357 32.7973 28.6319 32.4084C30.3855 31.3375 31.3915 29.3808 31.3436 27.3374C31.3798 26.1328 31.0495 24.9466 30.3988 23.9441C28.9256 21.6883 25.9337 21.4213 23.4663 21.5095H13ZM21.9939 30.0116H19.3313V25.6975H22.1043C23.4807 25.5594 25.1814 26.1754 25.0859 27.8041C25.1499 29.5621 23.3647 29.9127 21.9939 30.0116Z",
            fill: "#FFB749"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M39.4768 35.089L33 35.4666C33.1262 37.3671 34.0021 39.16 35.4636 40.5088C36.9117 41.8323 39.5076 42.4941 43.2515 42.4941C46.3564 42.5823 49.9058 41.8146 51.821 39.1569C52.5929 38.0934 53.0033 36.8427 52.9998 35.564C53.0217 33.1848 51.4339 31.2297 49.3044 30.3147C47.2632 29.4766 45.1198 28.8674 42.9204 28.5C42.1107 28.41 41.3327 28.1563 40.6423 27.757C39.9039 27.2597 40.078 26.2272 40.735 25.7596C42.6084 24.5207 45.6299 25.5545 45.8608 27.9032L52.2845 27.5621C52.1703 25.768 51.1844 24.0545 49.6356 22.9583C47.6987 21.8887 45.4532 21.3874 43.1986 21.5212C41.3493 21.4527 39.5037 21.7218 37.7682 22.3128C35.6082 23.1125 33.829 25.064 33.8344 27.4525C33.7931 28.9377 34.5158 30.4088 35.755 31.3621C37.6454 32.6238 39.8325 33.4582 42.139 33.798C43.3833 33.9637 44.5727 34.3795 45.6224 35.0159C46.5878 35.7309 46.5807 37.167 45.5959 37.8903C44.5078 38.6532 42.9034 38.7416 41.6818 38.2468C40.3717 37.716 39.6048 36.4784 39.4768 35.089Z",
            fill: "#FFB749"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_5701_38384", children: /* @__PURE__ */ jsx("rect", { width: "64", height: "64", fill: "white" }) }) })
    ]
  }
);
const LanguageIcon = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "icon",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: styles$s.headerIcon,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: " M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
        }
      )
    }
  );
};
const SunIcon = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "icon",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      className: styles$s.headerIcon,
      children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", transform: "translate(-442 -200)", children: [
        /* @__PURE__ */ jsxs("g", { fill: "currentColor", transform: "translate(356 144)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "nonzero",
              d: "M108.5 24C108.5 27.5902136 105.590214 30.5 102 30.5 98.4097864 30.5 95.5 27.5902136 95.5 24 95.5 20.4097864 98.4097864 17.5 102 17.5 105.590214 17.5 108.5 20.4097864 108.5 24zM107 24C107 21.2382136 104.761786 19 102 19 99.2382136 19 97 21.2382136 97 24 97 26.7617864 99.2382136 29 102 29 104.761786 29 107 26.7617864 107 24zM101 12.75L101 14.75C101 15.1642136 101.335786 15.5 101.75 15.5 102.164214 15.5 102.5 15.1642136 102.5 14.75L102.5 12.75C102.5 12.3357864 102.164214 12 101.75 12 101.335786 12 101 12.3357864 101 12.75zM95.7255165 14.6323616L96.7485165 16.4038616C96.9556573 16.7625614 97.4143618 16.8854243 97.7730616 16.6782835 98.1317614 16.4711427 98.2546243 16.0124382 98.0474835 15.6537384L97.0244835 13.8822384C96.8173427 13.5235386 96.3586382 13.4006757 95.9999384 13.6078165 95.6412386 13.8149573 95.5183757 14.2736618 95.7255165 14.6323616zM91.8822384 19.0244835L93.6537384 20.0474835C94.0124382 20.2546243 94.4711427 20.1317614 94.6782835 19.7730616 94.8854243 19.4143618 94.7625614 18.9556573 94.4038616 18.7485165L92.6323616 17.7255165C92.2736618 17.5183757 91.8149573 17.6412386 91.6078165 17.9999384 91.4006757 18.3586382 91.5235386 18.8173427 91.8822384 19.0244835zM90.75 25L92.75 25C93.1642136 25 93.5 24.6642136 93.5 24.25 93.5 23.8357864 93.1642136 23.5 92.75 23.5L90.75 23.5C90.3357864 23.5 90 23.8357864 90 24.25 90 24.6642136 90.3357864 25 90.75 25zM92.6323616 30.2744835L94.4038616 29.2514835C94.7625614 29.0443427 94.8854243 28.5856382 94.6782835 28.2269384 94.4711427 27.8682386 94.0124382 27.7453757 93.6537384 27.9525165L91.8822384 28.9755165C91.5235386 29.1826573 91.4006757 29.6413618 91.6078165 30.0000616 91.8149573 30.3587614 92.2736618 30.4816243 92.6323616 30.2744835zM97.0244835 34.1177616L98.0474835 32.3462616C98.2546243 31.9875618 98.1317614 31.5288573 97.7730616 31.3217165 97.4143618 31.1145757 96.9556573 31.2374386 96.7485165 31.5961384L95.7255165 33.3676384C95.5183757 33.7263382 95.6412386 34.1850427 95.9999384 34.3921835 96.3586382 34.5993243 96.8173427 34.4764614 97.0244835 34.1177616zM103 35.25L103 33.25C103 32.8357864 102.664214 32.5 102.25 32.5 101.835786 32.5 101.5 32.8357864 101.5 33.25L101.5 35.25C101.5 35.6642136 101.835786 36 102.25 36 102.664214 36 103 35.6642136 103 35.25zM108.274483 33.3676384L107.251483 31.5961384C107.044343 31.2374386 106.585638 31.1145757 106.226938 31.3217165 105.868239 31.5288573 105.745376 31.9875618 105.952517 32.3462616L106.975517 34.1177616C107.182657 34.4764614 107.641362 34.5993243 108.000062 34.3921835 108.358761 34.1850427 108.481624 33.7263382 108.274483 33.3676384zM112.117762 28.9755165L110.346262 27.9525165C109.987562 27.7453757 109.528857 27.8682386 109.321717 28.2269384 109.114576 28.5856382 109.237439 29.0443427 109.596138 29.2514835L111.367638 30.2744835C111.726338 30.4816243 112.185043 30.3587614 112.392183 30.0000616 112.599324 29.6413618 112.476461 29.1826573 112.117762 28.9755165zM113.25 23L111.25 23C110.835786 23 110.5 23.3357864 110.5 23.75 110.5 24.1642136 110.835786 24.5 111.25 24.5L113.25 24.5C113.664214 24.5 114 24.1642136 114 23.75 114 23.3357864 113.664214 23 113.25 23zM111.367638 17.7255165L109.596138 18.7485165C109.237439 18.9556573 109.114576 19.4143618 109.321717 19.7730616 109.528857 20.1317614 109.987562 20.2546243 110.346262 20.0474835L112.117762 19.0244835C112.476461 18.8173427 112.599324 18.3586382 112.392183 17.9999384 112.185043 17.6412386 111.726338 17.5183757 111.367638 17.7255165zM106.975517 13.8822384L105.952517 15.6537384C105.745376 16.0124382 105.868239 16.4711427 106.226938 16.6782835 106.585638 16.8854243 107.044343 16.7625614 107.251483 16.4038616L108.274483 14.6323616C108.481624 14.2736618 108.358761 13.8149573 108.000062 13.6078165 107.641362 13.4006757 107.182657 13.5235386 106.975517 13.8822384z",
              transform: "translate(0 48)",
              stroke: "currentColor",
              strokeWidth: "0.25"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M98.6123,60.1372 C98.6123,59.3552 98.8753,58.6427 99.3368,58.0942 C99.5293,57.8657 99.3933,57.5092 99.0943,57.5017 C99.0793,57.5012 99.0633,57.5007 99.0483,57.5007 C97.1578,57.4747 95.5418,59.0312 95.5008,60.9217 C95.4578,62.8907 97.0408,64.5002 98.9998,64.5002 C99.7793,64.5002 100.4983,64.2452 101.0798,63.8142 C101.3183,63.6372 101.2358,63.2627 100.9478,63.1897 C99.5923,62.8457 98.6123,61.6072 98.6123,60.1372",
              transform: "translate(3 11)"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("polygon", { points: "444 228 468 228 468 204 444 204" })
      ] })
    }
  );
};
const wrapper$2 = "_wrapper_2qj8h_1";
const styles$r = {
  wrapper: wrapper$2
};
const Wrapper = ({
  children,
  id = WrapperId.default,
  className = ""
}) => {
  return /* @__PURE__ */ jsx("div", { id, className: clsx(styles$r.wrapper, className), children });
};
const developerList = [
  {
    nameKey: "developers.alexandr",
    photo: "/alexandr.png"
  },
  {
    nameKey: "developers.diana",
    photo: "/diana.jpg"
  },
  {
    nameKey: "developers.olexandr",
    photo: "/alex.jpg"
  }
];
const developerLinkList = [
  { gitHub: GITHUB_ALEXANDR },
  {
    gitHub: GITHUB_DIANA
  },
  {
    gitHub: GITHUB_ALEX
  }
];
const container$i = "_container_1jpfb_1";
const link$7 = "_link_1jpfb_6";
const styles$q = {
  container: container$i,
  link: link$7
};
const Developerlink = () => {
  return /* @__PURE__ */ jsx("div", { className: styles$q.container, children: developerLinkList.map((link2) => /* @__PURE__ */ jsx(
    "a",
    {
      href: link2.gitHub,
      target: "_blank",
      rel: "noopener noreferrer",
      className: styles$q.link,
      children: link2.gitHub
    },
    link2.gitHub
  )) });
};
const container$h = "_container_1adx2_1";
const info$3 = "_info_1adx2_6";
const separator = "_separator_1adx2_12";
const content$1 = "_content_1adx2_19";
const link$6 = "_link_1adx2_26";
const styles$p = {
  container: container$h,
  info: info$3,
  separator,
  content: content$1,
  link: link$6
};
const Footer = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("footer", { className: styles$p.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$p.separator }),
    /* @__PURE__ */ jsxs(Wrapper, { id: WrapperId.footer, className: styles$p.content, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$p.info, children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: GITHUB_PROJECT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: styles$p.link,
            children: [
              /* @__PURE__ */ jsx(GithubLogo, {}),
              /* @__PURE__ */ jsx("span", { children: t("footer.githubProject") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: RSS_COURSE_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: styles$p.link,
            children: [
              /* @__PURE__ */ jsx(RsSchoolLogo, {}),
              /* @__PURE__ */ jsx("span", { children: t("footer.rsSchoolCourse") })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { children: t("footer.copyright") })
      ] }),
      /* @__PURE__ */ jsx(Developerlink, {})
    ] })
  ] });
};
const Head = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("head", { children: [
    /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    /* @__PURE__ */ jsx("title", { children: t("root.appTitle") }),
    /* @__PURE__ */ jsx("link", { rel: "icon", href: LOGO_URL }),
    /* @__PURE__ */ jsx(Meta, {}),
    /* @__PURE__ */ jsx(Links, {})
  ] });
};
function useInView() {
  const [inView, setInView] = useState(false);
  const triggerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry2]) => {
        setInView(entry2.isIntersecting);
      },
      {
        threshold: 0
      }
    );
    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }
    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, []);
  return [triggerRef, inView];
}
const banner = "_banner_15pda_1";
const header$4 = "_header_15pda_9";
const stuck = "_stuck_15pda_23";
const left = "_left_15pda_30";
const right = "_right_15pda_31";
const home = "_home_15pda_39";
const styles$o = {
  banner,
  header: header$4,
  stuck,
  left,
  right,
  home
};
const NavLogo = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx("div", { className: styles$o.left, children: /* @__PURE__ */ jsxs(Link, { className: styles$o.home, to: AppRoutes.HOME, children: [
    /* @__PURE__ */ jsx(Logo, {}),
    /* @__PURE__ */ jsx("span", { children: t("header.textForLogo") })
  ] }) });
};
const button = "_button_1fot0_1";
const primary = "_primary_1fot0_26";
const secondary = "_secondary_1fot0_35";
const icon = "_icon_1fot0_49";
const styles$n = {
  button,
  primary,
  secondary,
  icon
};
const Button = ({
  variant = Variant.PRIMARY,
  className,
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: clsx$1(styles$n.button, styles$n[variant], className),
      ...rest,
      children
    }
  );
};
Button.displayName = DisplayName.BUTTON;
const LanguageToggler = () => {
  const { locale } = useLoaderData();
  const next = locale === Language.EN ? Language.RU : Language.EN;
  return /* @__PURE__ */ jsxs(Form$1, { method: HttpMethods.POST, action: AppRoutes.LANGUAGE, children: [
    /* @__PURE__ */ jsx("input", { type: InputType.HIDDEN, name: InputName.LANGUAGE, value: next }),
    /* @__PURE__ */ jsx(Button, { variant: Variant.ICON, type: ButtonType.SUBMIT, children: /* @__PURE__ */ jsx(LanguageIcon, {}) })
  ] });
};
const ThemeContext = createContext(
  void 0
);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Theme.DARK);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(errors.themeError);
  }
  return context;
};
const ThemeToggler = () => {
  const { toggleTheme } = useTheme();
  return /* @__PURE__ */ jsx(Button, { onClick: toggleTheme, variant: Variant.ICON, children: /* @__PURE__ */ jsx(SunIcon, {}) });
};
const selectAuth = (state) => state.auth.currentUser?.user;
const selectIsAuthenticated = (state) => {
  if (!state.auth.currentUser?.expiresAt || !state.auth.currentUser.accessToken)
    return false;
  const now = Math.floor(Date.now() / 1e3);
  return state.auth.currentUser.expiresAt !== null && state.auth.currentUser.expiresAt > now;
};
const supabaseUrl = "https://wtikrldnyosaedrvfkjk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aWtybGRueW9zYWVkcnZma2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDA1ODUsImV4cCI6MjA3MjkxNjU4NX0.fRBdkZHaNbrxIpVUhuqnTtv6y5njA5ITOJtdcYhp6Z8";
const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);
function getServerSupabaseClient(request) {
  const headers2 = new Headers();
  const client = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
          ({ name: name2, value }) => ({ name: name2, value: value ?? "" })
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(
          ({ name: name2, value, options }) => headers2.append(
            "Set-Cookie",
            serializeCookieHeader(name2, value, options)
          )
        );
      }
    }
  });
  return {
    client,
    headers: headers2
  };
}
const AuthBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const { clearUser } = useActions();
  const { removeUserFromStorage } = useSaveUserToLS(LS_KEY.USER, null);
  const handleSignIn = () => {
    navigate(AppRoutes.SIGN_IN);
  };
  const handleSignUp = () => {
    navigate(AppRoutes.SIGN_UP);
  };
  const handleLogOut = async () => {
    toast.success(t("toasts.logOutInit"), {
      id: "logOutId",
      duration: TOAST_DURATION_LONG
    });
    await supabase.auth.signOut();
    removeUserFromStorage();
    clearSettingsLS();
    toast.success(`${user?.user_metadata.name} ${t("toasts.logOut")}`, {
      id: "logOutId",
      duration: TOAST_DURATION
    });
    clearUser();
    navigate(AppRoutes.HOME);
  };
  return user ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { onClick: handleLogOut, children: t("buttons.logOut") }),
    /* @__PURE__ */ jsx(Button, { onClick: () => navigate(AppRoutes.HOME), children: t("mainPage.mainPage") })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { onClick: handleSignIn, children: t("buttons.signIn") }),
    /* @__PURE__ */ jsx(Button, { onClick: handleSignUp, children: t("buttons.signUp") })
  ] });
};
const NavOptionMenu = () => {
  return /* @__PURE__ */ jsxs("div", { className: styles$o.right, children: [
    /* @__PURE__ */ jsx(LanguageToggler, {}),
    /* @__PURE__ */ jsx(ThemeToggler, {}),
    /* @__PURE__ */ jsx(AuthBar, {})
  ] });
};
const Header = () => {
  const { t } = useTranslation();
  const [triggerRef, inView] = useInView();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: styles$o.banner, children: /* @__PURE__ */ jsx("h3", { children: t("header.banner") }) }),
    /* @__PURE__ */ jsx("div", { ref: triggerRef }),
    /* @__PURE__ */ jsx("header", { className: clsx(styles$o.header, !inView && styles$o.stuck), children: /* @__PURE__ */ jsx(Wrapper, { id: WrapperId.header, children: /* @__PURE__ */ jsxs("section", { className: clsx(styles$o.header, inView && styles$o.stuck), children: [
      /* @__PURE__ */ jsx(NavLogo, {}),
      /* @__PURE__ */ jsx(NavOptionMenu, {})
    ] }) }) })
  ] });
};
const getErrorData = (error2, t) => {
  if (isRouteErrorResponse(error2)) {
    if (error2.status === ErrorCode.NOT_FOUND) {
      return {
        message: t("errorBoundary.notFound"),
        details: t("errorBoundary.notFound")
      };
    }
    return {
      message: t("errorBoundary.error"),
      details: error2.statusText || t("errorBoundary.details")
    };
  }
  return {
    message: t("errorBoundary.oops"),
    details: t("errorBoundary.details")
  };
};
const errorBoundary$2 = "_errorBoundary_cohph_1";
const errorTitle = "_errorTitle_cohph_7";
const errorDetails = "_errorDetails_cohph_14";
const errorStack = "_errorStack_cohph_19";
const styles$m = {
  errorBoundary: errorBoundary$2,
  errorTitle,
  errorDetails,
  errorStack
};
function ErrorBoundaryComponent({
  error: error2,
  params
}) {
  const { t } = useTranslation();
  const { message, details, stack } = getErrorData(error2, t);
  return /* @__PURE__ */ jsxs("main", { className: styles$m.errorBoundary, children: [
    /* @__PURE__ */ jsx("h1", { className: styles$m.errorTitle, children: message }),
    /* @__PURE__ */ jsx("p", { className: styles$m.errorDetails, children: details }),
    stack && /* @__PURE__ */ jsx("pre", { className: styles$m.errorStack, children: /* @__PURE__ */ jsx("code", { children: stack }) }),
    false
  ] });
}
const i18n = void 0;
const languageCookie = createCookie(InputName.LANGUAGE, {
  maxAge: 30 * 24 * 60 * 60,
  path: AppRoutes.HOME,
  sameSite: "lax"
});
const root$2 = { "appTitle": "REST client" };
const mainPage$2 = { "welcomeNew": "Welcome!", "welcomeOld": "Welcome Back,", "mainPage": "Main Page" };
const header$3 = { "banner": "REST client App", "textForLogo": "Home", "textInsteadLogo": 'Snake logo of the "Studio team"' };
const buttons$1 = { "signIn": "Sign in", "signUp": "Sign up", "headers": "Headers", "generate": "Generate code", "send": "Send request", "delete": "Delete", "logOut": "Log out", "btnRestClient": "REST Client", "btnHistory": "History", "btnVariables": "Variables", "btnBack": "Back to Home Page", "clear": "Clear code" };
const language$1 = { "switchTo": "Switch to", "current": "Current language" };
const aboutUs$1 = { "title": "About course", "name": "React Course", "year": "2025", "project": "Our project is a browser-based REST client that allows you to send HTTP requests, view responses, and save request history. We designed it to be developer-friendly: it supports variables, multiple methods (GET, POST, etc.), code generation for requests, and a flexible interface. The goal of the project is to simplify API testing and exploration directly in the browser without additional tools." };
const keyValueEditor$1 = { "delete": "Delete", "emptyMessage": 'Click the "Add" button to add a value', "add": "Add", "keyPlaceholder": "Key", "valuePlaceholder": "Value" };
const footer$1 = { "copyright": "© 2025", "rsSchoolCourse": "Rs School Course", "githubProject": "Github Project" };
const errorBoundary$1 = { "oops": "Oops!", "details": "An unexpected error occurred.", "notFound": "The requested page could not be found.", "error": "Error", "params": "Params:" };
const loader$4 = { "title": "Loading data..." };
const notFoundPage$2 = { "title": "Page not Found", "metaContent": "Error 404 / Page not Found" };
const bodyEditor$1 = { "codeTitle": "Code: ", "bodyTitle": "Body: " };
const response$2 = { "title": "Response", "headerTitle": "Headers", "key": "key: ", "value": "value: ", "statusTitle": "Status: ", "bodyTitle": "Body: ", "emptyData": "No data yet", "requestBodyTitle": "Request Body:", "emptyRequestHint": 'Enter URL and click "Send request"', "selectParser": "Select parser" };
const label$2 = { "name": "Name", "email": "E-mail", "password": "Password", "confirmPassword": "Confirm password" };
const placeholder$1 = { "name": "Enter your name", "email": "Enter your e-mail", "password": "Enter your password", "confirmPassword": "Confirm password", "key": "key", "value": "value", "url": "Enter url or paste text" };
const variablesPage$2 = { "header": "Variables", "keyHeader": "Key", "valueHeader": "Value" };
const signInPage$2 = { "infoTitle": "Don't have an account?" };
const signUpPage$2 = { "infoTitle": "Already have an account?" };
const table$3 = { "headerKey": "Header key", "headerValue": "Header value", "headerDelete": "Delete" };
const developers$2 = { "alexandr": "Vavilov Alexandr", "diana": "Khnizova Diana", "olexandr": "Vavilov Oleksandr" };
const toasts$2 = { "signCheck": "Checking the user...", "signIn": "Login successful!", "signInId": "signInId", "signUp": "Registration successful! Please check your email to confirm your account", "signUpProcess": "The user registration process is in progress...", "signUpProcessId": "signUpProcessId", "errorConfirmEmail": "Please confirm your email from your inbox before signing in.", "logOutInit": "Disconnect a user from the system...", "logOut": "have been logged out.", "logOutId": "logOutId", "userExist": "This email is already registered. Please try another one.", "userExistId": "userExistId", "invalidPasswordEmail": "Invalid password or e-mail", "tokenExpires": "Token expires" };
const history$1 = { "metaTitle": "REST client App / History", "metaName": "description", "metaContent": "Welcome to History", "header": "History", "table": { "headers": { "action": "Action", "latency": "Latency (ms)", "status": "Status", "timestamp": "Time", "method": "Method", "requestSize": "Request Size", "responseSize": "Response Size", "error": "Error", "url": "URL" }, "emptyMessage": "No requests in history", "openLink": "Open" } };
const en = {
  root: root$2,
  mainPage: mainPage$2,
  header: header$3,
  buttons: buttons$1,
  language: language$1,
  aboutUs: aboutUs$1,
  keyValueEditor: keyValueEditor$1,
  footer: footer$1,
  errorBoundary: errorBoundary$1,
  loader: loader$4,
  notFoundPage: notFoundPage$2,
  bodyEditor: bodyEditor$1,
  response: response$2,
  label: label$2,
  placeholder: placeholder$1,
  variablesPage: variablesPage$2,
  signInPage: signInPage$2,
  signUpPage: signUpPage$2,
  table: table$3,
  developers: developers$2,
  toasts: toasts$2,
  history: history$1
};
const root$1 = { "appTitle": "REST клиент" };
const mainPage$1 = { "welcomeNew": "Добро пожаловать!", "welcomeOld": "Добро пожаловать обратно,", "mainPage": "Главная страница" };
const header$2 = { "banner": "REST клиент приложение", "textForLogo": "Главная", "textInsteadLogo": 'Логотип змеи команды "Studio team"' };
const buttons = { "signIn": "Войти", "signUp": "Регистрация", "headers": "Заголовки", "generate": "Генерировать код", "send": "Отправить запрос", "delete": "Удалить", "logOut": "Выйти", "btnRestClient": "REST Клиент", "btnHistory": "История", "btnVariables": "Переменные", "btnBack": "Вернуться на главную", "clear": "Очистить код" };
const language = { "switchTo": "Переключить на", "current": "Текущий язык" };
const aboutUs = { "title": "О курсе", "name": "React Курс", "year": "2025", "project": "Наш проект — это браузерный REST клиент, который позволяет отправлять HTTP-запросы, просматривать ответы и сохранять историю запросов. Мы сделали его удобным для разработчиков: поддерживаются переменные, несколько методов (GET, POST и др.), генерация кода для запросов и гибкий интерфейс. Цель проекта — упростить тестирование и изучение API прямо в браузере без дополнительных инструментов." };
const images$1 = { "developer": "Фото разработчика" };
const keyValueEditor = { "delete": "Удалить", "emptyMessage": "Нажмите кнопку «Добавить», чтобы добавить значение", "add": "Добавить", "keyPlaceholder": "Ключ", "valuePlaceholder": "Значение" };
const footer = { "copyright": "© 2025", "rsSchoolCourse": "Курс RS School", "githubProject": "Проект на Github" };
const errorBoundary = { "oops": "Упс!", "details": "Произошла непредвиденная ошибка.", "notFound": "Запрошенная страница не найдена.", "error": "Ошибка", "params": "Параметры:" };
const loader$3 = { "title": "Загрузка данных..." };
const notFoundPage$1 = { "title": "Страница не найдена", "metaContent": "Ошибка 404 / Страница не найдена" };
const bodyEditor = { "codeTitle": "Код: ", "bodyTitle": "Тело: " };
const response$1 = { "title": "Ответ", "headerTitle": "Заголовки", "key": "ключ: ", "value": "значение: ", "statusTitle": "Статус: ", "bodyTitle": "Тело: ", "emptyData": "Данных пока нет", "requestBodyTitle": "Тело запроса:", "emptyRequestHint": 'Введите URL и нажмите "Отправить запрос"', "selectParser": "Выберите парсер" };
const label$1 = { "name": "Имя", "email": "Электронная почта", "password": "Пароль", "confirmPassword": "Подтвердите пароль" };
const placeholder = { "name": "Введите ваше имя", "email": "Введите электронную почту", "password": "Введите пароль", "confirmPassword": "Подтвердите пароль", "key": "ключ", "value": "значение", "url": "Введите URL или вставьте текст" };
const variablesPage$1 = { "header": "Переменные", "keyHeader": "Ключ", "valueHeader": "Значение" };
const signInPage$1 = { "infoTitle": "Нет аккаунта?" };
const signUpPage$1 = { "infoTitle": "Уже есть аккаунт?" };
const table$2 = { "headerKey": "Ключ заголовка", "headerValue": "Значение заголовка", "headerDelete": "Удалить" };
const developers$1 = { "alexandr": "Вавилов Александр", "diana": "Хнизова Диана", "olexandr": "Вавилов Олександр" };
const toasts$1 = { "signCheck": "Проверка пользователя...", "signIn": "Вход выполнен успешно!", "signInId": "signInId", "signUp": "Регистрация успешна! Пожалуйста, проверьте вашу почту для подтверждения аккаунта", "signUpProcess": "Процесс регистрации пользователя в процессе...", "signUpProcessId": "signUpProcessId", "errorConfirmEmail": "Пожалуйста, подтвердите вашу почту перед входом.", "logOutInit": "Отключение пользователя из системы...", "logOut": "вышел из системы.", "logOutId": "logOutId", "userExist": "Этот email уже зарегистрирован. Попробуйте другой.", "userExistId": "userExistId", "invalidPasswordEmail": "Неверный пароль или e-mail", "tokenExpires": "Срок действия токена истёк" };
const history = { "metaTitle": "REST клиент / История", "metaName": "описание", "metaContent": "Добро пожаловать в Историю", "header": "История", "table": { "headers": { "action": "Действие", "latency": "Задержка (мс)", "status": "Статус", "timestamp": "Время", "method": "Метод", "requestSize": "Размер запроса", "responseSize": "Размер ответа", "error": "Ошибка", "url": "URL" }, "emptyMessage": "История запросов пуста", "openLink": "Открыть" } };
const ru = {
  root: root$1,
  mainPage: mainPage$1,
  header: header$2,
  buttons,
  language,
  aboutUs,
  images: images$1,
  keyValueEditor,
  footer,
  errorBoundary,
  loader: loader$3,
  notFoundPage: notFoundPage$1,
  bodyEditor,
  response: response$1,
  label: label$1,
  placeholder,
  variablesPage: variablesPage$1,
  signInPage: signInPage$1,
  signUpPage: signUpPage$1,
  table: table$2,
  developers: developers$1,
  toasts: toasts$1,
  history
};
i18n$1.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru }
  },
  fallbackLng: Language.EN,
  supportedLngs: [Language.EN, Language.RU],
  interpolation: { escapeValue: false }
});
async function getLocale(request) {
  const cookieHeader = request.headers.get("Cookie");
  const lng = await languageCookie.parse(cookieHeader) || Language.EN;
  return [Language.EN, Language.RU].includes(lng) ? lng : Language.EN;
}
const loader$2 = async ({
  request
}) => {
  const locale = await getLocale(request);
  return {
    locale
  };
};
function Layout({
  children
}) {
  const {
    locale
  } = useLoaderData();
  useEffect(() => {
    {
      console.log("i18n is not properly initialized:", i18n);
    }
  }, [locale]);
  return /* @__PURE__ */ jsxs("html", {
    lang: locale,
    "data-theme": Theme.DARK,
    children: [/* @__PURE__ */ jsx(Head, {}), /* @__PURE__ */ jsx("body", {
      children: /* @__PURE__ */ jsx(Provider, {
        store,
        children: /* @__PURE__ */ jsx(ThemeProvider, {
          children: /* @__PURE__ */ jsx(I18nextProvider, {
            i18n,
            children: /* @__PURE__ */ jsxs(AppInitWrapper, {
              children: [/* @__PURE__ */ jsxs("div", {
                id: "root",
                children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(Wrapper, {
                  children
                }), /* @__PURE__ */ jsx(Footer, {})]
              }), /* @__PURE__ */ jsx(Toaster, {
                position: "bottom-right",
                toastOptions: {
                  duration: TOAST_DURATION
                }
              }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
            })
          })
        })
      })
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error: error2,
  params
}) {
  return /* @__PURE__ */ jsx(ErrorBoundaryComponent, {
    error: error2,
    params
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const mainPage = {
  metaTitle: "REST client App",
  metaName: "description",
  metaContent: "Welcome to REST client App!"
};
const images = {
  close: "Close",
  loading: "Loading data",
  developer: "Developer"
};
const container$g = "_container_pxgcr_1";
const developersContainer = "_developersContainer_pxgcr_13";
const developers = "_developers_pxgcr_13";
const image$1 = "_image_pxgcr_28";
const project = "_project_pxgcr_35";
const course = "_course_pxgcr_43";
const title$5 = "_title_pxgcr_50";
const info$2 = "_info_pxgcr_54";
const courseInfo = "_courseInfo_pxgcr_65";
const styles$l = {
  container: container$g,
  developersContainer,
  developers,
  image: image$1,
  project,
  course,
  title: title$5,
  info: info$2,
  courseInfo
};
const AboutUs = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: styles$l.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$l.developersContainer, children: developerList.map((developer) => /* @__PURE__ */ jsxs("div", { className: styles$l.developers, children: [
      /* @__PURE__ */ jsx("p", { children: t(developer.nameKey) }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: developer.photo,
          alt: images.developer,
          className: styles$l.image
        }
      )
    ] }, developer.nameKey)) }),
    /* @__PURE__ */ jsx("p", { className: styles$l.project, children: t("aboutUs.project") }),
    /* @__PURE__ */ jsxs("div", { className: styles$l.course, children: [
      /* @__PURE__ */ jsx("p", { className: styles$l.title, children: t("aboutUs.title") }),
      /* @__PURE__ */ jsxs("div", { className: styles$l.info, children: [
        /* @__PURE__ */ jsx("p", { className: styles$l.courseInfo, children: t("aboutUs.name") }),
        /* @__PURE__ */ jsx("p", { className: styles$l.courseInfo, children: t("aboutUs.year") })
      ] })
    ] })
  ] });
};
const buttonsConfig = (t, isRestClientPage) => isRestClientPage ? [
  { path: AppRoutes.HISTORY, label: t("buttons.btnHistory") },
  { path: AppRoutes.VARIABLES, label: t("buttons.btnVariables") }
] : [
  { path: AppRoutes.REST_CLIENT, label: t("buttons.btnRestClient") },
  { path: AppRoutes.HISTORY, label: t("buttons.btnHistory") },
  { path: AppRoutes.VARIABLES, label: t("buttons.btnVariables") }
];
const btnSection = "_btnSection_1hiz7_1";
const styles$k = {
  btnSection
};
const Navigation = ({ isRestClientPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const buttons2 = buttonsConfig(t, isRestClientPage);
  return /* @__PURE__ */ jsx("section", { className: styles$k.btnSection, children: buttons2.map(({ path, label: label2 }) => /* @__PURE__ */ jsx(Button, { onClick: () => navigate(path), children: label2 }, label2)) });
};
const container$f = "_container_1f1wo_1";
const link$5 = "_link_1f1wo_8";
const styles$j = {
  container: container$f,
  link: link$5
};
const SignInUpLinks = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: styles$j.container, children: [
    /* @__PURE__ */ jsx(Link, { to: AppRoutes.SIGN_IN, className: styles$j.link, children: t("buttons.signIn") }),
    /* @__PURE__ */ jsx(Link, { to: AppRoutes.SIGN_UP, className: styles$j.link, children: t("buttons.signUp") })
  ] });
};
function pageMeta(data) {
  return () => [
    { title: data.metaTitle },
    {
      name: data.metaName,
      content: data.metaContent
    }
  ];
}
const container$e = "_container_u6qbs_1";
const welcome = "_welcome_u6qbs_11";
const name = "_name_u6qbs_21";
const content = "_content_u6qbs_25";
const link$4 = "_link_u6qbs_37";
const styles$i = {
  container: container$e,
  welcome,
  name,
  content,
  link: link$4
};
const meta$6 = pageMeta(mainPage);
const index$7 = UNSAFE_withComponentProps(function MainPage() {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const user = useSelector(selectAuth);
  const hasNestedRoutes = location.pathname !== AppRoutes.HOME;
  if (user) return /* @__PURE__ */ jsxs("main", {
    className: styles$i.container,
    children: [/* @__PURE__ */ jsxs("h2", {
      className: styles$i.welcome,
      children: [t("mainPage.welcomeOld"), /* @__PURE__ */ jsx("p", {
        className: styles$i.name,
        children: user.user_metadata.name
      })]
    }), /* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx(Link, {
      to: AppRoutes.HOME,
      className: styles$i.link,
      children: t("mainPage.mainPage")
    }), /* @__PURE__ */ jsx(AboutUs, {})]
  });
  return /* @__PURE__ */ jsxs("main", {
    className: styles$i.container,
    children: [!hasNestedRoutes && /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: styles$i.content,
        children: [/* @__PURE__ */ jsx("h2", {
          children: t("mainPage.welcomeNew")
        }), /* @__PURE__ */ jsx(SignInUpLinks, {})]
      }), /* @__PURE__ */ jsx(AboutUs, {})]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$7,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const validation = {
  error: {
    emailMessage: "Invalid email address",
    emailLatinMessage: "Email must contain only Latin characters",
    password: {
      tooShort: "Password must be at least 8 characters long",
      noLetter: "Password must contain at least one letter",
      noDigit: "Password must contain at least one digit",
      noSpecial: "Password must contain at least one special character"
    },
    nameMessage: "Name must start with a capital letter",
    confirmMessage: "Passwords must match"
  }
};
const nameSchema = z.string().trim().min(1, { message: validation.error.nameMessage }).refine((name2) => NAME_REGEX.test(name2), {
  message: validation.error.nameMessage
});
const emailSchema = z.string().trim().min(1, { message: validation.error.emailMessage }).refine((value) => EMAIL_REGEX.test(value), {
  message: validation.error.emailLatinMessage
});
const passwordSchema = z.string().trim().min(8, { message: validation.error.password.tooShort }).refine((val) => PASSWORD_UNICODE_REGEX.LETTER.test(val), {
  message: validation.error.password.noLetter
}).refine((val) => PASSWORD_UNICODE_REGEX.DIGIT.test(val), {
  message: validation.error.password.noDigit
}).refine((val) => PASSWORD_UNICODE_REGEX.SPECIAL.test(val), {
  message: validation.error.password.noSpecial
});
const confirmPasswordSchema = z.string().trim().min(1, { message: validation.error.confirmMessage }).min(8, { message: validation.error.password.tooShort }).refine((val) => PASSWORD_UNICODE_REGEX.LETTER.test(val), {
  message: validation.error.password.noLetter
}).refine((val) => PASSWORD_UNICODE_REGEX.DIGIT.test(val), {
  message: validation.error.password.noDigit
}).refine((val) => PASSWORD_UNICODE_REGEX.SPECIAL.test(val), {
  message: validation.error.password.noSpecial
});
const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});
const inputFormFields = [
  {
    id: InputID.ID_EMAIL,
    label: "label.email",
    type: InputType.E_MAIL,
    placeholder: "placeholder.email"
  },
  {
    id: InputID.ID_NAME,
    label: "label.name",
    type: InputType.TEXT,
    placeholder: "placeholder.name"
  },
  {
    id: InputID.ID_PASSWORD,
    label: "label.password",
    type: InputType.PASSWORD,
    placeholder: "placeholder.password"
  },
  {
    id: InputID.ID_CONFIRM_PASSWORD,
    label: "label.confirmPassword",
    type: InputType.PASSWORD,
    placeholder: "placeholder.confirmPassword"
  }
];
const signInPage = {
  metaTitle: "REST client App / Sign in",
  metaName: "description",
  metaContent: "Welcome to Sigh in"
};
const toasts = {
  signInId: "signInId",
  signUp: "Registration successful! Please check your email to confirm your account",
  tokenExpires: "Token expires"
};
const form$1 = "_form_1plvw_1";
const container$d = "_container_1plvw_13";
const styles$h = {
  form: form$1,
  container: container$d
};
const Form = ({
  onSubmit,
  children,
  isDisabled,
  buttonLabel
}) => {
  return /* @__PURE__ */ jsxs("form", { onSubmit, className: styles$h.form, children: [
    /* @__PURE__ */ jsx("div", { className: styles$h.container, children }),
    /* @__PURE__ */ jsx(Button, { type: ButtonType.SUBMIT, disabled: isDisabled, children: buttonLabel })
  ] });
};
const container$c = "_container_1lhhl_1";
const containerWithErrorMessage = "_containerWithErrorMessage_1lhhl_8";
const label = "_label_1lhhl_12";
const input$1 = "_input_1lhhl_16";
const error$1 = "_error_1lhhl_38";
const styles$g = {
  container: container$c,
  containerWithErrorMessage,
  label,
  input: input$1,
  error: error$1
};
const Input = ({
  id,
  label: label2,
  setInput,
  name: name2,
  register,
  errorMessage,
  containerClassName,
  renderErrorMessage = true,
  ...rest
}) => {
  const { onChange, ...restRegister } = register && name2 ? register(name2) : {};
  const handleChange = (event) => {
    setInput?.(event.target.value);
    onChange?.(event);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx$1(
        styles$g.container,
        containerClassName,
        renderErrorMessage && styles$g.containerWithErrorMessage
      ),
      children: [
        label2 && /* @__PURE__ */ jsx("label", { htmlFor: id, className: styles$g.label, children: label2 }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id,
            ...rest,
            ...restRegister,
            onChange: handleChange,
            className: styles$g.input
          }
        ),
        errorMessage && renderErrorMessage && /* @__PURE__ */ jsx("p", { className: styles$g.error, children: errorMessage })
      ]
    }
  );
};
const authError = (error2, t) => {
  if (error2) {
    switch (error2.code) {
      case AuthErrors.USER_EXIST:
        toast.error(t("toasts.userExist"));
        break;
      case AuthErrors.CREDENTIALS_INVALID:
        toast.error(t("toasts.invalidPasswordEmail"));
        break;
      case AuthErrors.NOT_CONFIRMED:
        toast.error(t("toasts.errorConfirmEmail"));
        break;
      default:
        toast.error(error2.message);
    }
  }
  return error2;
};
const container$b = "_container_owh7o_1";
const info$1 = "_info_owh7o_9";
const title$4 = "_title_owh7o_13";
const link$3 = "_link_owh7o_17";
const styles$f = {
  container: container$b,
  info: info$1,
  title: title$4,
  link: link$3
};
const meta$5 = pageMeta(signInPage);
const index$6 = UNSAFE_withComponentProps(function SignInPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    setUser
  } = useActions();
  const {
    setUserToStorage
  } = useSaveUserToLS(LS_KEY.USER, null);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || AppRoutes.HOME;
  const {
    register,
    handleSubmit,
    formState
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange"
  });
  const filteredFields = inputFormFields.filter(({
    id
  }) => id === InputID.ID_EMAIL || id === InputID.ID_PASSWORD);
  const onSubmit = async (formData) => {
    const {
      email,
      password
    } = formData;
    toast.success(t("toasts.signCheck"), {
      id: toasts.signInId,
      duration: TOAST_DURATION_LONG
    });
    const {
      data: authData,
      error: error2
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    const {
      user,
      session
    } = authData;
    if (error2) {
      authError(error2, t);
      return null;
    }
    if (!user || !session) return;
    const authUser = {
      user,
      accessToken: session.access_token,
      expiresAt: session.expires_at ?? null
    };
    setUser(authUser);
    setUserToStorage(authUser);
    toast.success(`${t("toasts.signIn")} ${authData.user?.user_metadata.name}`, {
      id: "signInId",
      duration: TOAST_DURATION
    });
    navigate(redirectTo, {
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: styles$f.container,
    children: [/* @__PURE__ */ jsx(Form, {
      onSubmit: handleSubmit(onSubmit),
      isDisabled: !formState.isValid,
      buttonLabel: t("buttons.signIn"),
      children: filteredFields.map((field) => /* @__PURE__ */ jsx(Input, {
        id: field.id,
        label: field.label ? t(field.label) : void 0,
        type: field.type,
        placeholder: field.placeholder ? t(field.placeholder) : void 0,
        name: field.id,
        register,
        errorMessage: formState.errors[field.id]?.message
      }, field.id))
    }), /* @__PURE__ */ jsxs("div", {
      className: styles$f.info,
      children: [/* @__PURE__ */ jsx("p", {
        className: styles$f.title,
        children: t("signInPage.infoTitle")
      }), /* @__PURE__ */ jsx(Link, {
        to: AppRoutes.SIGN_UP,
        className: styles$f.link,
        children: t("buttons.signUp")
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$6,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: validation.error.confirmMessage,
  path: [InputID.ID_CONFIRM_PASSWORD]
});
const signUpPage = {
  metaTitle: "REST client App / Sign up",
  metaName: "description",
  metaContent: "Welcome to Sigh up"
};
const createWrapperPortal = (wrapperId) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.append(wrapperElement);
  return wrapperElement;
};
const ReactPortal = ({
  children,
  wrapperId = WRAPPER_ROOT_PORTAL_ID
}) => {
  const [wrapperElement, setWrapperElement] = useState(
    null
  );
  useEffect(() => {
    const portalElement = document.getElementById(wrapperId) ?? createWrapperPortal(wrapperId);
    setWrapperElement(portalElement);
  }, [wrapperId]);
  if (!wrapperElement) return null;
  return createPortal(children, wrapperElement);
};
ReactPortal.displayName = DisplayName.PORTAL;
const useEscapeKey = (onEscape, active = true) => {
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, active]);
};
const overlay = "_overlay_1vce5_1";
const container$a = "_container_1vce5_11";
const closeButton = "_closeButton_1vce5_26";
const image = "_image_1vce5_32";
const styles$e = {
  overlay,
  container: container$a,
  closeButton,
  image
};
const Modal = ({ isOpen, onClose, children }) => {
  useEscapeKey(() => onClose?.(), isOpen);
  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(ReactPortal, { children: [
    /* @__PURE__ */ jsx("div", { className: styles$e.overlay, onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: styles$e.container, children: [
      onClose && /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onClose,
          variant: Variant.ICON,
          className: styles$e.closeButton,
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "close.svg",
              alt: images.close,
              className: styles$e.image
            }
          )
        }
      ),
      children
    ] })
  ] });
};
const container$9 = "_container_owh7o_1";
const info = "_info_owh7o_9";
const title$3 = "_title_owh7o_13";
const link$2 = "_link_owh7o_17";
const styles$d = {
  container: container$9,
  info,
  title: title$3,
  link: link$2
};
const meta$4 = pageMeta(signUpPage);
const index$5 = UNSAFE_withComponentProps(function SignUpPage() {
  const {
    t
  } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange"
  });
  const onSubmit = async (data) => {
    const {
      email,
      password,
      name: name2
    } = data;
    toast.success(t("toasts.signUpProcess"), {
      id: "signUpProcessId",
      duration: TOAST_DURATION_LONG
    });
    const {
      data: authData,
      error: error2
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name2
        },
        emailRedirectTo: `${window.location.origin}${AppRoutes.SIGN_IN}`
      }
    });
    if (error2) {
      authError(error2, t);
      return null;
    }
    if (authData.user?.identities?.length === 0) {
      toast.dismiss("signUpProcessId");
      toast.error(t("toasts.userExist"), {
        id: "userExistId"
      });
      return;
    }
    setModalMessage(`${toasts.signUp}, ${authData.user?.user_metadata.name}`);
    setIsModalOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: styles$d.container,
    children: [/* @__PURE__ */ jsx(Modal, {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      children: /* @__PURE__ */ jsx("p", {
        children: modalMessage
      })
    }), /* @__PURE__ */ jsx(Form, {
      onSubmit: handleSubmit(onSubmit),
      isDisabled: !formState.isValid,
      buttonLabel: t("buttons.signUp"),
      children: inputFormFields.map((field) => /* @__PURE__ */ jsx(Input, {
        id: field.id,
        label: field.label ? t(field.label) : void 0,
        type: field.type,
        placeholder: field.placeholder ? t(field.placeholder) : void 0,
        name: field.id,
        register,
        errorMessage: formState.errors[field.id]?.message
      }, field.id))
    }), /* @__PURE__ */ jsxs("div", {
      className: styles$d.info,
      children: [/* @__PURE__ */ jsx("p", {
        className: styles$d.title,
        children: t("signUpPage.infoTitle")
      }), /* @__PURE__ */ jsx(Link, {
        to: AppRoutes.SIGN_IN,
        className: styles$d.link,
        children: t("buttons.signIn")
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const LoaderIcon = "data:image/gif;base64,R0lGODlhlgCWAPf/AAAAAAAAAACAgACA/wCqqgCq/wC22wC/vwC/3wC//wDE2ADGxgDG4wDI2wDJ1wDMzADM2QDM3QDM5gDM/wDO2wDO3gDO4gDO5wDP3wDQ3QDQ4ADQ4wDR0QDR3ADR3gDR3wDR4ADR4ADR4gDR5ADR6ADS3QDS3wDS3wDS4ADS4ADS4QDS4QDS4wDT3ADT3QDT3gDT3wDT3wDT4ADT4ADT4ADT4ADT4ADT4ADT4QDT4QDT4QDT4gDT4gDT4gDT5QDT6QDU1ADU1ADU3ADU3QDU3gDU3gDU3gDU3gDU3wDU3wDU3wDU3wDU3wDU3wDU3wDU3wDU4ADU4ADU4ADU4ADU4ADU4ADU4ADU4ADU4QDU4QDU4QDU4QDU4QDU4QDU4QDU4gDU4gDU4gDU4gDU4gDU4wDU5ADU5ADU5gDU6gDU6gDU/wDV3ADV3QDV3gDV3wDV3wDV3wDV3wDV3wDV4ADV4ADV4ADV4ADV4ADV4ADV4QDV4QDV4QDV4QDV4QDV4QDV4QDV4QDV4QDV4QDV4QDV4gDV4gDV4gDV4wDV4wDV4wDV4wDV5ADV5QDW3ADW3QDW3gDW3wDW3wDW3wDW4ADW4ADW4ADW4ADW4QDW4QDW4QDW4QDW4QDW4gDW4gDW4gDW4gDW4gDW4gDW4gDW4wDW4wDW4wDW5gDX1wDX3QDX3wDX3wDX4ADX4ADX4ADX4QDX4QDX4QDX4QDX4QDX4QDX4QDX4QDX4gDX4gDX4wDX4wDX4wDX4wDX5ADX5ADX5QDX5gDY2ADY4ADY4ADY4QDY4gDY4gDY4wDY4wDY5QDY6wDZ3wDZ4gDZ4gDZ4wDZ5gDa4ADa4QDa5ADa6ADb2wDb2wDb5ADb5wDb7QDc5QDc6ADd3QDd5gDd7gDe5gDf3wDf3wDh4QDj4wDm5gD//wD//wHU4QHU4QHV4QHV4QHV4QHV4QHV4QHV4QHV4QHV4gHW4QHW4QHW4QLV4ALV4QLV4QLW4QLW4gPV4QPV4wPW4QPW4gPX4QTX4gTX4wTY5AD/ACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwCJACyVAJUAAQABAIcAAAAAgIAAgP8AqqoAqv8AttsAv78Av98Av/8AxNgAxsYAxuMAyNsAydcAzMwAzNkAzN0AzOYAzP8AztsAzt4AzuIAzucAz98A0N0A0OAA0OMA0dEA0dwA0d4A0d8A0eAA0eIA0eQA0egA0t0A0t8A0uAA0uEA0uMA09wA090A094A098A0+AA0+EA0+IA0+UA0+kA1NQA1NwA1N0A1N4A1N8A1OAA1OEA1OIA1OMA1OQA1OYA1OoA1P8A1dwA1d0A1d4A1d8A1eAA1eEA1eIA1eMA1eQA1eUA1twA1t0A1t4A1t8A1uAA1uEA1uIA1uMA1uYA19cA190A198A1+AA1+EA1+IA1+MA1+QA1+UA1+YA2NgA2OAA2OEA2OIA2OMA2OUA2OsA2d8A2eIA2eMA2eYA2uAA2uEA2uQA2ugA29sA2+QA2+cA2+0A3OUA3OgA3d0A3eYA3e4A3uYA398A4eEA4+MA5uYA//8B1OEB1eEB1eIB1uEC1eAC1eEC1uEC1uID1eED1eMD1uED1uID1+EE1+IE1+ME2OQA/wD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8IBAATBQQAIfkECQQA/wAslQCVAAEAAQAACAQA/wUEACH5BAkDAP8ALJUAlQABAAEAAAgEAP8FBAAh+QQJAwD/ACw7AEcABAAFAAAIFwD/ccLyz1+Jfi/KzYOhD6HBf/rK4QgIACH5BAkEAP8ALDoARgAGAAYAAAghAP/98+BP4D8k9ua8+/fCXwl/Dd0pRDjnH0SH9gRKrBgQACH5BAkDAP8ALDoARQAGAAcAAAgnAP/9g/JC4D98HvxlqIfFhD0Z5UwkzIDQnyuIDmUcnIhPYDkYAgMCACH5BAkDAP8ALDoARQAGAAYAAAgjAP8heYeE2L8S/l74K2GPoL05BBUiVDgKIhJ7UP7ZU5jhX0AAIfkECQQA/wAsOgBEAAcABwAACCsA//0rYU+gQCjnYNiD8i9Dvxf+SvT7l3BhQncQJUL85w6hQhkC7UHMIDAgACH5BAkDAP8ALDoARQAPAAcAAAg8AP9BOQfD3b+DCBOW6PfCXwl7CSMStDcQRsRy8yw2XNhQIUOHnCrak5Ewoz6M/+w1zBBxYz8TEWNiJBkQACH5BAkDAP8ALDoARQAPAAcAAAhMAP/9g0JkjsCDCP916PfCXwl8CDP48+Dv3zkY9qBcRGgPizsZ9hqWYFhRYD+KJiZy0ogRCsKPHd39C+kwYYmJ/lAclJFQIIw5Jv4FBAAh+QQJBAD/ACw6AEUAEAAHAAAITAD/CRxI8N8Le24G1nvhr0RBhiX8vfiXB4Y9KOeIDJRhb847JPZeDGnYj+HAhhIb2uOE0SKUgUQ+dnwnsKRKghD9wRg4bGJBgZMGBgQAIfkECQMA/wAsOwBEAA8ACAAACEoA/wkcSPDfi4II/+WBYQ9KnoQC7b3wV6LfRBf6yj0c+KLhOYYyKFrkN7BfxYkl7JWbB0MfjIEwPnr8Z5FiwRIiPfzDWG4OxIEBAQAh+QQJAwD/ACxDAEQADwAIAAAIRgD/CXwhsKDBglhg2IOS56BBey/8legX0aFAEwvPKYRiEAoMfUgkUpSIryBEkVA0ZuQo8GO5eTD+eRBZwqDIihYLuvr4LyAAIfkECQQA/wAsQwBFABAABwAACEsA/82BYQ/Kv4MIEx584a9EvxcKM/gz0e+fiYLnCGJBCMmdDHtYLjV82NAewon+PPgbAiMjxoQfsXh09Q/GSIgnVZrwp7DnwncHAwIAIfkECQMA/wAsQwBFABAABwAACE0A/wnkJLCgwGFzoBARaMJfBnwuDPor4e/FxH/2ZJQzYc/gnHdI7H3s99CDw44CK06s+G9jxnIGQ35EMudfw4cvDPKjaLEgEhkGgxYMCAAh+QQJAwD/ACxEAEQADwAIAAAIRAD/CRxI8J+/ggj/wbAH5ZyJgSUQ+ivR74W/DO8awng3kJNGhucoWowoUOTEiucWNiSoMqW7EiehFOxQ8aDCc0gSEgwIACH5BAkEAP8ALEQARAAYAAgAAAhiAP8JHEjwn7+CCBMOfGEPyjkTCiMK9Fei3wt/GST+k1fwnEMYDc8RhKGvHJR/LfiV8NdhoAeLFC0SjHlR3ot8SDgOBPmRE8Fy80iWW9lBZcEMFvsVhFnC3r+cLzQWLDnpX0AAIfkECQMA/wAsTQBFAA8ABwAACEcA/y2Ccg7Gv4MIE/or0e+FPxcJ7Znwl+EfQRj2CCJEIsMeFncvGi5siLCEPw/+JmK8yAnhu48dsYx0mPBfypP2auq09eJgQAAh+QQJAwD/ACxNAEUADwAHAAAISQD/CRxI8IUrJJwEZsDnoR9BF/5e+CthT0Y5ExXnDJyDxN6cd0gY+lvoYaDEEhH9YbRoIqFAVx87zhkpkuA/eyf3CYRxzqbPgAAAIfkECQQA/wAsTQBEABAACAAACEcA/wkcSFCgv4IIBco4B8MelIG8PBQs0e+FP4oCGTokqBEKw1EVL/YrMdAiRYseGnqEMWqgq5Ub+Z08SNCexQwD58B4l7BgQAAh+QQJAwD/ACxNAEQAEAAIAAAISQD/CRxIUKC9gggFyjgHwx6MhAMz9Hvhr0S/gXM4FWRoDwpDd/9K+OvAjyBFiyeJ5EMi7wVBTh4bQhFIUmRBexQzYHyRDyLBgAAAIfkECQMA/wAsVgBFAAcABgAACCgA/7k5B4PTv38Z+r3wV8LeP4L2oBD8t7CEQn8ZFkmEEfGgvYq8/gUEACH5BAkEAP8ALFYARgAGAAYAAAgjAP/Z8+Avgz0oJuzJKGfCREF8BDktTCjjH8SC9v7942RCY0AAIfkECQMA/wAsVgBGAAYABgAACCMA//170U/gPxj2oJwT6K9Evxf+yilECOXfw4b7BB6CkudfQAAh+QQJAwD/ACxXAEcABQAFAAAIHAD/DUPy75+/DvxK/EMi70W+OQkPFsyHZM6/gAAAIfkECQQA/wAslQCVAAEAAQAACAQA/wUEACH5BAkDAP8ALJUAlQABAAEAAAgEAP8FBAAh+QQJAwD/ACyVAJUAAQABAAAIBAD/BQQAIfkECQQA/wAslQCVAAEAAQAACAQA/wUEACH5BAkDAP8ALJUAlQABAAEAAAgEAP8FBAAh+QQJAwD/ACyVAJUAAQABAAAIBAD/BQQAIfkECQQA/wAslQCVAAEAAQAACAQA/wUEACH5BAkDAP8ALJUAlQABAAEAAAgEAP8FBAAh+QQJAwD/ACyVAJUAAQABAAAIBAD/BQQAIfkECQQA/wAslQCVAAEAAQAACAQA/wUEACH5BAkDAP8ALJUAlQABAAEAAAgEAP8FBAAh+QQJAwD/ACyVAJUAAQABAAAIBAD/BQQAIfkECQQA/wAslQCVAAEAAQAACAQA/wUEACH5BAkDAP8ALJUAlQABAAEAAAgEAP8FBAAh+QQJAwD/ACyVAJUAAQABAAAIBAD/BQQAIfkECQMA/wAslQCVAAEAAQAACAQA/wUEADs=";
const loaderContainer = "_loaderContainer_1d42f_1";
const loader$1 = "_loader_1d42f_1";
const loading = "_loading_1d42f_20";
const styles$c = {
  loaderContainer,
  loader: loader$1,
  loading
};
const WaitingLoader = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: styles$c.loaderContainer, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        "data-testid": "waiting-loader",
        className: styles$c.loader,
        src: LoaderIcon,
        alt: images.loading
      }
    ),
    /* @__PURE__ */ jsx("div", { className: styles$c.loading, children: t("loader.title") })
  ] });
};
WaitingLoader.displayName = DisplayName.LOADER;
const index$4 = UNSAFE_withComponentProps(function PrivateRoutes() {
  const {
    t
  } = useTranslation();
  const {
    setError,
    clearUser
  } = useActions();
  const {
    removeUserFromStorage
  } = useSaveUserToLS(LS_KEY.USER, null);
  const navigate = useNavigate();
  const isInitialized = useAppInitializer();
  const isTokenValid = useSelector(selectIsAuthenticated);
  useEffect(() => {
    if (isInitialized && !isTokenValid) {
      clearUser();
      removeUserFromStorage();
      const message = t("toasts.tokenExpires");
      setError(message);
      toast.error(message, {
        id: toasts.tokenExpires
      });
      navigate(AppRoutes.HOME, {
        replace: true
      });
    }
  }, [navigate, isTokenValid, setError, isInitialized]);
  if (!isInitialized) {
    return /* @__PURE__ */ jsx(WaitingLoader, {});
  }
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$4
}, Symbol.toStringTag, { value: "Module" }));
const restClientPage = {
  metaTitle: "REST client App / Rest Client",
  metaName: "description",
  metaContent: "Welcome to Rest Client"
};
const selectMethod = (state) => state.restClient.method;
const selectProtocol = (state) => state.restClient.protocol;
const selectUrl = (state) => state.restClient.url;
const selectParser = (state) => state.restClient.parser;
const selectBody = (state) => state.restClient.body;
const selectHeaders = (state) => state.restClient.headers;
const selectCode = (state) => state.restClient.code;
const selectLanguage = (state) => state.restClient.language;
const selectClientState = (state) => state.restClient;
const container$8 = "_container_77mnd_1";
const editor = "_editor_77mnd_8";
const styles$b = {
  container: container$8,
  editor
};
const { highlight, languages } = Prism;
const BodyEditor = () => {
  const { t } = useTranslation();
  const { setBody } = useActions();
  const parser = useSelector(selectParser);
  const body2 = useSelector(selectBody);
  const method = useSelector(selectMethod);
  const showBodyEditor = method !== HttpMethods.GET && method !== HttpMethods.HEAD && method !== HttpMethods.OPTIONS;
  useEffect(() => {
    if (!body2) {
      setBody(DEFAULT_BODY);
    }
  }, [method]);
  return showBodyEditor ? /* @__PURE__ */ jsxs("div", { className: styles$b.container, children: [
    /* @__PURE__ */ jsx("p", { children: t("bodyEditor.bodyTitle") }),
    /* @__PURE__ */ jsx(
      Editor,
      {
        value: body2,
        onValueChange: setBody,
        highlight: (code) => parser === Parsers.RAW ? code : highlight(code, languages[parser] || languages.json, parser),
        padding: 10,
        className: styles$b.editor
      }
    )
  ] }) : null;
};
const languageList = [
  CodeLanguage.JAVASCRIPT,
  CodeLanguage.JAVA,
  CodeLanguage.PYTHON,
  CodeLanguage.CSHARP,
  CodeLanguage.CURL,
  CodeLanguage.GO,
  CodeLanguage.NODEJS,
  CodeLanguage.XHR
];
const select = "_select_tq6hn_1";
const styles$a = {
  select
};
const Select = ({
  setSelectedValue,
  options,
  defaultValue,
  value
}) => {
  const onSelect = (event) => {
    const value2 = event.target.value;
    setSelectedValue(value2);
  };
  return /* @__PURE__ */ jsxs(
    "select",
    {
      onChange: onSelect,
      className: styles$a.select,
      defaultValue,
      value,
      children: [
        defaultValue && /* @__PURE__ */ jsx("option", { value: "", children: defaultValue }),
        options.map((option) => /* @__PURE__ */ jsx("option", { value: option, className: styles$a.option, children: option }, option))
      ]
    }
  );
};
const container$7 = "_container_v7xz9_1";
const codeGenerator = "_codeGenerator_v7xz9_9";
const syntax$1 = "_syntax_v7xz9_14";
const styles$9 = {
  container: container$7,
  codeGenerator,
  syntax: syntax$1
};
const CURL_TEMPLATE = (method, url, headers2, bodyString) => `
curl -X ${method} "${url}"${Object.keys(headers2).length ? ` \\
${Object.entries(headers2).map(([k, v]) => `-H "${k}: ${v}"`).join(" \\\n")}` : ""}${bodyString ? ` \\
-d '${bodyString}'` : ""}`.trim();
const FETCH_TEMPLATE = (method, url, headers2, bodyString) => `
fetch("${url}", {
  method: "${method}",
  ${Object.keys(headers2).length ? `headers: ${JSON.stringify(headers2, null, 2)},` : ""}
  ${bodyString ? `body: ${bodyString},` : ""}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`.trim();
const XHR_TEMPLATE = (method, url, headers2, bodyString) => `
const xhr = new XMLHttpRequest();
xhr.open("${method}", "${url}");
${Object.entries(headers2).map(([k, v]) => `xhr.setRequestHeader("${k}", "${v}");`).join("\n")}
xhr.onload = () => console.log(xhr.responseText);
xhr.onerror = () => console.error(xhr.statusText);
${bodyString ? `xhr.send(${JSON.stringify(bodyString)});` : "xhr.send();"}`.trim();
const NODE_TEMPLATE = (method, url, headers2, bodyString) => `
const https = require('https');

const options = {
  method: '${method}',
  headers: ${JSON.stringify(headers2, null, 2)}
};

const req = https.request('${url}', options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => console.log(data));
});

req.on('error', err => console.error(err));
${bodyString ? `req.write(${bodyString});` : ""}
req.end();`.trim();
const PYTHON_TEMPLATE = (method, url, headers2, bodyString) => `
import requests

response = requests.request(
  method='${method}',
  url='${url}',
  headers=${JSON.stringify(headers2, null, 2)},
  ${bodyString ? `data=${bodyString}` : ""}
)
print(response.text)`.trim();
const JAVA_TEMPLATE = (method, url, headers2, bodyString) => `
import java.net.*;
import java.io.*;

URL url = new URL("${url}");
HttpURLConnection con = (HttpURLConnection) url.openConnection();
con.setRequestMethod("${method}");
${Object.entries(headers2).map(([k, v]) => `con.setRequestProperty("${k}", "${v}");`).join("\n")}
${bodyString ? `con.setDoOutput(true);
try(OutputStream os = con.getOutputStream()) {
  byte[] input = ${bodyString}.getBytes("utf-8");
  os.write(input, 0, input.length);
}` : ""}
BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
StringBuilder response = new StringBuilder();
String responseLine;
while ((responseLine = br.readLine()) != null) {
    response.append(responseLine.trim());
}
System.out.println(response.toString());`.trim();
const CSHARP_TEMPLATE = (method, url, headers2, bodyString) => `
using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.${method}, "${url}");
${Object.entries(headers2).map(([k, v]) => `request.Headers.Add("${k}", "${v}");`).join("\n")}
${bodyString ? `request.Content = new StringContent(${bodyString});` : ""}
var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`.trim();
const GO_TEMPLATE = (method, url, headers2, bodyString) => `
package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
  "strings"
)

func main() {
  client := &http.Client{}
  req, _ := http.NewRequest("${method}", "${url}", strings.NewReader(${bodyString}))
${Object.entries(headers2).map(([k, v]) => `  req.Header.Set("${k}", "${v}")`).join("\n")}
  resp, err := client.Do(req)
  if err != nil { panic(err) }
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`.trim();
const CODE_TEMPLATES = {
  [CodeLanguage.CURL]: CURL_TEMPLATE,
  [CodeLanguage.JAVASCRIPT]: FETCH_TEMPLATE,
  [CodeLanguage.XHR]: XHR_TEMPLATE,
  [CodeLanguage.NODEJS]: NODE_TEMPLATE,
  [CodeLanguage.PYTHON]: PYTHON_TEMPLATE,
  [CodeLanguage.JAVA]: JAVA_TEMPLATE,
  [CodeLanguage.CSHARP]: CSHARP_TEMPLATE,
  [CodeLanguage.GO]: GO_TEMPLATE
};
function generateCode(language2, request) {
  const { url, method = HttpMethods.GET, headers: headers2 = {}, body: body2 } = request;
  if (!url) return errors.urlError;
  const bodyString = body2 != null ? typeof body2 === "string" ? body2 : JSON.stringify(body2, null, 2) : "";
  const template = CODE_TEMPLATES[language2];
  if (!template) return errors.languageError;
  return template(method, url, headers2, bodyString);
}
const handleCodeGenerator = async (requestData, language2, setCode) => {
  try {
    const generatedCode = generateCode(language2, requestData);
    setCode({ generatedCode, error: null });
  } catch (error2) {
    console.log(errors.codeGeneratorError, error2);
    setCode({ generatedCode: null, error: error2.message });
  }
};
const CodeGenerator = () => {
  const { t } = useTranslation();
  const code = useSelector(selectCode);
  const body2 = useSelector(selectBody);
  const method = useSelector(selectMethod);
  const language2 = useSelector(selectLanguage);
  const headers2 = useSelector(selectHeaders);
  const url = useSelector(selectUrl);
  const { setCode, setLanguage, clearCode } = useActions();
  const headersObj = useMemo(
    () => headers2.reduce(
      (acc, header2) => ({ ...acc, [header2.key]: header2.value }),
      {}
    ),
    [headers2]
  );
  const methodSupportsBody = (method2) => {
    switch (method2) {
      case HttpMethods.POST:
      case HttpMethods.PUT:
      case HttpMethods.PATCH:
        return true;
      default:
        return false;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$9.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$9.codeGenerator, children: [
      /* @__PURE__ */ jsx("p", { children: t("bodyEditor.codeTitle") }),
      /* @__PURE__ */ jsx(Select, { options: languageList, setSelectedValue: setLanguage }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => handleCodeGenerator(
            {
              url,
              method,
              headers: headersObj,
              body: methodSupportsBody(method) ? body2 : void 0
            },
            language2,
            setCode
          ),
          disabled: !url,
          children: t("buttons.generate")
        }
      ),
      code.generatedCode && /* @__PURE__ */ jsxs(Button, { onClick: () => clearCode(), children: [
        " ",
        t("buttons.clear")
      ] })
    ] }),
    code?.generatedCode && /* @__PURE__ */ jsx(
      Prism$1,
      {
        language: language2?.toLowerCase(),
        style: atomDark,
        className: styles$9.syntax,
        children: code.generatedCode
      }
    )
  ] });
};
const input = "_input_1aaej_1";
const addButton = "_addButton_1aaej_5";
const container$6 = "_container_1aaej_9";
const table$1 = "_table_1aaej_17";
const title$2 = "_title_1aaej_32";
const styles$8 = {
  input,
  addButton,
  container: container$6,
  table: table$1,
  title: title$2
};
const KeyValueEditor = ({
  keyHeader,
  valueHeader,
  keyValues = [],
  onAdd,
  onDelete,
  onUpdate,
  keyPlaceholder,
  valuePlaceholder
}) => {
  const { t } = useTranslation();
  const id = useId();
  const handleAdd = () => {
    onAdd({
      id: Math.max(...keyValues.map((pair) => pair.id), 0) + 1,
      key: "",
      value: ""
    });
  };
  const handleDelete = (uid) => {
    onDelete(uid);
  };
  const handleChange = (uid, handler) => {
    const index2 = keyValues.findIndex((pair) => pair.id === uid);
    const updatedValue = handler(keyValues[index2]);
    onUpdate(updatedValue);
  };
  const getChangeHandler = (pair, field) => (value) => {
    handleChange(pair.id, (pair2) => ({ ...pair2, [field]: value }));
  };
  const buildInput = (pair, field) => ({
    id: `${id}-${pair.id}-${field}`,
    value: pair[field],
    setInput: getChangeHandler(pair, field),
    renderErrorMessage: false,
    className: styles$8.input
  });
  return /* @__PURE__ */ jsx("div", { className: styles$8.container, children: /* @__PURE__ */ jsxs("table", { className: styles$8.table, children: [
    /* @__PURE__ */ jsxs("colgroup", { children: [
      /* @__PURE__ */ jsx("col", {}),
      /* @__PURE__ */ jsx("col", {}),
      /* @__PURE__ */ jsx("col", { width: 0 })
    ] }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { children: keyHeader }),
      /* @__PURE__ */ jsx("th", { children: valueHeader }),
      /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(Button, { className: styles$8.addButton, onClick: handleAdd, children: t("keyValueEditor.add") }) })
    ] }) }),
    /* @__PURE__ */ jsxs("tbody", { children: [
      keyValues.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 3, className: styles$8.title, children: t("keyValueEditor.emptyMessage") }) }),
      keyValues.map((keyValue) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          Input,
          {
            ...buildInput(keyValue, EditableField.KEY),
            placeholder: keyPlaceholder
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          Input,
          {
            ...buildInput(keyValue, EditableField.VALUE),
            placeholder: valuePlaceholder
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Button, { onClick: () => handleDelete(keyValue.id), children: t("keyValueEditor.delete") }) })
      ] }, keyValue.id))
    ] })
  ] }) });
};
const Headers$1 = () => {
  const { t } = useTranslation();
  const { addHeader, updateHeader, removeHeader } = useActions();
  const headers2 = useSelector(selectHeaders);
  return /* @__PURE__ */ jsx(
    KeyValueEditor,
    {
      keyHeader: t("table.headerKey"),
      valueHeader: t("table.headerValue"),
      keyValues: headers2,
      keyPlaceholder: t("keyValueEditor.keyPlaceholder"),
      valuePlaceholder: t("keyValueEditor.valuePlaceholder"),
      onAdd: addHeader,
      onDelete: removeHeader,
      onUpdate: updateHeader
    }
  );
};
const parserList = [
  Parsers.JSON,
  Parsers.TEXT,
  Parsers.RAW,
  Parsers.HTML,
  Parsers.XML
];
const container$5 = "_container_14vzq_1";
const title$1 = "_title_14vzq_11";
const styles$7 = {
  container: container$5,
  title: title$1
};
const Parser = () => {
  const { t } = useTranslation();
  const { setParser } = useActions();
  const handleParser = (value) => {
    if (value) setParser(value);
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$7.container, children: [
    /* @__PURE__ */ jsx("p", { className: styles$7.title, children: t("response.selectParser") }),
    /* @__PURE__ */ jsx(Select, { options: parserList, setSelectedValue: handleParser })
  ] });
};
async function getHistoryForCurrentUser(supabaseClient) {
  const supabase2 = supabaseClient;
  const user = await getRequiredUser(supabase2);
  const { data, error: error2 } = await supabase2.from("history").select("*").eq("user_id", user.id).order("timestamp", { ascending: false });
  if (error2) throw error2;
  return data;
}
async function addHistoryForCurrentUser(supabaseClient, data) {
  const supabase2 = supabaseClient;
  const user = await getRequiredUser(supabase2);
  const { error: error2 } = await supabase2.from("history").insert({ ...data, user_id: user.id });
  if (error2) throw error2;
}
async function getRequiredUser(supabaseClient) {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();
  if (!user) {
    throw new Error("No authenticated user found.");
  }
  return user;
}
const selectVariables = (state) => state.settings.globalVariables;
const getFinalUrlParams = (body2, method, headers2, url) => {
  const queryParams = new URLSearchParams({
    method,
    url: btoa(url)
  });
  if (body2) {
    queryParams.set("body", btoa(JSON.stringify(body2)));
  }
  if (Array.isArray(headers2)) {
    headers2.forEach(({ key, value }) => {
      if (key) {
        queryParams.set(`h_${key}`, encodeURIComponent(value));
      }
    });
  }
  const basePath = AppRoutes.REST_CLIENT.replace(/^\/+/, "");
  return `/${basePath}${AppRoutes.FETCH}?${queryParams.toString()}`;
};
function formatResponse(data, parser) {
  if (!data) return "";
  switch (parser) {
    case Parsers.JSON:
      try {
        return typeof data === "string" ? JSON.stringify(JSON.parse(data), null, 2) : JSON.stringify(data, null, 2);
      } catch {
        return String(data);
      }
    case Parsers.TEXT:
      return typeof data === "string" ? data : JSON.stringify(data, null, 2);
    case Parsers.RAW:
      return typeof data === "string" ? data : JSON.stringify(data);
    case Parsers.HTML:
    case Parsers.XML:
      if (typeof data === "string") return data;
      return JSON.stringify(data, null, 2);
    default:
      return typeof data === "string" ? data : JSON.stringify(data, null, 2);
  }
}
function getStatusText(status2) {
  switch (status2) {
    case ErrorCode.OK:
      return HttpStatusText.OK;
    case ErrorCode.CREATED:
      return HttpStatusText.CREATED;
    case ErrorCode.NO_CONTENT:
      return HttpStatusText.NO_CONTENT;
    case ErrorCode.BAD_REQUEST:
      return HttpStatusText.BAD_REQUEST;
    case ErrorCode.UNAUTHORIZED:
      return HttpStatusText.UNAUTHORIZED;
    case ErrorCode.FORBIDDEN:
      return HttpStatusText.FORBIDDEN;
    case ErrorCode.NOT_FOUND:
      return HttpStatusText.NOT_FOUND;
    case ErrorCode.INTERNAL_SERVER_ERROR:
      return HttpStatusText.INTERNAL_SERVER_ERROR;
    case ErrorCode.BAD_GATEWAY:
      return HttpStatusText.BAD_GATEWAY;
    case ErrorCode.SERVICE_UNAVAILABLE:
      return HttpStatusText.SERVICE_UNAVAILABLE;
    default:
      return HttpStatusText.UNKNOWN;
  }
}
const languageMap = {
  [Parsers.JSON]: Parsers.JSON,
  [Parsers.TEXT]: Parsers.TEXT,
  [Parsers.RAW]: Parsers.TEXT,
  [Parsers.HTML]: Parsers.HTML,
  [Parsers.XML]: Parsers.XML
};
const container$4 = "_container_kdr8h_1";
const body = "_body_kdr8h_8";
const status = "_status_kdr8h_9";
const headers = "_headers_kdr8h_10";
const headerValueContainer = "_headerValueContainer_kdr8h_19";
const headersResponse = "_headersResponse_kdr8h_24";
const title = "_title_kdr8h_30";
const syntax = "_syntax_kdr8h_35";
const styles$6 = {
  container: container$4,
  body,
  status,
  headers,
  headerValueContainer,
  headersResponse,
  title,
  syntax
};
const Response$1 = ({ data, status: status2 }) => {
  const { t } = useTranslation();
  const [formattedData, setFormattedData] = useState("");
  const parser = useSelector(selectParser);
  const headers2 = useSelector(selectHeaders);
  useEffect(() => {
    setFormattedData(formatResponse(data, parser));
  }, [data, parser]);
  return /* @__PURE__ */ jsxs("div", { className: styles$6.container, children: [
    headers2.length > 0 && /* @__PURE__ */ jsxs("div", { className: styles$6.headers, children: [
      /* @__PURE__ */ jsx("p", { children: t("response.headerTitle") }),
      /* @__PURE__ */ jsx("div", { className: styles$6.headerValueContainer, children: headers2.map((header2, index2) => /* @__PURE__ */ jsxs("div", { className: styles$6.headersResponse, children: [
        /* @__PURE__ */ jsx("p", { children: t("response.key") }),
        /* @__PURE__ */ jsxs("p", { className: styles$6.title, children: [
          header2.key,
          " "
        ] }),
        /* @__PURE__ */ jsx("p", { children: t("response.value") }),
        /* @__PURE__ */ jsx("p", { className: styles$6.title, children: header2.value })
      ] }, index2)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$6.status, children: [
      /* @__PURE__ */ jsx("p", { children: t("response.statusTitle") }),
      /* @__PURE__ */ jsx("p", { className: styles$6.title, children: status2 ? `${status2} ${getStatusText(status2)}` : "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$6.body, children: [
      /* @__PURE__ */ jsx("p", { children: t("response.bodyTitle") }),
      /* @__PURE__ */ jsx(
        Prism$1,
        {
          language: languageMap[parser] || Parsers.TEXT,
          style: atomDark,
          showLineNumbers: parser === Parsers.JSON,
          wrapLongLines: true,
          className: styles$6.syntax,
          children: formattedData
        }
      )
    ] })
  ] });
};
const inputFetchFields = (values) => [
  {
    id: InputID.ID_URL,
    type: InputType.HIDDEN,
    name: InputName.URL,
    value: values.url || ""
  },
  {
    id: InputID.ID_METHOD,
    type: InputType.HIDDEN,
    name: InputName.METHOD,
    value: values.method || ""
  },
  {
    id: InputID.ID_PROTOCOL,
    type: InputType.HIDDEN,
    name: InputName.PROTOCOL,
    value: values.protocol || ""
  },
  {
    id: InputID.ID_BODY,
    type: InputType.HIDDEN,
    name: InputName.BODY,
    value: values.body ? JSON.stringify(values.body) : ""
  },
  {
    id: InputID.ID_HEADERS,
    type: InputType.HIDDEN,
    name: InputName.HEADERS,
    value: JSON.stringify(values.headers || [])
  },
  {
    id: InputID.ID_VARIABLES,
    type: InputType.HIDDEN,
    name: InputName.VARIABLES,
    value: JSON.stringify(values.variables || [])
  }
];
const HiddenRequestFields = ({
  requestDataJson,
  ...props
}) => {
  const fields = inputFetchFields(props);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    fields.map((field) => /* @__PURE__ */ jsx(
      "input",
      {
        id: field.id,
        type: field.type,
        name: field.name,
        value: field.value ?? "",
        readOnly: true,
        hidden: true
      },
      field.id
    )),
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "requestData", value: requestDataJson })
  ] });
};
const form = "_form_sr92u_1";
const response = "_response_sr92u_5";
const error = "_error_sr92u_17";
const styles$5 = {
  form,
  response,
  error
};
const RequestSender = () => {
  const { t } = useTranslation();
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const body2 = useSelector(selectBody);
  const headers2 = useSelector(selectHeaders);
  const variables = useSelector(selectVariables);
  const clientState = useSelector(selectClientState);
  const clientStateRef = useRef(clientState);
  useEffect(() => {
    clientStateRef.current = clientState;
  }, [clientState]);
  const requestData = {
    clientState,
    globalVariables: variables
  };
  const requestDataJson = JSON.stringify(requestData);
  const fetcher = useFetcher();
  const isLoading = fetcher.state === LoaderStatus.SUBMITTING || fetcher.state === LoaderStatus.LOADING;
  const canSend = !!clientState.url && !!method;
  useEffect(() => {
    if (fetcher.state === LoaderStatus.SUBMITTING) {
      const fullUrl = `${protocol}${url}`;
      const bodyString = body2 && typeof body2 === "object" ? JSON.stringify(body2) : body2 ?? null;
      const headersForUrl = headers2?.map((header2, index2) => ({
        id: index2,
        key: header2.key,
        value: header2.value
      })) ?? [];
      const finalUrl = getFinalUrlParams(
        bodyString,
        method,
        headersForUrl,
        fullUrl
      );
      window.history.replaceState(null, "", finalUrl);
    }
  }, [fetcher.state, body2, method, headers2, protocol, url]);
  useEffect(() => {
    if (fetcher.data?.ok && fetcher.data.finalUrl) {
      const { responseMetrics, requestDetails, status: status2 } = fetcher.data;
      const currentClientState = clientStateRef.current;
      addHistoryForCurrentUser(supabase, {
        clientState: JSON.stringify(currentClientState),
        method: requestDetails.method ?? currentClientState.method,
        url: requestDetails.url ?? currentClientState.url,
        user_id: "",
        status: status2,
        timestamp: requestDetails.timestamp.toISOString(),
        latency_ms: responseMetrics?.latencyMs,
        requestSize: responseMetrics?.requestSize,
        responseSize: responseMetrics?.responseSize
      }).catch(console.error);
      window.history.replaceState(null, "", fetcher.data.finalUrl);
    }
  }, [fetcher.data]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      fetcher.Form,
      {
        action: AppRoutes.FETCH,
        method: HttpMethods.POST,
        className: styles$5.form,
        children: [
          /* @__PURE__ */ jsx(
            HiddenRequestFields,
            {
              url,
              method,
              protocol,
              body: body2,
              headers: headers2,
              variables,
              requestDataJson
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: ButtonType.SUBMIT, disabled: !canSend, children: t("buttons.send") })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsx(WaitingLoader, {}) : fetcher.data ? fetcher.data.ok ? /* @__PURE__ */ jsxs("div", { className: styles$5.response, children: [
      /* @__PURE__ */ jsx("p", { children: t("response.title") }),
      /* @__PURE__ */ jsx(
        Response$1,
        {
          data: fetcher.data.received,
          status: fetcher.data.status
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: styles$5.error, children: [
      /* @__PURE__ */ jsx("p", { className: styles$5.error, children: t("response.errorTitle", { defaultValue: "Error" }) }),
      /* @__PURE__ */ jsx("pre", { children: fetcher.data.error })
    ] }) : /* @__PURE__ */ jsx("p", { children: t("response.emptyRequestHint") })
  ] });
};
const methodList = [
  HttpMethods.GET,
  HttpMethods.POST,
  HttpMethods.PUT,
  HttpMethods.PATCH,
  HttpMethods.DELETE,
  HttpMethods.HEAD,
  HttpMethods.OPTIONS,
  HttpMethods.TRACE,
  HttpMethods.CONNECT
];
const protocolList = [Protocols.HTTP, Protocols.HTTPS];
const container$3 = "_container_tm06f_1";
const urlInputContainer = "_urlInputContainer_tm06f_12";
const styles$4 = {
  container: container$3,
  urlInputContainer
};
const UrlBox = () => {
  const { t } = useTranslation();
  const { setMethod, setProtocol, setUrl } = useActions();
  const method = useSelector(selectMethod);
  const protocol = useSelector(selectProtocol);
  const url = useSelector(selectUrl);
  const handleInputChange = (value) => {
    const match = value.match(/^(https?:\/\/)(.*)$/i);
    if (match) {
      const [, detectedProtocol, restUrl] = match;
      if (detectedProtocol === Protocols.HTTP || detectedProtocol === Protocols.HTTPS) {
        setProtocol(detectedProtocol);
      }
      setUrl(restUrl);
    } else {
      setUrl(value);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$4.container, children: [
    /* @__PURE__ */ jsx(
      Select,
      {
        options: methodList,
        value: method,
        setSelectedValue: setMethod
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        options: protocolList,
        value: protocol,
        setSelectedValue: setProtocol
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        id: InputID.ID_URL,
        type: InputType.TEXT,
        placeholder: t("placeholder.url"),
        value: `${url}`,
        setInput: handleInputChange,
        containerClassName: styles$4.urlInputContainer
      }
    )
  ] });
};
const wrapper$1 = "_wrapper_19apv_1";
const container$2 = "_container_19apv_8";
const styles$3 = {
  wrapper: wrapper$1,
  container: container$2
};
const meta$3 = pageMeta(restClientPage);
function RestClientPage$1() {
  const { setState } = useActions();
  const location = useLocation();
  useEffect(() => {
    if (!location.state || !location.state.history) return;
    const history2 = location.state.history;
    const parsedState = JSON.parse(
      history2.clientState
    );
    console.log(parsedState);
    setState(parsedState);
  }, [location.state, setState]);
  return /* @__PURE__ */ jsx("div", { className: styles$3.wrapper, children: /* @__PURE__ */ jsxs("div", { className: styles$3.container, children: [
    /* @__PURE__ */ jsx(Navigation, { isRestClientPage: true }),
    /* @__PURE__ */ jsx(UrlBox, {}),
    /* @__PURE__ */ jsx(Headers$1, {}),
    /* @__PURE__ */ jsx(CodeGenerator, {}),
    /* @__PURE__ */ jsx(Parser, {}),
    /* @__PURE__ */ jsx(BodyEditor, {}),
    /* @__PURE__ */ jsx(RequestSender, {})
  ] }) });
}
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RestClientPage$1,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const RestClientPage = lazy(() => Promise.resolve().then(() => index$3));
const index_lazy$2 = UNSAFE_withComponentProps(function RestClientPageLazy() {
  return /* @__PURE__ */ jsx(Suspense, {
    fallback: /* @__PURE__ */ jsx(WaitingLoader, {}),
    children: /* @__PURE__ */ jsx(RestClientPage, {})
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index_lazy$2,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const variablesPage = {
  metaTitle: "REST client App / Variables",
  metaName: "description",
  metaContent: "Welcome to Variables"
};
const header$1 = "_header_7nffa_1";
const wrapper = "_wrapper_7nffa_5";
const container$1 = "_container_7nffa_12";
const headerContainer$1 = "_headerContainer_7nffa_20";
const styles$2 = {
  header: header$1,
  wrapper,
  container: container$1,
  headerContainer: headerContainer$1
};
const meta$2 = pageMeta(variablesPage);
function VariablesPage$1() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const variables = useSelector(selectVariables);
  const { addVariable, removeVariable, updateVariable } = useActions();
  return /* @__PURE__ */ jsx("div", { className: styles$2.wrapper, children: /* @__PURE__ */ jsxs("div", { className: styles$2.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$2.headerContainer, children: [
      /* @__PURE__ */ jsx("h1", { className: styles$2.header, children: t("variablesPage.header") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate(AppRoutes.HISTORY), children: t("buttons.btnHistory") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate(AppRoutes.REST_CLIENT), children: t("buttons.btnRestClient") })
    ] }),
    /* @__PURE__ */ jsx(
      KeyValueEditor,
      {
        keyHeader: t("variablesPage.keyHeader"),
        valueHeader: t("variablesPage.valueHeader"),
        keyValues: variables,
        keyPlaceholder: t("keyValueEditor.keyPlaceholder"),
        valuePlaceholder: t("keyValueEditor.valuePlaceholder"),
        onAdd: addVariable,
        onUpdate: updateVariable,
        onDelete: removeVariable
      }
    )
  ] }) });
}
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VariablesPage$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const VariablesPage = lazy(() => Promise.resolve().then(() => index$2));
const index_lazy$1 = UNSAFE_withComponentProps(function VariablesPageLazy() {
  return /* @__PURE__ */ jsx(Suspense, {
    fallback: /* @__PURE__ */ jsx(WaitingLoader, {}),
    children: /* @__PURE__ */ jsx(VariablesPage, {})
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index_lazy$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function mapHistoryFromRow(historyRow) {
  const { latency_ms, timestamp, ...rest } = historyRow;
  return {
    latencyMs: latency_ms,
    timestamp: new Date(timestamp),
    ...rest
  };
}
const historyPageMessages = {
  metaTitle: "REST client App / History",
  metaName: "description",
  metaContent: "Welcome to History"
};
const header = "_header_ect7a_1";
const headerContainer = "_headerContainer_ect7a_5";
const container = "_container_ect7a_11";
const table = "_table_ect7a_18";
const link$1 = "_link_ect7a_39";
const styles$1 = {
  header,
  headerContainer,
  container,
  table,
  link: link$1
};
const meta$1 = pageMeta(historyPageMessages);
function HistoryPage$1({ data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: styles$1.headerContainer, children: [
      /* @__PURE__ */ jsx("h1", { className: styles$1.header, children: t("history.header") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate(AppRoutes.VARIABLES), children: t("buttons.btnVariables") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate(AppRoutes.REST_CLIENT), children: t("buttons.btnRestClient") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$1.container, children: /* @__PURE__ */ jsxs("table", { className: styles$1.table, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.action") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.timestamp") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.url") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.latency") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.status") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.method") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.requestSize") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.responseSize") }),
        /* @__PURE__ */ jsx("th", { children: t("history.table.headers.error") })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 8, children: t("history.table.emptyMessage") }) }),
        data.sort((a, b) => {
          return b.timestamp.getTime() - a.timestamp.getTime();
        }).map((record) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            Link,
            {
              className: styles$1.link,
              to: AppRoutes.REST_CLIENT,
              state: { history: record },
              children: t("history.table.openLink")
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: record.timestamp.toLocaleString() }),
          /* @__PURE__ */ jsx("td", { children: record.url }),
          /* @__PURE__ */ jsx("td", { children: record.latencyMs }),
          /* @__PURE__ */ jsx("td", { children: record.status }),
          /* @__PURE__ */ jsx("td", { children: record.method }),
          /* @__PURE__ */ jsx("td", { children: record.requestSize }),
          /* @__PURE__ */ jsx("td", { children: record.responseSize }),
          /* @__PURE__ */ jsx("td", { children: record.error })
        ] }, record.timestamp.getTime()))
      ] })
    ] }) })
  ] });
}
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HistoryPage$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const HistoryPage = lazy(() => Promise.resolve().then(() => index$1));
async function loader({
  request
}) {
  const {
    client,
    headers: headers2
  } = getServerSupabaseClient(request);
  return {
    headers: headers2,
    history: (await getHistoryForCurrentUser(client)).map(mapHistoryFromRow)
  };
}
const index_lazy = UNSAFE_withComponentProps(function HistoryPageLazy({
  loaderData: {
    history: history2
  }
}) {
  return /* @__PURE__ */ jsx(Suspense, {
    fallback: /* @__PURE__ */ jsx(WaitingLoader, {}),
    children: /* @__PURE__ */ jsx(HistoryPage, {
      data: history2
    })
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index_lazy,
  loader,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const mergedDataResponse = (responseText, body2) => {
  let parsedResponse;
  let parsedBody;
  let mergedData;
  try {
    parsedResponse = JSON.parse(responseText);
    parsedBody = body2 ? JSON.parse(body2) : null;
  } catch {
    parsedResponse = responseText;
    parsedBody = body2;
  }
  if (body2 && parsedResponse && typeof parsedResponse === "object") {
    mergedData = {
      ...parsedBody,
      ...parsedResponse
    };
  } else {
    mergedData = parsedResponse ?? body2;
  }
  return mergedData;
};
const interpolate = (str, template) => {
  for (const [key, value] of template) {
    str = str.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return str;
};
const action$1 = async ({
  request
}) => {
  const actionRequestHeaders = request.headers;
  const formData = await request.formData();
  const jsonDataString = formData.get(REQUEST_DATA_NAME);
  if (!jsonDataString || typeof jsonDataString != "string") {
    console.log(`'${REQUEST_DATA_NAME}' not found in FormData or is not a string.`);
    return {
      ok: false,
      received: null,
      status: null,
      error: "Request data not found",
      headers: actionRequestHeaders,
      requestDetails: {
        timestamp: /* @__PURE__ */ new Date()
      }
    };
  }
  const requestData = JSON.parse(jsonDataString);
  const {
    clientState,
    globalVariables
  } = requestData;
  const variablesMap = new Map(globalVariables.map((item) => [item.key, item.value]));
  const {
    body: rawBody,
    method,
    headers: rawHeaders,
    protocol,
    url: rawUrl
  } = clientState;
  const url = interpolate(`${protocol}${rawUrl}`, variablesMap);
  const body2 = method !== HttpMethods.GET && method !== HttpMethods.HEAD && method !== HttpMethods.OPTIONS && method !== HttpMethods.DELETE ? interpolate(rawBody, variablesMap) : null;
  const headers2 = rawHeaders.map((header2, index2) => ({
    id: index2,
    key: interpolate(header2.key, variablesMap),
    value: interpolate(header2.value, variablesMap)
  }));
  const finalUrl = getFinalUrlParams(body2, method, headers2, url);
  const fetchWithMetrics = buildFetchWithMetrics({
    body: body2,
    method,
    headers: headers2,
    url
  });
  const requestDetails = {
    timestamp: /* @__PURE__ */ new Date(),
    method,
    url
  };
  try {
    const {
      response: res,
      metrics
    } = await fetchWithMetrics();
    if (!res.ok) {
      return {
        ok: false,
        received: null,
        status: res.status,
        error: `Request failed with status ${res.status}`,
        headers: actionRequestHeaders,
        finalUrl,
        responseMetrics: metrics,
        requestDetails
      };
    }
    const responseText = await res.text();
    const mergedData = mergedDataResponse(responseText, body2);
    return {
      ok: true,
      received: mergedData,
      status: res.status,
      headers: actionRequestHeaders,
      finalUrl,
      responseMetrics: metrics,
      requestDetails
    };
  } catch (error2) {
    const errorMessage = error2.message;
    return {
      ok: false,
      received: null,
      status: null,
      error: errorMessage,
      headers: actionRequestHeaders,
      requestDetails
    };
  }
};
const buildFetchWithMetrics = (fetchParams) => {
  const {
    body: body2,
    method,
    headers: headers2,
    url
  } = fetchParams;
  const headersObject = Object.fromEntries(headers2.map((header2) => [header2.key, header2.value]));
  return async () => {
    const startTime = performance.now();
    const response2 = await fetch(url, {
      method,
      body: body2,
      headers: headersObject
    });
    const endTime = performance.now();
    const latencyMs = Math.trunc(endTime - startTime);
    const requestSizeBytes = body2 ? new Blob([body2]).size : 0;
    let responseSizeBytes;
    if (response2.headers.get("Content-Length") !== null) {
      responseSizeBytes = parseInt(response2.headers.get("Content-Length") ?? "0");
    } else {
      const responseClone = response2.clone();
      const responseBuffer = await responseClone.blob();
      responseSizeBytes = responseBuffer.size;
    }
    return {
      response: response2,
      metrics: {
        latencyMs,
        requestSize: requestSizeBytes,
        responseSize: responseSizeBytes
      }
    };
  };
};
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
async function action({
  request
}) {
  const formData = await request.formData();
  const lng = formData.get(InputName.LANGUAGE)?.toString() || Language.EN;
  const finalLng = [Language.EN, Language.RU].includes(lng) ? lng : Language.EN;
  return redirect(request.headers.get("Referer") ?? AppRoutes.HOME, {
    headers: {
      "Set-Cookie": await languageCookie.serialize(finalLng)
    }
  });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const notFoundPage = {
  metaTitle: "REST client App / Error 404",
  metaName: "description",
  metaContent: "Error 404 / Page not Found"
};
const notFoundContainer = "_notFoundContainer_14enq_1";
const notFoundSection = "_notFoundSection_14enq_8";
const notFoundTitle = "_notFoundTitle_14enq_14";
const notFoundInfo = "_notFoundInfo_14enq_19";
const link = "_link_14enq_35";
const styles = {
  notFoundContainer,
  notFoundSection,
  notFoundTitle,
  notFoundInfo,
  link
};
function meta({
  location
}) {
  return [{
    title: notFoundPage.metaTitle
  }, {
    name: notFoundPage.metaName,
    content: `${notFoundPage.metaContent} - ${location.pathname}`
  }];
}
const index = UNSAFE_withComponentProps(function NotFoundPage() {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  return /* @__PURE__ */ jsx("main", {
    className: styles.notFoundContainer,
    children: /* @__PURE__ */ jsxs("section", {
      className: styles.notFoundSection,
      children: [/* @__PURE__ */ jsx("h1", {
        className: styles.notFoundTitle,
        children: t("notFoundPage.title")
      }), /* @__PURE__ */ jsxs("p", {
        className: styles.notFoundInfo,
        children: [t("notFoundPage.metaContent"), " - ", location.pathname]
      }), /* @__PURE__ */ jsx(Link, {
        to: AppRoutes.HOME,
        className: styles.link,
        children: t("buttons.btnBack")
      })]
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D_1pitoP.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/index-De8f5Rlr.js", "/assets/index-D5drsK32.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BgpEfNPL.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/index-De8f5Rlr.js", "/assets/index-D5drsK32.js", "/assets/useActions-BszarLlk.js", "/assets/useAppInitializer-BlIbNgOo.js", "/assets/index-CccItA-E.js", "/assets/react-redux-D-ZMRAB3.js", "/assets/useTranslation-DXBimYVq.js", "/assets/constants-DpNX-Nkr.js", "/assets/index-DoCg87t9.js", "/assets/developerList-DHiqLtt3.js", "/assets/errors-CoG0Sso0.js", "/assets/selectors-BWbzJZ6c.js", "/assets/supabaseClient-DY9RoP_i.js", "/assets/useSaveUserToLS-DIEwQHbH.js", "/assets/preload-helper-BXl3LOEh.js"], "css": ["/assets/root-BeHPqHHW.css", "/assets/index-CAOKBxpR.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/mainPage/index": { "id": "routes/mainPage/index", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-DlkITXBd.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/selectors-BWbzJZ6c.js", "/assets/react-redux-D-ZMRAB3.js", "/assets/useTranslation-DXBimYVq.js", "/assets/developerList-DHiqLtt3.js", "/assets/images-BlyGK0L5.js", "/assets/index-BYZrWzNU.js", "/assets/metaHelpers-C0J2Sg90.js", "/assets/constants-DpNX-Nkr.js", "/assets/index-DoCg87t9.js"], "css": ["/assets/index-BZkWvy93.css", "/assets/index-DQ32LpfJ.css", "/assets/index-CAOKBxpR.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signInPage/index": { "id": "routes/signInPage/index", "parentId": "routes/mainPage/index", "path": "/signIn", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-C0bJtgcI.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/authError-IcKkR9Mu.js", "/assets/supabaseClient-DY9RoP_i.js", "/assets/index-CccItA-E.js", "/assets/useTranslation-DXBimYVq.js", "/assets/constants-DpNX-Nkr.js", "/assets/toasts-D6dcO255.js", "/assets/index-Dld79zns.js", "/assets/useActions-BszarLlk.js", "/assets/useSaveUserToLS-DIEwQHbH.js", "/assets/metaHelpers-C0J2Sg90.js", "/assets/index-DoCg87t9.js", "/assets/preload-helper-BXl3LOEh.js", "/assets/index-D5drsK32.js", "/assets/react-redux-D-ZMRAB3.js", "/assets/errors-CoG0Sso0.js"], "css": ["/assets/index-t2y7AJ7h.css", "/assets/authError-DsXWlitX.css", "/assets/index-CAOKBxpR.css", "/assets/index-D79CwlIT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signUpPage/index": { "id": "routes/signUpPage/index", "parentId": "routes/mainPage/index", "path": "/signUp", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-CcOkoaTJ.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/useTranslation-DXBimYVq.js", "/assets/authError-IcKkR9Mu.js", "/assets/supabaseClient-DY9RoP_i.js", "/assets/index-CccItA-E.js", "/assets/constants-DpNX-Nkr.js", "/assets/toasts-D6dcO255.js", "/assets/index-Dld79zns.js", "/assets/images-BlyGK0L5.js", "/assets/index-De8f5Rlr.js", "/assets/index-DoCg87t9.js", "/assets/metaHelpers-C0J2Sg90.js", "/assets/preload-helper-BXl3LOEh.js", "/assets/index-D5drsK32.js"], "css": ["/assets/index-CncN-_14.css", "/assets/authError-DsXWlitX.css", "/assets/index-CAOKBxpR.css", "/assets/index-D79CwlIT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privateRoutes/index": { "id": "routes/privateRoutes/index", "parentId": "root", "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-CYXOgbLO.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/selectors-BWbzJZ6c.js", "/assets/index-CccItA-E.js", "/assets/react-redux-D-ZMRAB3.js", "/assets/useTranslation-DXBimYVq.js", "/assets/toasts-D6dcO255.js", "/assets/index-BJ8A_XIr.js", "/assets/useActions-BszarLlk.js", "/assets/useAppInitializer-BlIbNgOo.js", "/assets/useSaveUserToLS-DIEwQHbH.js", "/assets/images-BlyGK0L5.js", "/assets/errors-CoG0Sso0.js"], "css": ["/assets/index-BLbvd2f4.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privateRoutes/restClientPage/index.lazy": { "id": "routes/privateRoutes/restClientPage/index.lazy", "parentId": "routes/privateRoutes/index", "path": "/restClient", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index.lazy-Dulv5Qtt.js", "imports": ["/assets/preload-helper-BXl3LOEh.js", "/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/index-BJ8A_XIr.js", "/assets/index-DoCg87t9.js", "/assets/useActions-BszarLlk.js", "/assets/react-redux-D-ZMRAB3.js", "/assets/useTranslation-DXBimYVq.js", "/assets/constants-DpNX-Nkr.js", "/assets/supabaseClient-DY9RoP_i.js", "/assets/index-BYZrWzNU.js", "/assets/metaHelpers-C0J2Sg90.js", "/assets/errors-CoG0Sso0.js", "/assets/selectors-zyYo9xgv.js", "/assets/index-Dld79zns.js", "/assets/images-BlyGK0L5.js", "/assets/index-D5drsK32.js"], "css": ["/assets/index-Oyf_pA5U.css", "/assets/index-BLbvd2f4.css", "/assets/index-CAOKBxpR.css", "/assets/index-DQ32LpfJ.css", "/assets/selectors-DLOAoPLA.css", "/assets/index-D79CwlIT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privateRoutes/variablesPage/index.lazy": { "id": "routes/privateRoutes/variablesPage/index.lazy", "parentId": "routes/privateRoutes/index", "path": "/variables", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index.lazy-CQ-Yq_TF.js", "imports": ["/assets/preload-helper-BXl3LOEh.js", "/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/index-BJ8A_XIr.js", "/assets/index-DoCg87t9.js", "/assets/useActions-BszarLlk.js", "/assets/selectors-zyYo9xgv.js", "/assets/react-redux-D-ZMRAB3.js", "/assets/useTranslation-DXBimYVq.js", "/assets/metaHelpers-C0J2Sg90.js", "/assets/images-BlyGK0L5.js", "/assets/index-Dld79zns.js"], "css": ["/assets/index-CcpwVmsx.css", "/assets/index-BLbvd2f4.css", "/assets/index-CAOKBxpR.css", "/assets/selectors-DLOAoPLA.css", "/assets/index-D79CwlIT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privateRoutes/historyPage/index.lazy": { "id": "routes/privateRoutes/historyPage/index.lazy", "parentId": "routes/privateRoutes/index", "path": "/history", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index.lazy-CmO79WI3.js", "imports": ["/assets/preload-helper-BXl3LOEh.js", "/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/index-BJ8A_XIr.js", "/assets/index-DoCg87t9.js", "/assets/useTranslation-DXBimYVq.js", "/assets/metaHelpers-C0J2Sg90.js", "/assets/images-BlyGK0L5.js"], "css": ["/assets/index-CIfI5lzF.css", "/assets/index-BLbvd2f4.css", "/assets/index-CAOKBxpR.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privateRoutes/restClientPage/serverFetch": { "id": "routes/privateRoutes/restClientPage/serverFetch", "parentId": "root", "path": "/api/fetch", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/serverFetch-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/set-language": { "id": "routes/set-language", "parentId": "root", "path": "/set-language", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/set-language-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/notFoundPage/index": { "id": "routes/notFoundPage/index", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-DImCRjD6.js", "imports": ["/assets/chunk-B7RQU5TL-C9rJqkoP.js", "/assets/useTranslation-DXBimYVq.js"], "css": ["/assets/index-DrpkvHKO.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-ad7f0f2b.js", "version": "ad7f0f2b", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/", "/about"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/mainPage/index": {
    id: "routes/mainPage/index",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/signInPage/index": {
    id: "routes/signInPage/index",
    parentId: "routes/mainPage/index",
    path: "/signIn",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/signUpPage/index": {
    id: "routes/signUpPage/index",
    parentId: "routes/mainPage/index",
    path: "/signUp",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/privateRoutes/index": {
    id: "routes/privateRoutes/index",
    parentId: "root",
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/privateRoutes/restClientPage/index.lazy": {
    id: "routes/privateRoutes/restClientPage/index.lazy",
    parentId: "routes/privateRoutes/index",
    path: "/restClient",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/privateRoutes/variablesPage/index.lazy": {
    id: "routes/privateRoutes/variablesPage/index.lazy",
    parentId: "routes/privateRoutes/index",
    path: "/variables",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/privateRoutes/historyPage/index.lazy": {
    id: "routes/privateRoutes/historyPage/index.lazy",
    parentId: "routes/privateRoutes/index",
    path: "/history",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/privateRoutes/restClientPage/serverFetch": {
    id: "routes/privateRoutes/restClientPage/serverFetch",
    parentId: "root",
    path: "/api/fetch",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/set-language": {
    id: "routes/set-language",
    parentId: "root",
    path: "/set-language",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/notFoundPage/index": {
    id: "routes/notFoundPage/index",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
