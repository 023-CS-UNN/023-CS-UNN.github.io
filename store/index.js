export const state = () => ({
    auth: false,
    user: {
        name: "name",
        email: "email",
        regnumber:"regnumber"
    }
});

export const mutations = {
  login(state) {
      state.auth = true
  }
};
