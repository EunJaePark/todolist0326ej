<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <Home/>
      </v-flex>
    </v-layout>
  </v-container>
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
