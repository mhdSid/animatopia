<template>
  <div class="wrapper">
    <svg class="svgEl" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10">
        <animate
          attributeName="rx"
          values="0;5;0"
          dur="10s"
          repeatCount="indefinite" />
      </rect>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgAnimation'
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-left: 50px;
  margin-top: 50px;
}
.svgEl {
  width: 200px;
  height: 200px;
}
</style>
