export const addLoc = (name, address, lat, long, cat, id) => {
    return {
        type: "ADD_LOCATION",
        payload: {
            id: id,
            name: name,
            address: address,
            lat: lat,
            long: long,
            category: cat
        }
    }
};

export const addCat = (name, id) => {
    return {
        type: "ADD_CATEGORY",
        payload: {
            id: id,
            name: name
        }
    }
}

export const deleteLoc = (id) => {
    return {
        type: "DELETE_LOCATION",
        payload: {
            id: id
        }
    }
}

export const sortLoc = (sortedList) => {
    return {
        type: "SORT",
        payload: sortedList
    }
}

export const groupByCat = (groups) => {
    return {
        type: "GROUP",
        payload: groups
    }
}