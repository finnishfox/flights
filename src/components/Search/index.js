import Search from "./Search";
import {connect} from 'react-redux';
import {getSearchQuery} from "./Search.selectors";
import {searchQuerySet} from "./Search.actions";

const mapStateToProps = state => ({
    searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
    searchQuerySet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);