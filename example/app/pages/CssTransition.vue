<template>
  <div class="wrapper">
    <div class="pulsing-heart"></div>
  </div>
</template>

<script>
export default {
  name: 'CssTransition'
}
</script>

<style>
.wrapper {
	position: absolute;
  margin-left: 50px;
  margin-top: 50px;
}

.wrapper:hover {
  scale: 2;
}

.pulsing-heart { 
  position: relative; 
  width: 100px; 
  height: 90px;
} 

.pulsing-heart:before, .pulsing-heart:after { 
  position: absolute; 
  content: ""; 
  left: 50px; 
  top: 0; 
  width: 50px; 
  height: 80px; 
  background: #aa0000; 
  border-radius: 50px 50px 0 0; 
  transform: rotate(-45deg);  
  transform-origin: 0 100%;
} 

.pulsing-heart:after { 
  left: 0; 
  transform: rotate(45deg); 
  transform-origin :100% 100%;
  /* animation:pulsecolor 1s infinite; */
}
</style>
