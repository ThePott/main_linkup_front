import AgencyContent from "../features/agency/AgencyContent";
import AgencySkeleton from "../features/agency/AgencySkeleton";

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
