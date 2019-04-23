export const defaultState = {
    searchQuery: ''
};

export default function search(initialState = defaultState, action) {
    switch (action.type) {
        case "SEARCH_QUERY_SET":
            return {
                searchQuery: action.payload.searchQuery
            };
        default:
            return initialState;
    }
}