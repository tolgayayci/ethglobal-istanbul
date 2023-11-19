import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/fetcher';

const useImageSegmentationPipeline= (cid: string) => {
    // const { user } = useUser();

    const url = `/cv/image-segmentation-pipeline/?cid=${cid}`
    const { data, error, isValidating } = useSWRImmutable<any, any>(cid ? url : null , fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useImageSegmentationPipeline;