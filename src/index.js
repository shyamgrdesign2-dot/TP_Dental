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

// Provide a harmless MoEngage stub so early calls don't crash if the SDK loads late.
if (typeof window !== "undefined") {
  window.Moengage = window.Moengage || {};
  [
    "track_event",
    "add_user_attribute",
    "add_unique_user_id",
    "add_first_name",
    "add_last_name",
    "add_email",
    "add_mobile",
    "destroy_session",
  ].forEach((fn) => {
    if (!window.Moengage[fn]) {
      window.Moengage[fn] = () => {};
    }
  });
}

const appEnv = process.env.REACT_APP_ENV || "prod";
const isProd = appEnv === "prod";
const tracesSampleRateValue =
  Number(
    process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE ??
      (isProd ? 0.2 : 1.0)
  ) || 1.0;

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
  tracesSampleRate: tracesSampleRateValue,
  tracePropagationTargets: [],
  sendDefaultPii: true,
  environment: appEnv,
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

// Register Service Worker for PWA
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Only register on HTTPS or localhost (PWA requirement)
  const isSecureContext = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isSecureContext) {
    window.addEventListener('load', () => {
      // Check if service worker is already registered
      navigator.serviceWorker.getRegistration()
        .then((existingRegistration) => {
          if (existingRegistration) {
            // Service worker already registered, just log
            if (process.env.NODE_ENV !== 'production') {
              console.log('Service Worker already registered:', existingRegistration.scope);
            }
            return existingRegistration;
          }
          // Register new service worker
          return navigator.serviceWorker.register('/serviceworker.js', {
            scope: '/'
          });
        })
        .then((registration) => {
          if (registration) {
            if (process.env.NODE_ENV !== 'production') {
              console.log('Service Worker registered successfully:', registration.scope);
            }
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker available
                    if (process.env.NODE_ENV !== 'production') {
                      console.log('Service Worker updated');
                    }
                    // Optionally show update notification to user
                  }
                });
              }
            });
          }
        })
        .catch((error) => {
          // Silently fail - service worker is optional for PWA functionality
          // Only log in development
          if (process.env.NODE_ENV !== 'production') {
            console.error('Service Worker registration failed:', error);
          }
        });
    });

    // Listen for service worker updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Service Worker controller changed');
      }
      // Optionally reload page when new service worker takes control
      // window.location.reload();
    });
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn('Service Worker requires HTTPS (or localhost)');
  }
}
