<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-2 font-weight-bold mb-3">
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
      

     
      <v-flex mb-4>
        <v-btn 
        x-large 
         v-bind:color="livingRoomLightsStage===true ?'success' : 'error'"
        dark 
        @click="switchLivingRoom">Living Room</v-btn>
        
      </v-flex>


      <v-flex> 
        <v-btn 
        x-large 
        v-bind:color="kitchenLightsStage===true ?'success' : 'error'"
        dark
        @click="switchKitchen"
        >Kitchen</v-btn>
      </v-flex>



    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    discoveryResults:"",
    authenticatedApt : "iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37",
 
    livingRoomLightsStage: false,
    kitchenLightsStage: false,

    groups:[]


    
   
  }),
  created(){
    this.getGroupState()

  },

  methods: {
    async getGroupState(){
       await axios({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
          },
          method: "GET",
          crossDomain: true,
          url: "https://192.168.1.240/api/iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37/groups/",       
        }).
        then(response=>{
          this.groups = response.data
          this.livingRoomLightsStage =this.groups[1].state.all_on
          this.kitchenLightsStage =this.groups[2].state.all_on
        })

    },
   
    /* eslint-disable no-console */
    async switchLivingRoom(){
      if(this.livingRoomLightsStage == false)
      {
       this.turnOnLivingRoomLights(),
       this.livingRoomLightsStage = true
      }
      
      else
      {
        this.turnOffLivingRoomLights()
        this.livingRoomLightsStage = false
      }

    },
    async turnOnLivingRoomLights(){
      await axios({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
          },
          method: "PUT",
          crossDomain: true,
          url: "https://192.168.1.240/api/iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37/groups/1/action",
          data: {on: true}
          
        }).

      then(response => console.log(response.data))
    },
    async turnOffLivingRoomLights(){
      await axios({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
          },
          method: "PUT",
          crossDomain: true,
          url: "https://192.168.1.240/api/iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37/groups/1/action",
          data: {on: false}
        }).
      then(response => console.log(response.data))
    },
    async switchKitchen(){
      if(this.kitchenLightsStage == false)
      {
       this.turnOnKitchenLights(),
       this.kitchenLightsStage = true
      }
      
      else
      {
        this.turnOffKitchenLights()
        this.kitchenLightsStage = false
      }

    },

    async turnOnKitchenLights(){
      await axios({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
          },
          method: "PUT",
          crossDomain: true,
          url: "https://192.168.1.240/api/iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37/groups/2/action",
          data: {on: true}
          
        }).

      then(response => console.log(response.data))
    },

    async turnOffKitchenLights(){
      await axios({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
          },
          method: "PUT",
          crossDomain: true,
          url: "https://192.168.1.240/api/iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37/groups/2/action",
          data: {on: false}
          
        }).

      then(response => console.log(response.data))
    },
  }
  
  
};

</script>
