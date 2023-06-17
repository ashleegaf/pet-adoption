import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
	children: ReactNode;
}
interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// when error occurs, show fallback UI
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('ErrorBoundary', error, errorInfo);
	}

	render() { // render fallback UI
		if (this.state.hasError) {
			return (
				<h2>
					Error with this listing.{' '}
					<Link to='/'>Click here to return home.</Link>
				</h2>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
