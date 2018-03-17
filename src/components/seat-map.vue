<template>
	<div class="seat-map">
		<div v-for="data in myJson" class="flight-info">
			<div class="flight-name"><b>Flight Name :</b> {{data.flightName}}</div>
			<div class="flight-number"><b>Flight Number :</b> {{data.flightNumber}}</div>
			<div class="">
				<span class="flight-origin">{{data.originCity}}</span>
				<span class="flight-dest">{{data.destinationCity}}</span>
			</div>
		</div>
		<div class="prel ">
			<h2 class="pabs pilot">Pilot</h2>
			<ul class="seat-lay">
				<li class="seat" v-for="item in seatArr" :key="item" v-bind:class="[(item.available)?'available':'unavailable']">
					<i class="ico-sprite ico-imogi"></i>
				</li>
			</ul>
		</div>
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
	.seat:nth-child(6n+3) {
        margin-right: 68px;
}
	.available .ico-imogi {
		background-position: 0 0;
	}
	.unavailable .ico-imogi {
		background-position: 0 -284px;
	}
	.seat-lay {
		border: 3px solid #ededed;
    padding: 100px 20px 30px 20px;
    border-radius: 50px 50px 0 0;
	}
	.pilot {
		left: 35%;
    top: 25px;
    border: 1px solid #ededed;
    padding: 10px 40px;
	}
	.flight-info {
		margin-bottom: 30px;
		text-align: center;
	}
	.flight-info >div {
		margin-bottom: 10px;
	}
	.flight-info span {
		margin-right: 20px;
	}
</style>