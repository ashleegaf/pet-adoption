import { useState, useEffect } from 'react';

interface BreedListResponse {
	breeds: string[];
}

const localCache: { [k: string]: string[] } = {};

const useBreedList = (animal: string) => {
	const [breedList, setBreedList] = useState<string[] | []>([]);
	const [status, setStatus] = useState('unloaded');

	useEffect(() => {
		const requestBreedList = async () => {
			setBreedList([]);
			setStatus('loading');

			const response = await fetch(
				`http://pets-v2.dev-apis.com/breeds?animal=${animal}`
			);
			const data: BreedListResponse = await response.json();
			localCache[animal] = data.breeds || [];
			setBreedList(localCache[animal]);
			setStatus('loaded');
		};

		if (!animal) setBreedList([]);
		else if (localCache[animal]) setBreedList(localCache[animal]);
		else requestBreedList();
	}, [animal]);

	return [breedList]; // can return status for testing purposes
};

export default useBreedList;
