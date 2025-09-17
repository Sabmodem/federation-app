// In remote_app/src/ComponentWrapper.vue (create this file)
<template>
  <div class="remote-component-wrapper">
    <HelloWorld :msg="msg || 'Hello from Remote!'" />
  </div>
</template>

<script setup>
import HelloWorld from './HelloWorld.vue'

defineProps({
  msg: String,
  apiClient: Object
})
</script>

<style scoped>
.remote-component-wrapper {
  padding: 20px;
}
</style>