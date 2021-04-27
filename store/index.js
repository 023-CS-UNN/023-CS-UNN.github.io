export const state = () => ({
  auth: false,
  user: {
    name: "name",
    email: "email",
    regnumber: "regnumber",
    courses: []
  },
  courses:[]
});

export const mutations = {
  login(state, data) {
    console.log(data, "from state");
    state.auth = true;
    state.user = {
      name: data.name,
      email: data.email,
      regnumber: data.regNumber,
      courses: data.courses?data.courses:[]
    };
  },
  logout(state) {
    state.user = {
      name: "name",
      email: "email",
      regnumber: "regnumber",
      courses: []
    };
    state.auth = false;
    },
    setCourses(state,data) {
      state.courses = data
  }
};
