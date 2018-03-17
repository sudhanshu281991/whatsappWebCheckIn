<template>
	<div class="user-info">
		<table>
			<tr>
				<th>Name</th>
				<th>Sex</th>
				<th>Age</th>
				<th>Number</th>
			</tr>
			<tr v-for="item in userArr" :key="item">
				<td>{{item.name}}</td> 
				<td>{{item.type}}</td> 
				<td>{{item.age}}</td> 
				<td>{{item.mob}}</td> 
			</tr> 
		</table>
		<button type="button" class="btn-red" @click="sendNotification()">Send Notification</button>
	</div>
</template>
     

 <script>
      import json from '../data/userProf.json'
      export default{
          data(){
              return{
                  myJson: json,
				  userArr: []
              }
		  },
		  methods:{
			  sendNotification(){
                  this.$http.post('/api/sendWhatsAppWebCheckinNotification').then(response => {
                  }, response => {
                  });
			  }
		  },
		  mounted () {
			  var userInfo = this.myJson.passengerInfo
			  for(var keys in userInfo) {
				  this.userArr.push(userInfo[keys])
			  }
		  }
      }
</script>
<style scoped="true">
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
	.btn-red {
		background: #EA2330;
    padding: 10px;
    color: #fff;
    margin-top: 60px;
    font-weight: bold;
    border-radius: 3px;
	}
</style>