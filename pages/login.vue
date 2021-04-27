<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-subheader>Login</v-subheader>

            <!-- <v-list two-line> -->
              <template>
                <v-list-item>
                  <v-list-item-content>
                    <!-- <v-list-item-title>Email</v-list-item-title> -->
                    <v-text-field
                      v-model="email"
                      :counter="10"
                      :rules="emailRules"
                      label="Email"
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
                      v-model="email"
                      :counter="10"
                      :rules="emailRules"
                      label="Password"
                      required
                    ></v-text-field>
                  </v-list-item-content> </v-list-item
              ></template>
            <!-- </v-list> -->
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
            email:"",
            emailRules:""
        }
    },
};
</script>

<style>
</style>