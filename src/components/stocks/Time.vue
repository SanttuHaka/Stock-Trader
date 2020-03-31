<template>
  <div class="col-md-12 text-center mt-2">
    <h1>Q{{ time.quartal }} | {{ time.year }}</h1>
  </div>
</template>
<script>
export default {
  props: ['time']
}
</script>
