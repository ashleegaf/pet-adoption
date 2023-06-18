import Pet from './Pet';

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

const PetList = ({ pets }: { pets: Pet[] }) => {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			{!pets.length ? (
				<h1>No Pets Found</h1>
			) : (
				pets.map((pet) => (
					<Pet
						id={pet.id}
						animal={pet.animal}
						name={pet.name}
						breed={pet.breed}
						images={pet.images}
						location={`${pet.city}, ${pet.state}`}
						key={pet.id}
					/>
				))
			)}
		</div>
	);
};

export default PetList;
