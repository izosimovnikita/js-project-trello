export const ADD_COLUMN = 'ADD_COLUMN';
export const DELETE_COLUMN = 'DELETE_COLUMN';
export const EDIT_COLUMN_TITLE = 'EDIT_COLUMN_TITLE';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const EDIT_CARD = 'EDIT_CARD';

export function addColumn(args) {
    return {
        type: ADD_COLUMN,
        payload: {
            title: args.title,
            idColumn: args.idColumn
        }
    }
}

export function deleteColumn(args) {
    return {
        type: DELETE_COLUMN,
        payload: {
            idColumn: args.idColumn
        }
    }
}

export function addCard(args) {
    return {
        type: ADD_CARD,
        payload: {
            cardText: args.cardText,
            idColumn: args.idColumn,
            idCard: args.idCard
        }
    }
}

export function editCard(args) {
    return {
        type: EDIT_CARD,
        payload: {
            newCardText: args.newCardText,
            idCard: args.idCard,
            idColumn: args.idColumn
        }
    }
}

export function deleteCard(args) {
    return {
        type: DELETE_CARD,
        payload: {
            idCard: args.idCard,
            idColumn: args.idColumn
        }
    }
}

