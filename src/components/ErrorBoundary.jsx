// ─────────────────────────────────────────────────────────────────────────────
// src/components/ErrorBoundary.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Without this, any uncaught render error anywhere in the tree (a bad field
// from the API, a third-party component throwing, etc.) unmounts the whole
// React app and the user sees a fully blank white page with nothing in the
// UI to explain why -- the only trace is a console error.
//
// This wraps the routed pages so a crash is contained, shows a recoverable
// fallback UI instead of blank white, and logs the real error to the
// console so it's actually debuggable.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] Caught a render error:", error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // Auto-recover if the user navigates to a different route after a crash
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4 px-4">
          <h2 className="text-2xl font-bold text-primaryTextColor">Something went wrong loading this page</h2>
          <p className="text-secondaryTextColor text-sm max-w-md">
            An unexpected error occurred while rendering this page. Try reloading, or go back and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primaryBtn px-6 py-2 rounded-xl text-white font-bold"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

