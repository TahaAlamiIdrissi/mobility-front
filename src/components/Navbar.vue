<template>
  <div>
    <v-toolbar dark prominent>
      <router-link to="/map"
        ><img src="../assets/img/logo.png" height="150px" alt="pizza"
      /></router-link>

      <v-toolbar-title class="left-items">
        <router-link class="router-link" to="/request"
          >Create Mobility</router-link
        >
        <router-link class="router-link" to="/mobilities"
          >Mobilities</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template class="auth" v-if="authenticated">
        <v-avatar size="80">
          <img src="../assets/img/taha.jpg" alt="User" />
        </v-avatar>
        <div class="right-items">
          <span class="username">{{ user.userName }}</span>
          <button @click="logout" class="sign-out">Sign Out</button>
        </div>
      </template>
      <template v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <a
              class="toggle-button"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </a>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title @click="clicked(item.title)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-toolbar-title class="auth-items">
          <router-link class="auth-item" to="/login">Sign In</router-link>
          <router-link class="auth-item" to="/register">Register</router-link>
        </v-toolbar-title>
      </template>
    </v-toolbar>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  data() {
    return {
      flag: false,
      items: [
        { title: "Sign in" },
        { title: "Register" },
        { title: "Create" },
        { title: "Mobilities" },
      ],
    };
  },
  methods: {
    ...mapActions({
      signOut: "auth/signOut",
    }),
    logout() {
      this.signOut().then(() => {
        // console.log(this.$route.name);
        if (this.$route.name != "Home") {
          this.$router.replace({
            name: "Home",
          });
        } else {
          this.$router.replace({
            name: "Login",
          });
        }
      });
    },
    clicked(value) {
      switch (value) {
        case "Sign in":
          this.$router.replace({
            name: "Login",
          });
          break;
        case "Register":
          this.$router.replace({
            name: "Register",
          });
          break;
         case "Create":
          this.$router.replace({
            name: "Request",
          });
          break;
        case "Mobilities":
          this.$router.replace({
            name: "ListMobilities",
          });
          break;   
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Italianno&display=swap");
.left-items {
  display: flex;
  justify-content: space-between;
  width: 25%;
  margin-left: 15px;
}
.right-items {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0;
  height: 100%;
}
.toggle-button {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
}
.toggle-button .bar {
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
}
.username {
  font-family: "Italianno", cursive;
  font-weight: 400;
  font-size: 2.7em;
  padding: 10px;
  color: white;
}
.router-link {
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 0.7em;
  padding-top: 100%;
  color: white;
  transition: 0.4s ease-in-out;
}
.router-link:hover {
  color: rgba(150, 231, 245, 0.466);
}
.auth-items {
  display: flex;
  justify-content: space-between;
  width: 14%;
}
.auth-item {
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 0.7em;
  color: white;
  padding: 5px;
  border-radius: 10px;
  transition: 0.4s ease-in-out;
}

.auth-item:hover {
  color: rgba(31, 31, 31, 0.527);
  background: rgba(255, 255, 255, 0.61);
}

@media (max-width: 1200px) {
  .auth-item {
    display: none;
  }
  .left-items {
    display: none;
  }
  .toggle-button {
    display: flex;
    margin-top: 5%;
  }
}
</style>