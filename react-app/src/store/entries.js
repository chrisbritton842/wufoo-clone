const SET_ENTRIES = '/entries/setEntries';

const setEntries = (entries) => {
    return {
        type: SET_ENTRIES,
        payload: entries
    };
};

export const createEntry = (date, email, number, telephone, text, textArea, url, formId) => async (dispatch) => {
    const response = await fetch('/api/entries/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date,
            email,
            number,
            telephone,
            text,
            textArea,
            url,
            formId
        })
    });

    if (response.ok) {
        const entries = await response.json();
        dispatch(setEntries(entries));
    }
};

export const getEntries = () => async (dispatch) => {
    const response = await fetch('/api/entries');

    if (response.ok) {
        const entries = await response.json();
        dispatch(setEntries(entries));
    }
};

const entriesReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
        case SET_ENTRIES:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
};

export default entriesReducer;
