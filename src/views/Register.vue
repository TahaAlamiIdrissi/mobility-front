<template>
  <form @submit.prevent="enter">
    <v-app id="inspire">
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12 rounded-xl">
                <v-toolbar color="dark" dark flat>
                  <v-toolbar-title>Register</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <span class="text-danger">{{
                      Error.EmailError ||
                      Error.Description ||
                      Error.ConfPassError
                    }}</span>
                    <v-text-field
                      label="Username"
                      name="login"
                      v-model="User.Username"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Email address"
                      v-model="User.Email"
                      prepend-icon="mdi-email"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="Password"
                      v-model="User.Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      id="confirm-password"
                      label="Confirm Password"
                      v-model="User.ConfirmPassword"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="items"
                        label="Standard"
                        v-model="role"
                        dense
                      ></v-select>
                    </v-col>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button class="btn" type="submit">Register</button>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </form>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      role: "",
      items: ["Student", "Admin"],
      User: {
        Username: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Role: "",
      },
      Error: {
        isError: false,
        Description: "",
        EmailError: "",
        ConfPassError: "",
      },
    };
  },
  components: {},
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    enter() {
      this.Error.isError = false;
      this.Error.Description = "";
      this.Error.EmailError = "";
      this.Error.ConfPassError = "";
      if (this.role === "Student") this.User.Role = "STUDENT_ID";
      else this.User.Role = "ADMIN_ID";
      this.register(this.User)
        .then(() => {
          this.$router.replace({
            name: "Login",
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data[0]) {
            this.Error.Description = err.response.data[0].description;
          } else if (err.response.errors) {
            if (err.response.data.errors.Email) {
              this.Error.EmailError = err.response.data.errors.Email[0];
            } else if (err.response.data.errors.ConfirmPassword) {
              this.Error.ConfPassError =
                err.response.data.errors.ConfirmPassword[0];
            } else {
              this.Error.description = "Please check your information again !";
            }
          }
          this.Error.isError = true;
        });
    },
  },
};
</script>

<style  scoped>
.text-danger {
  color: red;
  text-decoration: underline red;
  text-align: center;
  align-items: center;
  margin-left: 20%;
}
.btn {
  color: white;
  background: rgb(22, 21, 21);
  padding: 10px;
  width: 25%;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.2em;
}
/* ADD FOR MEDIA SIZE SMALL REGISTER BUTTON */
@media (max-width: 1200px) {
  .btn {
  color: white;
  background: rgb(22, 21, 21);
  padding: 10px;
  width: 25%;
  border-radius: 15px;
  font-weight: bold;
  font-size: 0.9em;
}
}
</style>
