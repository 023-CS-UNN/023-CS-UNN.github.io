export const state = () => ({
  auth: false,
  user: {
    name: "name",
    email: "email",
    regnumber: "regnumber",
    courses: []
  },
  courses: []
});

export const mutations = {
  login(state, data) {
    state.auth = true;
    state.user = {
      name: data.name,
      email: data.email,
      regnumber: data.regNumber,
      courses: data.courses ? data.courses : [],
      id: data.id
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
  setCourses(state, data) {
    state.courses = data;
  },
  setUserCourses(state, data) {
    state.user.courses = data;
  },
  setCourseUsers(state, users) {
    let courses = {};
    state.courses.map(x => {
      courses[x.id] = 0;
    });
    users.map(courseList => {
      courseList.map(course => {
        courses[course]++;
      });
    });
    state.courses = state.courses.map(x => {
      x.users = courses[x.id];
      return x;
    });
  }
};
