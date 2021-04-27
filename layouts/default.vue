<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>{{ auth ? user.name : "Guest" }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-gome</v-icon>
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
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Add Course</v-list-item-title>
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
      </v-list>
    </v-navigation-drawer>
    <nuxt />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapState(["auth", "user"]),
  },
};
</script>