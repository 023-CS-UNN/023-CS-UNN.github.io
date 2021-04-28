<template>
  <v-main>
    <v-container>
      <v-card>
        <v-card-title primary-title>
          Select the Courses You want to register this semester
        </v-card-title>
        <v-form>
          <v-sheet width="80%" height="100%" class="pa-12">
            <v-switch
              v-for="course in courses"
              :key="course.id"
              v-model="course_selections"
              color="primary"
              :label="course.code"
              :value="course.id"
            >
            </v-switch>
            <v-btn color="success" @click="submit">Save</v-btn>
          </v-sheet>
        </v-form>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      course_selections: [],
    };
  },
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>