import {ADD_CARD, ADD_COLUMN, DELETE_CARD, DELETE_COLUMN, EDIT_CARD, EDIT_COLUMN_TITLE} from "../actions/actions";

const initialState = {};

const newColumnId = (columns) => {
    return columns.reduce((maxId, column) => Math.max(maxId, column.id), -1) + 1;
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COLUMN: {
            const {title, idColumn, cards = {}} = action.payload;
            return {
                ...state,
                [idColumn]: {
                    id: idColumn,
                    title,
                    cards
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
            return {
                ...state,
                [idColumn]: {
                    ...state[idColumn],
                    title: newColumnTitle
                }
            }
        }
        case ADD_CARD: {
            const {cardText = '', idColumn, idCard} = action.payload;
            return {
                ...state,
                [idColumn]: {
                    ...state[idColumn],
                    cards: {
                        ...state[idColumn].cards,
                        [idCard]: {
                            id: idCard,
                            text: cardText
                        }
                    }
                }
            }
        }
        case DELETE_CARD: {
            const {idColumn, idCard} = action.payload;
            const {[idCard]: deletedCard, ...restOfCards} = state[idColumn].cards
            return {
                ...state,
                [idColumn]: {
                    ...state[idColumn],
                    cards: restOfCards
                }
            }
        }
        case EDIT_CARD: {
            const {newCardText, idCard, idColumn} = action.payload;
            return {
                ...state,
                [idColumn]: {
                    ...state[idColumn],
                    cards: {
                        ...state[idColumn].cards,
                        [idCard]: {
                            ...state[idColumn].cards[idCard],
                            text: newCardText
                        }
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default appReducer;

