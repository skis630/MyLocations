export const display = (state = "category", action) => {
    switch(action.type) {
        case "category":
            return state
        case "location":
            return "locations"
        default:
            return "category"
    }
} 