interface PetProps {
	[k: string]: string;
}

const Pet = ({ name, animal, breed }: PetProps) => {
	return (
		<div>
			<h1>{name}</h1>
			<h2>{animal}</h2>
			<h2>{breed}</h2>
		</div>
	);
};

export default Pet;
