<template>
  <!-- <v-container>
    <v-layout>
      <v-flex xs12> -->

        <div class="wrap">
          <Home/>
        </div>
        
      <!-- </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Home from './components/Home'

export default {
  name: 'App',

  components: {
    // HelloWorld,
    Home
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.wrap{ width:100vw; min-height:100vh; background-color:teal; }
</style>
