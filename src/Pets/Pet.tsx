import { Link } from 'react-router-dom';

interface PetCustom {
	id: number;
	name: string;
	animal: string;
	location: string;
	breed: string;
	images: string[];
}

const Pet = (props: PetCustom) => {
	const { name, animal, breed, images, location, id } = props;
	let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
	if (images.length) hero = images[0];

	return (
		<Link to={`/details/${id}`} className='relative block'>
			<div className='image-container'>
				<img src={hero} alt={name} className='w-80'/>
			</div>
			<div className='absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2'>
				<h1>{name}</h1>
				<h2>
					{animal} - {breed} - {location}
				</h2>
			</div>
		</Link>
	);
};

export default Pet;
