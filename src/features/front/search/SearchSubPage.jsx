import Container from "../../../package/layout/_Container";
import useIdol from "../../../shared/services/useIdol";
import SearchContent from "./SearchContent";
import SearchError from "./SearchError";
import SearchSkeleton from "./SearchSkeleton";

const SearchSubPage = () => {
    const { isPendingIdol, errorIdol } = useIdol();

    return (
        <Container>
            {isPendingIdol && <SearchSkeleton />}
            {!isPendingIdol && errorIdol && <SearchError />}
            {!isPendingIdol && !errorIdol && <SearchContent />}
        </Container>
    );
};

export default SearchSubPage;
