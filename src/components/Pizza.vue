<template>
  <div class="menu" data-app>
    <v-card
      class="mx-auto card"
      max-width="380"
      v-bind:key="pizza.name"
      v-for="(pizza,index) in Pizzas"
    >
      <v-img :src="pizza.image" height="250px"></v-img>

      <v-card-title>{{ pizza.name}}</v-card-title>

      <v-card-subtitle>{{ pizza.price }}$</v-card-subtitle>

      <v-card-actions>
        <button class="order">Order</button>

        <v-spacer></v-spacer>

        <v-btn icon @click="showIndex = index">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="showIndex === index">
          <v-divider></v-divider>
          <Extra />
          <v-card-text>{{pizza.description}}</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Extra from "@/components/Extra";

export default {
  name: "Pizza",
  async mounted() {
    await this.getPizzas();
  },
  components: {
    Extra,
  },
  data() {
    return {
      show: false,
      showIndex: null,
      Pizzas: null,
      Pizza: {
        Name: "",
        Description: "",
        Price: 0.0,
        Size: "",
      },
    };
  },
  methods: {
    async getPizzas() {
      let response = await axios.get("/menu/pizzas");
      this.Pizzas = response.data;
      console.log(this.Pizzas);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.menu {
  display: flex;
  justify-content: space-around;
  width: 40%;
  margin: auto;
  margin-top: 5%;
}
.card {
  margin: 2%;
}
.order {
  font-family: "Poppins", sans-serif;
  font-size: 1.3em;
  border-radius: 10px;
  padding: 15px;
  transition: 0.4s ease-in-out;
}
.order:hover {
  background: rgba(245, 56, 56, 0.808);
  color: white;
}
</style>
