<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
export default {
  components: {
    Navbar,
    // Footer
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300&display=swap");
#app{
  /* height: 66vh; */
}
</style>
