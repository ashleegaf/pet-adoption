import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchParams from './components/SearchParams';
import Details from './components/Details';

const App = () => {
	return (
		<BrowserRouter>
      <header>
        <Link to='/'>Adopt Me!</Link>
      </header>
			<Routes>
				<Route path='/details/:id' element={<Details />} />
				<Route path='/' element={<SearchParams />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
