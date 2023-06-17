import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchParams from './Search/SearchParams';
import PetDetails from './Details/PetDetails';

// initialize react query's cache client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

const App = () => {
	return (
		<BrowserRouter>
			{/* expose the cache context to to all components */}
			<QueryClientProvider client={queryClient}>
				<header>
					<Link to='/'>Adopt Me!</Link>
				</header>
				<Routes>
					<Route path='/details/:id' element={<PetDetails />} />
					<Route path='/' element={<SearchParams />} />
				</Routes>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

export default App;
