import {ADD_CARD, DELETE_CARD, EDIT_CARD} from "./actions";

const initialState = {
    cards: {}
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD: {
            const {cardText, idColumn, idCard} = action.payload;
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
export default cardsReducer;
