<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-card v-if="validCourse">
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
                    Selected by
                    {{ course.users > 0 ? course.users + " student" : "none"
                    }}{{ course.users > 1 ? "s" : "" }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-card flat>
                  <v-card-title> Course Content </v-card-title>
                  <v-card-subtitle>
                    {{ course.description }}
                  </v-card-subtitle>
                  <v-btn
                    class="mx-2"
                    :disabled="course.users < 1"
                    fab
                    dark
                    fixed
                    right
                    bottom
                    large
                    color="primary"
                    @click="printList"
                  >
                    <v-icon dark> mdi-printer </v-icon>
                  </v-btn>
                </v-card>
              </v-card-text>
            </v-list-item>
          </div> </template
        ><v-dialog v-model="dialog" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              {{ querying ? "Getting user records" : "" }}
              {{ converting ? "Converting to pdf" : "" }}
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
      <v-card v-else>
        <v-skeleton-loader
          v-bind="attrs"
          type="date-picker"
        ></v-skeleton-loader>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  data() {
    return {
      dialog: false,
      querying: false,
      converting: false,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  computed: {
    ...mapState(["auth", "courses"]),
    course() {
      return this.courses.filter((x) => x.id == this.$route.params.courseId)[0];
    },
    validCourse() {
      return this.courses.filter((x) => x.id == this.$route.params.courseId)[0];
    },
  },
  head: {
    script: [{ src: "/autotable.jspdf.js" }],
  },
  methods: {
    printList() {
      let vm = this;
      let courseId = this.$route.params.courseId;
      let students = [];
      this.querying = true;
      this.dialog = true;
      db.collection("Students")
        .where("courses", "array-contains", courseId)
        .get()
        .then((res) => {
          vm.querying = false;
          vm.converting = true;
          res.docs.map((x) => {
            students.push(x.data());
          });
        })
        .then(() => {
          // for those that'll always break the rules
          for (let i = 0; i < 20; i++) {
            students.push({
              name: {
                firstname: "",
                lastname: "",
                middlename: "",
              },
              regNumber: "",
            });
          }
          const doc = new jsPDF({
            orientation: "l",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: "smart",
          });
          doc.setFontSize(15);
          doc.text("\t\t\t\t\t\t\tUNIVERSITY OF NIGERIA NSUKKA", 10, 10);
          doc.text("\t\t\t\t\t\tDEPARTMENT OF COMPUTER SCIENCE", 10, 18);
          doc.text("\t\t\t\t\t\t\t\t200 LEVEL CLASS LIST", 10, 26);
          doc.setFontSize(11);

          doc.text("ACADEMIC YEAR: 2019/2020", 18, 32);
          doc.text(`COURSE TITLE:${this.course.title}`, 100, 32);
          doc.text(`COURSE CODE:${this.course.code}`, 200, 32);
          const colStyles = { lineWidth: 0.2, lineColor: 2, fontSize: 8 };
          // Example usage of columns property. Note that America will not be included even though it exist in the body since there is no column specified for it.
          doc.autoTable({
            startY: 35,
            margin: 5,
            columnStyles: {
              sn: colStyles,
              name: colStyles,
              regno: colStyles,
              t1: colStyles,
              t2: colStyles,
              t3: colStyles,
              t4: colStyles,
              t5: colStyles,
              t6: colStyles,
              t7: colStyles,
              exam: colStyles,
              total: colStyles,
            },
            headStyles: {
              fillColor: null,
              textColor: 10,
              lineWidth: 0.2,
              lineColor: 2,
            },
            body: students.map((student, i) => {
              return {
                sn: i + 1,
                name: `${student.name.lastname.toUpperCase()} ${student.name.firstname.toUpperCase()} ${student.name.middlename.toUpperCase()}`,
                regno: student.regNumber,
                t1: "",
                t2: "",
                t3: "",
                t4: "",
                t5: "",
                t6: "",
                t7: "",
                exam: "",
                total: "",
              };
            }),
            columns: [
              { header: "SN", dataKey: "sn" },
              { header: "Name", dataKey: "name" },
              { header: "REG NO", dataKey: "regno" },
              { header: "Week 1", dataKey: "t1" },
              { header: "Week 2", dataKey: "t2" },
              { header: "Week 3", dataKey: "t3" },
              { header: "Week 4", dataKey: "t4" },
              { header: "Week 5", dataKey: "t5" },
              { header: "Week 6", dataKey: "t6" },
              { header: "Week 7", dataKey: "t7" },
              { header: "EXAM", dataKey: "exam" },
              { header: "TOTAL", dataKey: "total" },
            ],
          });
          doc.save(`Class list for ${vm.course.code}.pdf`);
          vm.converting = false;
          vm.dialog = false;
        });
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