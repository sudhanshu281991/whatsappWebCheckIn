<template>
	<div class="user-info">
		<div v-for="data in myJson">{{data.name}}</div>
	</div>
</template>
     

 <script>
      import json from '../data/userProf.json'
      export default{
          data(){
              return{
                  myJson: json
              }
          }
      }
</script>