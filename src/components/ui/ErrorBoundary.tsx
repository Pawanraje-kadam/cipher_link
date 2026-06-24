import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught UI Error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="p-4 bg-rose-500/10 rounded-full">
            <ShieldAlert className="w-12 h-12 text-rose-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-100">Session Terminated</h2>
            <p className="text-slate-400 max-w-md">A critical error occurred. To protect your data, the application has halted execution.</p>
          </div>
          <Button onClick={this.handleReset} className="bg-rose-600 hover:bg-rose-700 border-rose-500">
            <RefreshCw className="w-4 h-4 mr-2" /> Reload Securely
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}