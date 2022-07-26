<template>
  <div class="bg-gray-50 rounded-2xl pt-4">
    <h1 class="text-center font-bold text-2xl">Favorites</h1>
    <div class="text-center px-6">
      <div v-for="(fav, key) in favourites" :key='key' class="w-full p-2 my-3 flex border-b border-gray-200">
        <div class="w-6/12 flex">
          <a :href="'/' + fav.id">
            <img class="w-10 h-10" v-bind:src="fav.image" alt="image" />
          </a>
          <div class="text-left">
            <a :href="'/' + fav.id">
              <p class="px-4">{{fav.name}}</p>
            </a>
            <p class="text-gray-500 px-4">{{_.upperCase(fav.symbol)}}</p>
          </div>
        </div>
        <div class="w-6/12 text-right">
          <p class="">€ {{fav.current_price}}</p>
          <div :class="'font-bold text-xl ' + (fav.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600')">
            <font-awesome-icon :icon="(fav.price_change_percentage_24h > 0 ? 'caret-up' : 'caret-down')" class="mt-2 mx-2" />
            <span> {{ _.toString(fav.price_change_percentage_24h).slice(0, 5)}}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="h-6"></div>
  </div>
</template>
<script>
import _ from "loadsh";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

library.add(faCaretUp, faCaretDown);

export default {
  data() {
    return {
      favourites: [],
      _
    }
  },
  mounted() {
    const favourites =  [JSON.parse(localStorage.getItem("fav"))][0]
    axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50')
        .then((response) => {
          favourites.forEach(fav => {
            this.favourites.push(_.find(response.data, { id: fav.id }))
          })
        })
  }
}
</script>
