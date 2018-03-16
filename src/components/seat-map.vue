<template>
	<div class="seat-map">
		<div v-for="data in myJson">{{data.name}}</div>
	</div>
</template>


<script>
      import json from '../data/seatFJson.json'
      export default{
          data(){
              return{
                  myJson: json
              }
          }
      }
</script>