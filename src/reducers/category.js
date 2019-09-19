export const catReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            return [...state, {id: action.payload.id, name: action.payload.name}]
        case "DELETE_CATEGORY":
            return state.filter((cat) => cat.id !== action.payload.id)
        default:
            return state
    }
}