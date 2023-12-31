import { useState } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
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

interface Pet {
	id: number;
	name: string;
	animal: string;
	city: string;
	state: string;
	description: string;
	breed: string;
	images: string[];
}

const App = () => {
	// pass entire hook to give children read and write access
	const adoptedPetHook = useState<Pet>({
		id: 0,
		name: '',
		animal: '',
		city: '',
		state: '',
		description: '',
		breed: '',
		images: [],
	});

	return (
		<div className='m-0 p-0' style={{ backgroundColor: '#f4faf8' }}>
			<BrowserRouter>
				{/* expose cache and adopted pet context to children */}
				<QueryClientProvider client={queryClient}>
					<AdoptedPetContext.Provider value={adoptedPetHook}>
						<header className='mb-10 w-full bg-emerald-600 p-7 text-center'>
							<Link
								to='/'
								className='text-6xl text-white hover:text-emerald-900'
							>
								Adopt Me!
							</Link>
						</header>
						<Routes>
							<Route path='/details/:id' element={<PetDetails />} />
							<Route path='/' element={<SearchParams />} />
						</Routes>
					</AdoptedPetContext.Provider>
				</QueryClientProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
