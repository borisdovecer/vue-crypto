<template>
  <div class="w-full flex border border-gray-100 p-4 bg-gray-50 rounded-t-2xl">
    <div class="w-1/12">
      <img class="w-20" v-bind:src="currency.image?.large" alt="image" />
    </div>
    <div class="w-6/12">
      <h1 class="font-bold text-xl p-2 ml-2">{{currency.name}}</h1>
      <div class="flex">
        <div :class="'p-2 ml-4 w-32 rounded-xl text-center ' +
          (currency?.market_data?.price_change_percentage_24h_in_currency?.eur > 0 ? 'bg-green-300 text-green-600' : 'bg-red-300 text-red-600')"
        >
          <font-awesome-icon :icon="(currency.market_data?.price_change_percentage_24h_in_currency?.eur > 0 ? 'caret-up' : 'caret-down')"
                             class="font-bold text-xl"
          />
          {{ _.toString(currency?.market_data?.price_change_percentage_24h_in_currency?.eur).slice(0,5) }}%
        </div>
        <font-awesome-icon
            @click="save(currency.id)"
            icon="star"
            :class="_.find(this.favorites, {id:currency.id}) ? 'text-yellow-400 text-2xl p-2' : 'text-2xl p-2'"
        />
      </div>
    </div>
    <div class="w-7/12 text-right">
      <h1 class="font-bold text-3xl mt-2">€ {{currency?.market_data?.current_price?.eur}}</h1>
      <p class="mt-4">
        24 low: <span class="font-bold mr-4">€ {{currency?.market_data?.low_24h?.eur}}</span>
        24 high: <span class="font-bold">€ {{currency?.market_data?.high_24h?.eur}}</span>
      </p>
    </div>
  </div>
  <div class="border border-gray-100 py-16 px-40 text-center bg-gray-50 flex">
    <iframe v-if="!loading" :src="'https://s.tradingview.com/widgetembed/?&symbol=' + _.upperCase(currency?.symbol) + 'EUR&style=3'" class="w-full h-96"/>
  </div>
  <div class="justify-center pb-14 bg-gray-50 rounded-b-2xl flex">
    <button class="w-96 h-14 bg-[#007be5] rounded-xl text-white">Buy, Sell or Exchange {{currency.name}}</button>
  </div>
</template>
<script>
import _ from "loadsh";
import axios from 'axios'
import { useRoute } from 'vue-router';
import { faStar, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faStar, faCaretUp, faCaretDown);

export default {
  data() {
    function save(id) {
      _.find(this.favorites, {id}) ? _.pull(this.favorites, _.find(this.favorites, {id})) : this.favorites.push({id});
      localStorage.setItem("fav", JSON.stringify(this.favorites));
      window.location.reload();
    }

    return {
      currency: {},
      favorites: [],
      save,
      loading: false,
      _
    }
  },
  mounted() {
    const route = useRoute();
    this.loading = true;
    axios
        .get(`https://api.coingecko.com/api/v3/coins/${route.params.id}`)
        .then((response) => {
          this.currency = response.data;
          this.favorites = JSON.parse(localStorage.getItem('fav'));
          this.loading = false;
        })
  }
}
</script>

