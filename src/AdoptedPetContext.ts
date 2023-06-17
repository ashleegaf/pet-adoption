import { createContext } from 'react';

type AdoptedPetContextType = [
	Pet,
	React.Dispatch<React.SetStateAction<Pet>>
];

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

const AdoptedPetContext = createContext<AdoptedPetContextType>([{
	id: 0,
	name: '',
	animal: '',
	city: '',
	state: '',
	description: '',
	breed: '',
	images: [],
// eslint-disable-next-line @typescript-eslint/no-empty-function
}, () => {}]);

export default AdoptedPetContext;
