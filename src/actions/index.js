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

export const toggleEditLoc = (id) => {
    return { 
        type: "TOGGLE_EDIT_LOCATION",
        payload: {
            id: id
        }
    }
}

export const editLoc = (id, name, lat, long, cat, address) => {
    return {
        type: "EDIT_LOCATION",
        payload: {
            id: id,
            name: name,
            lat: lat,
            long: long,
            category: cat,
            address: address
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

export const revertToLocs = (locs) => {
    return {
        type: "REVERT",
        payload: locs
    }
}

export const addCat = (name, id) => {
    return {
        type: "ADD_CATEGORY",
        payload: {
            id: id,
            name: name
        }
    }
}

export const deleteCat = (id) => {
    return {
        type: "DELETE_CATEGORY",
        payload: {
            id: id
        }
    }
}

export const toggleEditCat = (id) => {
    return {
        type: "TOGGLE_EDIT",
        payload: {
            id: id
        }
    }
}

export const editCat = (id, name) => {
    return {
        type: "EDIT_CATEGORY",
        payload: {
            id: id,
            name: name
        }
    }
}

