import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, message: "" };

  public static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[cipherlink] fatal:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: "" });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-page bg-ink-950 flex items-center justify-center p-6 safe-x safe-b">
          <div className="w-full max-w-xl border-1 border-danger/60 bg-ink-900 shadow-hard-danger">
            <div className="px-4 py-2 bg-ink-950 border-b-1 border-danger/40 flex items-center gap-2">
              <span className="led bg-danger" />
              <span className="t-meta font-mono font-bold uppercase tracking-[0.18em] text-danger">
                fatal · session halted
              </span>
            </div>
            <div className="p-6 space-y-5">
              <pre className="font-mono t-field font-bold text-bone-50 whitespace-pre-wrap break-all">
                {this.state.message || "Unhandled exception."}
              </pre>
              <p className="text-bone-200 t-ui font-bold font-mono leading-relaxed">
                To protect your data, execution has stopped. Nothing has been
                transmitted — all state lives in this tab only. Reload to start
                a fresh session.
              </p>
              <Button variant="danger" onClick={this.handleReset}>
                <RefreshCw className="ico mr-2" /> Reload
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
