import AgencyContent from "../features/agency/agencyComponents/AgencyContent.jsx";
import AgencySkeleton from "../features/agency/agencyComponents/AgencySkeleton.jsx";
import useCompanies from "../shared/services/useCompanies.js";

const AgencyPage = () => {
    const { error, isLoading } = useCompanies();

    return (
        <>
            {isLoading && <AgencySkeleton />}
            {!isLoading && <AgencyContent />}
        </>
    );
};

export default AgencyPage;
