<template>
  <h1>Remote Application</h1>
  <Suspense>
    <template #default>
      <HelloWorld msg="Message from Host!" />
    </template>
    <template #fallback>
      <div>Loading Remote Component...</div>
    </template>
  </Suspense>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>