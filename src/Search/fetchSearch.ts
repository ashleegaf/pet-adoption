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

interface RequestParams {
	animal: string;
	breed: string;
	location: string;
}

const fetchSearch = async ({ queryKey }: 
  QueryFunctionContext<(string | RequestParams)[]>) => {
	const { animal, location, breed } = queryKey[1] as RequestParams;

	const apiResponse = await fetch(
		`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
	);

	if (!apiResponse.ok) {
		throw new Error(
			`Pet search error for ${animal}, ${location}, and ${breed}`
		);
	}

	return apiResponse.json() as Promise<PetApiResponse>;
};

export default fetchSearch;
