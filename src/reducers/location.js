export const locReducer = (state = JSON.parse(localStorage["locations"] || "[]"), action) => {
    switch (action.type) {
        case "ADD_LOCATION":
            return [...state, 
                    {id: action.payload.id, name: action.payload.name, address: action.payload.address,
                     coordinates: action.payload.coordinates, category: action.payload.category}]
        case "DELETE_LOCATION":
            return state.filter((loc) => loc.id !== action.payload.id)
        case "SORT":
            return action.payload
        case "GROUP":
            return action.payload
        default:
            return state
    }

}