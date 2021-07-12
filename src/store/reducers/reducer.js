const initialState = {
    columns: []
};

const newColumnId = (columns) => {
    return columns.reduce((maxId, column) => Math.max(maxId, column.id), -1) + 1;
}

export const columnsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COLUMN': {
            const { newTitle } = action.payload;
            return {
                ...state,
                columns: [
                    ...state.columns,
                    {
                        id: newColumnId(state.columns),
                        title: newTitle,
                        cards: [],
                    }
                ]
            }
        }
        case 'DELETE_COLUMN': {
            const { columnId } = action.payload;
            return {
                ...state,
                columns: state.columns.filter(item => item.id !== columnId)
            };
        }
        default:
            return state;
    }
}