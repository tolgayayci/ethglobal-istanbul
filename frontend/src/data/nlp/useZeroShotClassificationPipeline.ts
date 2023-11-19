import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/fetcher';

const useZeroShotClassificationPipeline= (cid: string) => {
    // const { user } = useUser();

    const url = `/nlp/zero-shot-classification-pipeline/?cid=${cid}`
    const { data, error, isValidating } = useSWRImmutable<any, any>(cid ? url : null , fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useZeroShotClassificationPipeline;