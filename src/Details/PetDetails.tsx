import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchPet from './fetchPet';
import Carousel from './Carousel';

const PetDetails = () => {
	const { id } = useParams();
	// if the query key isn't in cache, call fetchPet()
	const results = useQuery(['details', id || ''], fetchPet);

	if (results.isError) {
		return <h2>Error loading pet details</h2>;
	} else if (results.isLoading) {
		return (
			<div className='loading-pane'>
				<h2 className='loader'>🌀</h2>
			</div>
		);
	}

	const { name, animal, city, state, description, breed, images } =
		results.data.pets[0];

	return (
		<div className='details'>
			<h2>{name}</h2>
			<Carousel images={images} />
			<h2>
				{animal} - {breed} - {city}, {state}
			</h2>
			<button>Adopt {name}</button>
			<p>{description}</p>
		</div>
	);
};

export default PetDetails;
