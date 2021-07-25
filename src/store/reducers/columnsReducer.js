import {ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN_TITLE} from "../actions/actions";

const initialState = {
    columns: {}
}

const columnsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COLUMN: {
            const {title, idColumn} = action.payload;
            return {
                ...state,
                [idColumn]: {
                    id: idColumn,
                    title,
                    cards: []
                }
            }
        }
        case DELETE_COLUMN: {
            const {idColumn} = action.payload;
            const {[idColumn]: deletedColumn, ...restOfColumn} = state;
            return state = restOfColumn;
        }
        case EDIT_COLUMN_TITLE: {
            const {idColumn, newColumnTitle} = action.payload;
            return {}
        }
        default:
            return state;
    }
}

export default columnsReducer;