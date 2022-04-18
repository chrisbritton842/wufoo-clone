const SET_FORMS = '/forms/setForms';

const setForms = (forms) => {
    return {
        type: SET_FORMS,
        payload: forms
    };
};

export const createForm = (title, inputs, labels, description, userId) => async (dispatch) => {
    const response = await fetch(`/api/forms/${userId}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            inputs,
            labels,
            description
        })
    });

    if (response.ok) {
        const forms = await response.json();
        dispatch(setForms(forms));
    }
};

export const getForms = (userId) => async (dispatch) => {
    const response = await fetch(`/api/forms/${userId}`);

    if (response.ok) {
        const forms = await response.json();
        dispatch(setForms(forms));
    }
};

export const updateForm = (title, inputs, labels, description, formId) => async (dispatch) => {
    const response = await fetch(`/api/forms/${formId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            inputs,
            labels,
            description
        })
    });

    if (response.ok) {
        const forms = await response.json();
        dispatch(setForms(forms));
    }
};

export const deleteForm = (userId, id) => async (dispatch) => {
    const response = await fetch(`/api/forms/${userId}/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const forms = await response.json();
        dispatch(setForms(forms));
    }
};

const formsReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
        case SET_FORMS:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
};

export default formsReducer;
