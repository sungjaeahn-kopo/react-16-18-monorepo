export function makeBigList(v, n = 30000) {
    const baseList = new Array(n);
    for (let i = 0; i < n; i++) {
        baseList[i] = `Item-${i}`; // Generate a base list of items
    }

    if (!v) {
        return []; // Return an empty list if no search term
    }

    // Filter the list based on the input value 'v'
    const filteredList = baseList.filter(item => item.includes(v));

    return filteredList;
}
