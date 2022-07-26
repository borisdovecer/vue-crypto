<script setup>
import Header from './components/Header.vue';
import Favourites from './components/Favorites.vue';
</script>
<template>
  <Header />
  <div class="flex w-full p-4">
    <div class="w-8/12 pl-10 pr-4">
      <router-view />
    </div>
    <div class="w-4/12">
      <Favourites />
    </div>
  </div>
</template>
