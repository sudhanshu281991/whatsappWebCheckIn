<template>
  <div>
    <user-profile></user-profile>
    <seat-map></seat-map> 
  </div>
</template>
<script>
      import json from '../data/userProf.json'
      export default{
          data(){
              return{
                  myJson: json
              }
          },
		  components: {
			  UserProfile : () => import('../components/seat-map.vue'),
			  SeatMap : () => import('../components/user-profile.vue')  
			}
      }
</script>

<style scoped lang="scss">
 </style>
