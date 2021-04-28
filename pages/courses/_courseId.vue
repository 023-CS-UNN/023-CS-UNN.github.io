<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-card>
        <v-subheader>{{ course.category | capitalize }}</v-subheader>

        <template>
          <div>
            <v-list-item>
              <v-card-text>
                <v-list-item-content>
                  <v-list-item-title class="display-1 text--primary">
                    {{ course.code }}</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    {{ course.title }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                     Selected by {{ course.users>0?course.users+' student':'none' }}{{course.users>1?'s':''}} 
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-card flat>
                  <v-card-title> Course Content </v-card-title>
                  <v-card-subtitle>
                    {{ course.description }}
                  </v-card-subtitle>
                </v-card>
              </v-card-text>
            </v-list-item>
          </div>
        </template>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["auth", "courses"]),
    course() {
      return this.courses.filter((x) => x.id == this.$route.params.courseId)[0];
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>