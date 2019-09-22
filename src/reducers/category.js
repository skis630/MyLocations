export const catReducer = (state = JSON.parse(localStorage["categories"] || "[]"), action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            return [...state, {id: action.payload.id, name: action.payload.name, editable: false}]
        case "DELETE_CATEGORY":
            return state.filter((cat) => cat.id !== action.payload.id)
        case "TOGGLE_EDIT":
            return state.map(cat => {
                if (cat.id === action.payload.id) {
                    return {...cat, editable: !cat.editable}
                } else {
                    return cat
                }
            })
        case "EDIT_CATEGORY":
            return state.map(cat => {
                if (cat.id === action.payload.id) {
                    return {id: action.payload.id, name: action.payload.name, editable: false}
                } else {
                    return cat
                }
            })
        default:
            return state
    }
}