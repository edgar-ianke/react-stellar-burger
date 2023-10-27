const initialStateUser = {
    user: {
        name: null,
        email: null,
    }
};

export const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    default: {
        return state;
      }
  }
};
