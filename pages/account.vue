<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-card v-if="validCourse">
        <v-card-title> Edit Account details</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="mx-auto">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="10"
                label="Surname"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-auto"
            ><v-col cols="12" md="4">
              <v-text-field
                v-model="middlename"
                :counter="10"
                label="Middle Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="regnumber"
                :rules="regnumberRules"
                label="Reg Number"
                placeholder="2018/123456"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            style="margin-left: 10px"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            SAVE</v-btn
          >
        </v-form>
        <v-card-text v-if="loading">
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>

      <v-skeleton-loader
        v-bind="attrs"
        type="account"
        v-else
      ></v-skeleton-loader>
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
      <v-snackbar v-model="loginHasSuccess" :timeout="2000">
        {{ SuccessMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="loginHasSuccess = false"
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
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
      validCourse: true,
      firstname: "",
      regnumber: "",
      lastname: "",
      middlename: "",
      errorMessage: "",
      SuccessMessage:"Successfully updated your Records",
      loginHasSuccess:false,
      loading: false,
      valid: true,
      loginHasError: false,
      regnumberRules: [
        (v) => !!v || "Registration number is required",
        (v) =>
          /[0-9]{4}\/[0-9]{6}/.test(v) || "Registration number must be valid",
      ],
      nameRules: [(v) => !!v || "This field is required"],
    };
  },
  computed: {
    ...mapState(["auth", "courses", "user"]),
  },
  head: {
    title: "My account",
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.submit();
      }
    },
    submit() {
        let vm = this
      this.loading = true;
      db.collection("Students")
        .doc(vm.user.id)
        .update({
          name: {
            lastname: vm.lastname,
            middlename: vm.middlename,
            firstname: vm.firstname,
          },
          regNumber: vm.regnumber,
        })
        .then((res) => {
          vm.loginHasSuccess = true;
          vm.loading = false;
          vm.commit('updateUser',{
              lastname:vm.lastname,
              firstname:vm.firstname,
              middlename:vm.middlename,
              regNumber:vm.regnumber
          })
        })
        .catch((error) => {
          vm.loginHasError = true;
          vm.errorMessage = error.message;
          vm.loading = false;
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
  middleware: "auth",
  mounted() {
    this.email = this.user.email;
    this.regnumber = this.user.regnumber;
    this.firstname = this.user.name.firstname;
    this.lastname = this.user.name.lastname;
    this.middlename = this.user.name.middlename;
  },
};
</script>