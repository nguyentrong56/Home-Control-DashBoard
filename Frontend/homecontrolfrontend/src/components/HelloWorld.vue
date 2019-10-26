<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-2 font-weight-bold mb-3"  no >
          Welcome to Home Sweet Home
        </h1> 
        <v-img
          :src="require('../assets/pic.jpg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
        
      </v-flex>
      <span>
      </span>
      <hue> </hue>



    </v-layout>
  </v-container>
</template>

<script>
import hue from './Hue.vue'

export default {
  components:{
    hue
  },
  data: () => ({
    discoveryResults:"",
    authenticatedApt : "iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37",
 
    livingRoomLightsStage: false,
    kitchenLightsStage: false,

    groups:[]


    
   
  }),

  
  
};

</script>
