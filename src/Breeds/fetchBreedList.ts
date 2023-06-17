import { QueryFunctionContext } from '@tanstack/react-query';

interface BreedApiResponse {
	animal: string;
	breeds: string[]
}

const fetchBreedList = async ({ queryKey }: QueryFunctionContext<string[]>) => {
	const animal = queryKey[1];
  if (!animal) return [];

	const apiResponse = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);

	if (!apiResponse.ok) {
		throw new Error(`details/${animal} fetch is not ok`);
	}

	return apiResponse.json() as Promise<BreedApiResponse>;
};

export default fetchBreedList;
