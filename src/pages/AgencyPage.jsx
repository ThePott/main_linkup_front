import AgencyContent from "../features/agency/agencyComponents/AgencyContent.jsx";
import AgencySkeleton from "../features/agency/agencyComponents/AgencySkeleton.jsx";

const AgencyPage = () => {
    const isLoading = false;

    return (
        <>
            {isLoading && <AgencySkeleton />}
            {!isLoading && <AgencyContent />}
        </>
    );
};

export default AgencyPage;
