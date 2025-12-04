import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 border-l-4 border-red-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="text-red-600" size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Алдаа гарлаа</h1>
                                <p className="text-gray-600">Системд тодорхойгүй алдаа гарлаа. Та дахин ачаална уу.</p>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96 mb-6">
                            <p className="text-red-400 font-mono mb-2">{this.state.error && this.state.error.toString()}</p>
                            <pre className="text-gray-400 text-xs font-mono whitespace-pre-wrap">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Хуудас дахин ачаалах
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
