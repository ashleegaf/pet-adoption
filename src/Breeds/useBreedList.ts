import { useQuery, UseQueryResult } from '@tanstack/react-query';
import fetchBreedList from './fetchBreedList';

interface BreedApiResponse {
	animal: string;
	breeds: string[]
}

const useBreedList = (animal: string) => {
	const results = useQuery(['breeds', animal || ''], fetchBreedList) as UseQueryResult<BreedApiResponse, unknown>;

	console.log('breed results:', results);

	return [results?.data?.breeds ?? [], results.status];
};

export default useBreedList;
