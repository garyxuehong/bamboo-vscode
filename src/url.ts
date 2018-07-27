export function getSearchPlanUrl(searchTerm: string, server: string) {
    return (
        server +
        "/rest/api/latest/search/plans.json?fuzzy=true&searchTerm=" +
        searchTerm
    );
}

export function getBrowsePlanUrl(id: string, server: string) {
    return server + "/browse/" + id;
}
