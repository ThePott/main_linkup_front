import AgencyContent from "../features/agency/agencyComponents/AgencyContent.jsx";
import AgencySkeleton from "../features/agency/agencyComponents/AgencySkeleton.jsx";
import useCompanies from "../shared/services/useCompanies.js";
import useRedirectIfNot from "../shared/utils/useRedirectIfNot.js";

const AgencyPage = () => {
    const { error, isLoading } = useCompanies();
    const { isOkayToShow } = useRedirectIfNot("company");

    if (!isOkayToShow) {
        return null;
    }

    return (
        <>
            {isLoading && <AgencySkeleton />}
            {!isLoading && <AgencyContent />}
        </>
    );
};

export default AgencyPage;
