<template>
  <v-app>
    <div class="cards">
      <v-card class="mx-auto" max-width="270">
        <v-img src="../assets/img/map.jpg" height="200px"></v-img>

        <v-card-title> Geolocate services </v-card-title>

        <v-card-subtitle> Find the students on a map </v-card-subtitle>

        <v-card-actions>
          <v-btn color="blue" @click="goToMap" text> Explore </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card class="mx-auto" max-width="270">
        <v-img src="../assets/img/form.jpg" height="200px"></v-img>

        <v-card-title> Create a mobility demand services </v-card-title>

        <v-card-subtitle> Generate a mobility demand </v-card-subtitle>

        <v-card-actions>
          <v-btn color="blue" @click="goToCreate" text> Explore </v-btn>

          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>
<script>
export default {
 methods: {
     goToMap(){
         this.$router.push("/map")
     },
     goToCreate(){
         this.$router.push("/request")
     }
 }
};
</script>
<style scoped>
.cards {
  margin: 10px;
  display: flex;
}
@media (max-width: 1200px) {
  .cards {
    display: block;
    margin: 30px;
    padding: 15px;
  }
}
</style>