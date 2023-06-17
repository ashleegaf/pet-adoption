import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';
import fetchPet from './fetchPet';
import Carousel from './Carousel';
import Modal from './Modal';

const PetDetails = () => {
	const [showModal, setShowModal] = useState(false);
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
			<button onClick={() => setShowModal(true)}>Adopt {name}</button>
			<p>{description}</p>
			{showModal ? (
				<Modal>
					<div>
						<h1>Would you like to adopt {name}?</h1>
						<div className='buttons'>
							<button>Yes</button>
							<button onClick={() => setShowModal(false)}>No</button>
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	);
};

const DetailsErrorBoundary = (props: { [k: string]: string }) => {
	return (
		<ErrorBoundary>
			<PetDetails {...props} />
		</ErrorBoundary>
	);
};

export default DetailsErrorBoundary;
