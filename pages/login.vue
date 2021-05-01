<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-subheader>Login</v-subheader>

            <!-- <v-list two-line> -->
            <v-form ref="form" v-model="valid" lazy-validation>
              <template>
                <v-list-item>
                  <v-list-item-content>
                    <!-- <v-list-item-title>Email</v-list-item-title> -->
                    <v-text-field
                      v-model="email"
                      :counter="15"
                      :rules="emailRules"
                      label="Email"
                      name="email"
                      autocomplete
                      required
                    ></v-text-field>
                  </v-list-item-content> </v-list-item
              ></template>
              <!-- </v-list> -->
              <!-- <v-list two-line> -->
              <template>
                <v-list-item>
                  <v-list-item-content>
                    <!-- <v-list-item-title>Email</v-list-item-title> -->
                    <v-text-field
                      v-model="password"
                      :counter="15"
                      :rules="passwordRules"
                      type="password"
                      label="Password"
                      required
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-btn
                  style="margin-left: 10px"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Login</v-btn
                >
              </template>
            </v-form>
            <br />
            <small
              >Dont have an account?
              <nuxt-link to="/register"> Register</nuxt-link></small
            >
            <!-- <BottomSheet v-if="loginHasError" :text="errorMessage"/> -->
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 5) || "Password must be more than 5 characters",
      ],
      loginHasError: false,
      errorMessage: "",
    };
  },
  middleware:"guest",
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
      let vm = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          let user = userCredential.user;
          vm.$router.push("/");
        })
        .catch((error) => {
          this.loginHasError = true;
          this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style>
</style>