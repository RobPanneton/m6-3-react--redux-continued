const initialState = {
    token: null,
    status: "idle",
};

export default const authReducer = (state = initialState, action) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
}