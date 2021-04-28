<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col v-for="category in categories" :key="category" cols="12">
          <v-card>
            <v-subheader>{{ category | capitalize }}</v-subheader>
            <v-list
              two-line
              v-for="(course, n) in courses.filter(
                (x) => x.category == category
              )"
              :key="course.code"
            >
              <template>
                <div>
                  <v-list-item>
                    <v-list-item-avatar color="blue darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ course.code }}</v-list-item-title>

                      <v-list-item-subtitle>
                        {{ course.title }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <v-divider
                  v-if="
                    n !==
                    courses.filter((x) => x.category == category).length - 1
                  "
                  :key="`divider-${n}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      documents: [],
    };
  },
  computed: {
    ...mapState(["auth", "courses"]),
    categories() {
      return [...new Set(this.courses.map((x) => x.category))];
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