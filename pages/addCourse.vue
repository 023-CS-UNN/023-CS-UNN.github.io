<template>
  <v-main>
    <v-container>
      <v-card>
        <v-card-title> Select Your courses </v-card-title>
        <v-form>
          <v-sheet width="80%" height="100%" class="pa-12">
            <v-checkbox
              v-for="course in courses"
              :key="course.id"
              v-model="course_selections"
              color="primary"
              :label="course.code"
              :value="course.id"
            >
            </v-checkbox>
            <v-btn color="success" @click="submit">Save</v-btn>
          </v-sheet>
        </v-form>
      </v-card>
      <v-snackbar v-model="loginHasError" :timeout="2000">
        {{ errorMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="loginHasError = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      course_selections: [],
      loginHasError:false,
      errorMessage:""
    };
  },
  middleware:"auth",
  computed: {
    ...mapState(["auth", "courses", "user"]),
  },
  mounted() {
    this.course_selections = [...this.user.courses];
  },
  methods: {
    submit() {
      let vm = this;
      db.collection("Students")
        .doc(this.user.id)
        .update({
          courses: this.course_selections,
        })
        .then((res) => {
          vm.$store.commit("setUserCourses", vm.course_selections);
          this.loginHasError = true
          this.errorMessage = "Saved your records"
        })
        .catch((error) => {
          this.loginHasError = true
          this.errorMessage = error.message
        });
    },
  },
};
</script>

<style>
</style>