import Pet from './Pet';

interface PetProps {
	pets: { [k: string]: string }[];
}

const Results = ({ pets }: PetProps) => {
	return (
		<div className='search'>
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

export default Results;
