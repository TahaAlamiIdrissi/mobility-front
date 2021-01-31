<template>
  <div class="home">
    <!-- <ListMobilities/> -->
    <Map  :location="location" />
  </div>
</template>

<script>
// @ is an alias to /src
// import ListMobilities from "./ListMobilities"
import Map from "../components/Map";

export default {
  name: "Home",
  components: {
    // ListMobilities,
    Map,
  },
  data() {
    return {
      // we are this as prop to the HereMap component
      location: "Saint Etienne",
    };
  },
   mounted() {
   
  },
};
</script>
