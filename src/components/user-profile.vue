<template>
	<div class="user-info">
		<div v-for="(data,key) in myJson">
			{{data}}
		</div>
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