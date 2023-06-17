import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from '../AdoptedPetContext';
import ErrorBoundary from './ErrorBoundary';
import fetchPet from './fetchPet';
import Carousel from './Carousel';
import Modal from './Modal';

const PetDetails = () => {
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	// access adoptedPet hook from App
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);

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

	const pet = results.data.pets[0];
	const { name, animal, city, state, description, breed, images } = pet;

	return (
		<div className='details'>
			<h2>{name}</h2>
			<Carousel images={images} />
			<h2>
				{animal} - {breed} - {city}, {state}
			</h2>
			<button onClick={() => setShowModal(true)}>Adopt {name}</button>
			<p>{description}</p>
			{/* confirm when users click to adopt a pet. if yes, set adopted 
			pet in context and return home. if no, close modal */}
			{showModal ? (
				<Modal>
					<div>
						<h1>Would you like to adopt {name}?</h1>
						<div className='buttons'>
							<button
								onClick={() => {
									setAdoptedPet(pet);
									navigate('/');
								}}
							>
								Yes
							</button>
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
