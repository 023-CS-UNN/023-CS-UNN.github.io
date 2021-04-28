<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <nuxt-link to="/"><v-icon>mdi-home</v-icon></nuxt-link>

      <nuxt-link to="/addCourse"><v-icon>mdi-account</v-icon></nuxt-link>

      <nuxt-link to="/print-list"><v-icon>mdi-home</v-icon></nuxt-link>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="blue darken-1" size="64"
          ><v-icon>mdi-account</v-icon></v-avatar
        >

        <div>{{ auth ? user.name.firstname : "Guest" }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/login" v-if="!auth">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/addCourse" v-if="auth">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-if="auth">
            <v-list-item-title>My Courses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/print-list" v-if="auth">
          <v-list-item-icon>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Print Class List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="Logout" v-if="auth">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <nuxt />
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapState(["auth", "user"]),
  },
  mounted() {},
  methods: {
    Logout() {
      let vm = this;
      firebase
        .auth()
        .signOut()
        .then(() => {
          vm.$store.commit("Logout");
        });
    },
  },
  async fetch() {
    let vm = this;
    firebase.auth().onAuthStateChanged(function (auth) {
      if (auth) {
        let studRef = db.collection("Students").doc(auth.uid);
        studRef.get().then((doc) => {
          vm.$store.commit("login", { ...doc.data(), id: doc.id });
          vm.$router.push("/");
        });
      } else {
        vm.$store.commit("Logout");
      }
    });

    db.collection("courses")
      .get()
      .then((res) => {
        let courses = res.docs.map((doc) => {
          let id = doc.id;
          return { ...doc.data(), id };
        });
        vm.$store.commit("setCourses", courses);
      })
      .then(() => {
        db.collection("Students")
          .get()
          .then((res) => {
            vm.$store.commit(
              "setCourseUsers",
              res.docs.map((x) => x.data().courses)
            );
          });
      });
  },
};
</script>