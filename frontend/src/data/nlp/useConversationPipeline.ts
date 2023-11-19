import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/fetcher';

const useConversationPipeline= (cid: string) => {
    // const { user } = useUser();

    const url = `/nlp/conversational-pipeline/?cid=${cid}`
    const { data, error, isValidating } = useSWRImmutable<any, any>(cid ? url : null , fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useConversationPipeline;