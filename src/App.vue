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
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,900&display=swap');
.wrap{ 
  font-family: 'Noto Sans KR', sans-serif;
  width:100vw; min-height:100vh; background-color:teal;
  }

</style>
