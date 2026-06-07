import { Component, ErrorInfo, ReactNode } from "react";

interface State {
  error: Error | null;
  info: ErrorInfo | null;
}

/**
 * Top-level ErrorBoundary. Catches render-time errors in the route tree so
 * the page never goes silently blank — surfaces the actual error in the UI
 * and the console for diagnosis.
 */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info.componentStack);
    this.setState({ info });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="max-w-2xl w-full bg-card border border-border rounded-xl p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-primary mb-3">
              Something went wrong while loading this page.
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Please refresh. If the problem persists, share this message with us:
            </p>
            <pre className="text-xs bg-muted/40 border border-border rounded p-3 overflow-auto whitespace-pre-wrap">
              {this.state.error.name}: {this.state.error.message}
              {this.state.info?.componentStack ? `\n${this.state.info.componentStack}` : ""}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
