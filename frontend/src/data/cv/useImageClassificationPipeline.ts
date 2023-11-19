import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/fetcher';

const useImageClassificationPipeline= (cid: string) => {
    // const { user } = useUser();

    const url = `/cv/image-classification-pipeline/?cid=${cid}`
    const { data, error, isValidating } = useSWRImmutable<any, any>(cid ? url : null , fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useImageClassificationPipeline;