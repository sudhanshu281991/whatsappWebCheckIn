<template>
  <div>
   <h1>WebcheckIn Dashboard</h1>
    <user-profile class="col-left"></user-profile>
    <seat-map class="col-right"></seat-map> 
  </div>
</template>
<script>
      export default{
          data(){
              return{
                
              }
          },
		  components: {
			  UserProfile : () => import('../components/user-profile.vue'),
			  SeatMap : () => import('../components/seat-map.vue')  
			}
      }
</script>

<style scoped lang="scss">
	h1 {
		text-align: center;
    margin-bottom: 50px;
    text-decoration: underline;
	}
 </style>
