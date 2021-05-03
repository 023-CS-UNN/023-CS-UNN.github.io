<template>
  <v-main>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <!-- <v-card> -->
            <v-subheader>Register</v-subheader>

            <!-- <v-list two-line> -->
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    :counter="15"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="lastname"
                    :rules="nameRules"
                    :counter="15"
                    label="Surname"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="middlename"
                    :counter="15"
                    label="Middle Name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
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
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="passwordConfirmation"
                    :rules="passwordConfirmationRules"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <!-- <v-col></v-col> -->
              </v-row>
              <v-btn
                style="margin-left: 10px"
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                :loading="loading"
              >
                Register</v-btn
              >
              <small
                >Already have an account?
                <nuxt-link to="/login"> Login</nuxt-link></small
              >
            </v-form>
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
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      regnumber: "",
      lastname: "",
      middlename: "",
      password: "",
      errorMessage: "",
      passwordConfirmation: "",
      loading:false,
      valid: true,
      loginHasError: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v.replace(' ','')) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 5) || "Password must be more than 5 characters",
      ],
      passwordConfirmationRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v == this.password) || "Password does not match",
      ],
      regnumberRules: [
        (v) => !!v || "Registration number is required",
        (v) =>
          /[0-9]{4}\/[0-9]{6}/.test(v) || "Registration number must be valid",
      ],
      nameRules: [(v) => !!v || "This field is required"],
    };
  },
  middleware: "guest",
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.submit();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      let vm = this
      this.loading = true
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email.replace(' ',''), this.password)
        .then((userCredential) => {
          let user = userCredential.user;
          db.collection("Students")
            .doc(user.uid)
            .set({
              name: {
                lastname: this.lastname,
                middlename: this.middlename,
                firstname: this.firstname,
              },
              regNumber: this.regnumber,
              courses: [],
            })
            .then((res) => {
              vm.loading = false
            })
            .catch((error) => {
              vm.loading = false
              this.loginHasError = true;
              this.errorMessage = error.mesage;
            });
        })
        .catch((error) => {
          this.loginHasError = true;
          this.errorMessage = error.message;
          this.loading = false
        });
    },
  },
};
</script>

<style>
</style>