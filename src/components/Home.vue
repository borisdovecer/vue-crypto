<script setup>
import Dashboard from './Dashboard.vue'
import Favorites from './Favorites.vue'
</script>
<template>
  <div class="flex">
    <div class="w-8/12 pl-14 py-8">
      <Dashboard />
    </div>
    <div class="w-4/12 px-4 py-2 border border-gray-50 ">
     <Favorites />
    </div>
  </div>
</template>
