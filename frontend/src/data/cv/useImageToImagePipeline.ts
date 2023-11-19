import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/fetcher';

const useImageToImagePipeline= (cid: string) => {
    // const { user } = useUser();

    const url = `/cv/image-to-image-pipeline/?cid=${cid}`
    const { data, error, isValidating } = useSWRImmutable<any, any>(cid ? url : null , fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useImageToImagePipeline;