import { useEffect } from "react";
import AgencyContent from "../features/agency/AgencyContent";
import { dummyAgencyUser } from "../shared/store/dummyThepott.js";
import useLinkUpStore from "../shared/store/store";
import AgencySkeleton from "../features/agency/AgencySkeleton";

const AgencyPage = () => {
    const isLoading = false;
    const setUser = useLinkUpStore((state) => state.setUser);

    useEffect(() => {
        console.log("---- fill in dummies");
        setUser(dummyAgencyUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <AgencySkeleton />}
            {!isLoading && <AgencyContent />}
        </>
    );
};

export default AgencyPage;
