<template>
	<div class="seat-map">
		<div v-for="data in myJson">
			<div class="flight-name">Flight Name: {{data.flightName}}</div>
			<div class="flight-number">Flight Number: {{data.flightNumber}}</div>
			<div class="">
				<span class="flight-origin">{{data.originCity}}</span>
				<span class="flight-dest">{{data.destinationCity}}</span>
			</div>
		</div>
		<ul class="">
			<li class="seat" v-for="item in seatArr" :key="item" v-bind:class="[(item.available)?'available':'unavailable']">
				<i class="ico-sprite ico-imogi"></i>
			</li>
		</ul>
	</div>
</template>


<script>
      import json from '../data/seatFJson.json'
      export default{
          data(){
              return{
				  seatArr: [],
                  myJson: json
              }
          },
		  mounted () {
			  var seats = this.myJson.data.seatMatrix
			  for(var keys in seats) {
				  this.seatArr.push(seats[keys])
			  }
		  }
	  }
</script>
<style scoped="true">
	.seat {
		display: inline-block;
		width: 45px;
	}
	.seat:nth-child(3n) {
    margin-right: 68px;
}
	.available .ico-imogi {
		background-position: 0 0;
		height: 50px;
		width: 50px;
	}
	.unavailable .ico-imogi {
		background-position: 0 -284px;
		height: 50px;
		width: 50px;
	}
</style>