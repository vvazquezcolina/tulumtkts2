import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console and any error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Algo salió mal
              </h1>
              <p className="text-gray-600 mb-4">
                Oops, parece que hubo un error. Por favor, intenta recargar la página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90"
              >
                Recargar página
              </button>
              {this.state.error && (
                <details className="mt-4 text-sm text-gray-500">
                  <summary className="cursor-pointer">Detalles del error</summary>
                  <pre className="mt-2 overflow-auto text-xs">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

