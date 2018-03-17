<template>
  <div id="app" class="yatra-asi">
      <router-view></router-view>
  </div>
</template>
<script>
 
  export default {
  }
</script>
<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Rubik');
	body {
		-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
	supported by Chrome and Opera */
	}
    * {
        margin: 0;
        padding: 0;
    }
	li {
		list-style-type: none;
	}
	.ico-sprite {
        background-image: url(assets/sprite.png);
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
		width: 40px;
		height: 32px;
    }
	.col-left {
		float: left;
    	width: 40%;
	}
	.col-right {
		float: right;
		width: 385px;
		margin-left: 5%;
	}
	.yatra-asi {
		max-width: 1078px;
    margin: 30px auto;
	}
	.pabs {
		position: absolute;
	}
	.prel {
		position: relative;
	}
</style>
