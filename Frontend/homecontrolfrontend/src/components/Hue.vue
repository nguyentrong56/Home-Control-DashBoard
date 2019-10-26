<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <v-btn
          x-large
          v-bind:color="livingRoomLightsStage===true ?'success' : 'error'"
          dark
          @click="switchLivingRoom"
        >Living Room</v-btn>
        <v-slider
            v-model="livingLightBrightness"
            append-icon="mdi-lightbulb-on"
            prepend-icon="mdi-lightbulb-off"
            :min="min"
            :max="max"
          ></v-slider>
        
      </v-flex>

      <v-flex>
        <v-btn
          x-large
          v-bind:color="kitchenLightsStage===true ?'success' : 'error'"
          dark
          @click="switchKitchen"
        >Kitchen</v-btn>
        <v-slider
            v-model="kitchenLightBrightness"
            append-icon="mdi-lightbulb-on"
            prepend-icon="mdi-lightbulb-off"
            :min="kitchenMin"
            :max="kitchenMax"
          ></v-slider>
      </v-flex>
      {{error}}
    </v-layout>
  </v-container>
</template>

<script>

import hueServices from '@/services/hueServices';


/* eslint-disable no-console */
export default {
  data: () => ({
    discoveryResults: "",
    authenticatedApt: "iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37",

    livingRoomLightsStage: false,
    kitchenLightsStage: false,

    livingLightBrightness:254,
    min:0,
    max:254,
    kitchenLightBrightness:254,
    kitchenMin:0,
    kitchenMax:254,

    groups: [],
    error:"",
    
    
  }),
  created() {
    this.getGroupState();
    
  },
  mounted: function(){
      window.setInterval(()=>{this.getGroupState()},5000)
  },
  watch:{
      livingLightBrightness: function(newVal, oldVal){
          if(Math.abs(newVal-oldVal)>20){
             this.livingLightBrightness = newVal,
             this.adjustLivingRoomLightBrightness()

          } 
      },
      kitchenLightBrightness: function(val){
          this.kitchenLightBrightness = val,
          this.adjustKitchenLightBrightness()
      } 
  },
  methods: {

    async findBridge() {
      
    },

    async getGroupState() {
        hueServices.getGroupState().then(response=>{
        this.error =response.data;
        this.groups = response.data;
        this.livingRoomLightsStage = this.groups[1].state.all_on;
        this.livingLightBrightness = this.groups[1].action.bri;
        this.kitchenLightsStage = this.groups[2].state.all_on;
        this.kitchenLightBrightness = this.groups[2].action.bri;

        }).catch(error=>
        {
            this.error = error
        }) 
    },

    async switchLivingRoom() {
      if (this.livingRoomLightsStage == false) {
        this.turnOnLivingRoomLights(), (this.livingRoomLightsStage = true);
      } else {
        this.turnOffLivingRoomLights();
        this.livingRoomLightsStage = false;
      }
    },

    async turnOnLivingRoomLights() {
      
      hueServices.adjustGroup(1, {on : true})
    },

    async turnOffLivingRoomLights() {
       hueServices.adjustGroup(1, {on : false})
    },

    async switchKitchen() {
      if (this.kitchenLightsStage == false) {
        this.turnOnKitchenLights(), (this.kitchenLightsStage = true);
      } else {
        this.turnOffKitchenLights();
        this.kitchenLightsStage = false;
      }
    },

    async turnOnKitchenLights() {
       hueServices.adjustGroup(2, {on : true})
    },


    async turnOffKitchenLights() {
       hueServices.adjustGroup(2, {on : false})
       },

    
    async adjustLivingRoomLightBrightness(){
        
        hueServices.adjustGroup(1, {bri : this.livingLightBrightness})
    },
    async adjustKitchenLightBrightness(){
        
        hueServices.adjustGroup(2, {bri : this.kitchenLightBrightness})
    }



  
},
beforeDestroy(){
    clearInterval(this.timer)
}
}
</script>
