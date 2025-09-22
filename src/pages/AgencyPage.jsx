import AgencyContent from "../features/agency/agencyComponents/AgencyContent.jsx";
import AgencySkeleton from "../features/agency/agencyComponents/AgencySkeleton.jsx";
import { useAgency } from "../features/agency/agencyServices/useAgency.js";
import useLinkUpStore from "../shared/store/store.js";

const AgencyPage = () => {
    const { error, isLoading } = useAgency();
    const artistArray = useLinkUpStore((state) => state.artistArray);
    console.log({ artistArray });

    return (
        <>
            {isLoading && <AgencySkeleton />}
            {!isLoading && <AgencyContent />}
        </>
    );
};

export default AgencyPage;
