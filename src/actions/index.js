export const addLoc = (name, address, coor, cat, id) => {
    return {
        type: "ADD_LOCATION",
        payload: {
            id: id,
            name: name,
            address: address,
            coordinates: coor,
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
        type: "DELETE",
        payload: {
            id: id
        }
    }
}

export const display = (type) => {
    return {
        type: type
    }
}