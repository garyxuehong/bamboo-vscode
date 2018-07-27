import fetch from "node-fetch";

import { getSearchPlanUrl } from "./url";

export async function findAllPlans(
    searchTerm: string,
    server: string
): Promise<IPlan[]> {
    const url = getSearchPlanUrl(searchTerm, server);
    const result = await (await fetch(url)).json();
    return result.searchResults;
}
