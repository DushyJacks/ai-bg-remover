<template>
  <q-page class="flex flex-center bg-grey-10 text-white">
    <Uploader />
  </q-page>
</template>

<script setup>
import Uploader from 'src/components/Uploader.vue'
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
