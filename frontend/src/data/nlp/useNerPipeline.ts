import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/fetcher';

const useNerPipeline= (cid: string) => {
    // const { user } = useUser();

    const url = `/nlp/ner-pipeline/?cid=${cid}`
    const { data, error, isValidating } = useSWRImmutable<any, any>(cid ? url : null , fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useNerPipeline;