import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './assets/scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from "@sentry/react";

const isProd = process.env.REACT_APP_ENV === "prod";

Sentry.init({
  dsn: "https://a4c36bf5194238bfa49de0a593619865@o4509755819294720.ingest.us.sentry.io/4510737179475968",
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: isProd ? 0.1 : 1.0,
  tracePropagationTargets: [
    "localhost",
    window.location.origin,
    /^https:\/\/.*\.tatvacare\.in/,
    /^https:\/\/.*\.azurecontainerapps\.io/,
    /^https:\/\/.*\.azurewebsites\.net/,
  ],
  sendDefaultPii: false,
  environment: process.env.REACT_APP_ENV,
  beforeSend(event) {
    // Filter out development errors or specific error types
    if (event.environment === "dev") return null;
    return event;
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={"/"}>
      <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
