import { QueryFunctionContext } from '@tanstack/react-query';

interface PetApiResponse {
	numberOfResults: number;
	startIndex: number;
	endIndex: number;
	hasNext: boolean;
	pets: Pet[];
}

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

const fetchPet = async ({ queryKey }: QueryFunctionContext<string[]>) => {
	const id = queryKey[1];

	const apiResponse = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

	if (!apiResponse.ok) {
		throw new Error(`details/${id} fetch is not ok`);
	}

	return apiResponse.json() as Promise<PetApiResponse>;
};

export default fetchPet;
