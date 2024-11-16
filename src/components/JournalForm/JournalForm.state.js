export const INITIAL_STATE = {
    isValid: {
        post: true,
        title: true,
        date: true,
    },
    values: {
        userId: 0,
        post: '',
        title: '',
        date: '',
        tag: '',
    },
    isFormReadyToSubmit: false,
};

export function formReducer(state, action) {

    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                values: { ...state.values, ...action.payload },
            };

        case 'RESET':
            return {
                ...INITIAL_STATE,
            };
        case 'RESET_VALID':
            return { ...state, isValid: INITIAL_STATE.isValid };
        case 'SUBMIT': {
            const titleValidity = action.payload.title?.trim().length > 0;
            const postValidity = action.payload.post?.trim().length > 0;
            const dateValidity = action.payload.date.length > 0;
            const isFormReadyToSubmit =
                titleValidity && postValidity && dateValidity;

            return {
                values: action.payload,
                isValid: {
                    post: postValidity,
                    title: titleValidity,
                    date: dateValidity,
                },
                isFormReadyToSubmit,
            };
        }
        default:
            return state;
    }
}
