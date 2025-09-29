import { useQuery } from "@tanstack/react-query"

/**
 * @param {number[]} artistIdArray - `id`인지 `artist_id`인지 주의
 */
const useEvents = (artistIdArray) => {
    const sortedArtistIdArray = artistIdArray.sort()
     
    const {data, isPending: isPendingEvents, error: errorEvents} = useQuery({
        queryKey: 
    })
}

export default useEvents
