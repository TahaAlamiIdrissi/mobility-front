<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn   v-bind="attrs" v-on="on">Extras</v-btn>
      </template>
      <v-card>
        <v-card-title>Select Extra</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-bind:key="extra.name" v-for="extra in Extras" v-model="dialogm1" column>
            <v-radio :label="extra.name" :value="extra.name"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import axios from "axios";

export default {
  name: "Extra",
  data() {
    return {
      dialogm1: "",
      dialog: false,
      Extras: {
        Name: "",
        Price: "",
      },
    };
  },
  async mounted() {
    await this.getExtras();
  },
  methods: {
    async getExtras() {
      let response = await axios.get("/menu/extras");
      this.Extras = response.data;
      // console.log(this.Extra);
    },
  },
};
</script>