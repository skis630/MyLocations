export const locReducer = (state = JSON.parse(localStorage["locations"] || "[]"), action) => {
    switch (action.type) {
        case "ADD_LOCATION":
            return [...state, 
                    {id: action.payload.id, name: action.payload.name, address: action.payload.address,
                     lat: action.payload.lat, long: action.payload.long,
                     category: action.payload.category, editable: false}]
        case "DELETE_LOCATION":
            return state.filter((loc) => loc.id !== action.payload.id)
        case "TOGGLE_EDIT_LOCATION":
            return state.map(loc => {
                if (loc.id === action.payload.id) { 
                    return {...loc, editable: !loc.editable}
                } else {
                    return loc
                }
            })
        case "EDIT_LOCATION":
            return state.map(loc => {
                if (loc.id === action.payload.id) {
                    return {id: action.payload.id, name: action.payload.name,
                        address: action.payload.address, lat: action.payload.lat,
                        long: action.payload.long, category: action.payload.category,
                        editable: false}
                } else {
                    return loc
                }
            })
        case "SORT":
            return action.payload
        case "GROUP":
            return action.payload
        case "REVERT":
            return action.payload
        default:
            return state
    }

}