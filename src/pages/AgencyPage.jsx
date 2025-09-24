import AgencyContent from "../features/agency/agencyComponents/AgencyContent.jsx";
import AgencySkeleton from "../features/agency/agencyComponents/AgencySkeleton.jsx";
import useAgency from "../features/agency/agencyServices/useAgency.js";

const AgencyPage = () => {
    const { error, isLoading } = useAgency();

    return (
        <>
            {isLoading && <AgencySkeleton />}
            {!isLoading && <AgencyContent />}
        </>
    );
};

export default AgencyPage;
