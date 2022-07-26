<template>
  <div class="border border-gray-100 bg-gray-50 rounded-2xl p-4">
    <div class="p-4 flex">
      <h1 class="w-8/12 p-2 text-2xl font-bold">Cryptocurrency Prices</h1>
      <div class="w-4/12 p-1 right-0 flex">
        <font-awesome-icon icon="search" class="text-gray-400 p-3 bg-white" />
        <input class="w-full pl-1" placeholder="Search" name="search" @keypress.enter="search" />
        <font-awesome-icon @click="resetSearch" icon="times" class="text-gray-400 p-3 justify-right bg-white" />
      </div>
    </div>
    <div class="py-4 text-white bg-[#007be5] text-center flex">
      <div class="grid-cols-4 gap-1 flex w-full ">
        <div class="w-3/12">
          Currency
          <font-awesome-icon icon="caret-up" @click="sort('name', 'asc')" class="font-bold text-sm ml-2 absolute" />
          <font-awesome-icon icon="caret-down" @click="sort('name', 'desc')" class="font-bold text-sm ml-2 mt-2.5 absolute" />
        </div>
        <div class="w-3/12">
          24h %
          <font-awesome-icon icon="caret-up" @click="sort('price_change_percentage_24h', 'desc')" class="font-bold text-sm ml-2 absolute" />
          <font-awesome-icon icon="caret-down" @click="sort('price_change_percentage_24h', 'asc')" class="font-bold text-sm ml-2 mt-2.5 absolute" />
        </div>
        <div class="w-3/12">
          Price
          <font-awesome-icon icon="caret-up" @click="sort('current_price', 'desc')" class="font-bold text-sm ml-2 absolute" />
          <font-awesome-icon icon="caret-down" @click="sort('current_price', 'asc')" class="font-bold text-sm ml-2 mt-2.5 absolute" />
        </div>
        <p class="w-3/12">Favorites</p>
      </div>
    </div>
    <div v-for="currency in currencies" :key="currency.id" class="border-b border-gray-300 p-4 bg-white text-center flex">
    <div class="grid-cols-4 gap-1 flex w-full ">
        <div class="w-3/12 flex">
          <a :href="'/' + currency.id">
            <img class="w-10" v-bind:src="currency.image" alt="image" />
          </a>
          <a :href="'/' + currency.id">
            <p class="p-2">{{ currency.name }}</p>
          </a>
          <p class="text-gray-500 p-2">{{ _.upperCase(currency?.symbol) }}</p>
        </div>
      <div :class="' w-3/12 ' + (currency.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600')">
        <font-awesome-icon :icon="(currency.price_change_percentage_24h > 0 ? 'caret-up' : 'caret-down')" class="font-bold text-xl mt-2 mx-2" />
        <span>{{ _.toString(currency.price_change_percentage_24h).slice(0, 5) }}%</span>
      </div>
      <p class="w-3/12 p-2">€ {{ currency.current_price }}</p>
      <div class="w-3/12 p-1 text-xl">
        <font-awesome-icon
            @click="save(currency.id)"
            icon="star"
            :class="_.find(this.favorites, { id: currency.id }) && 'text-yellow-400'"
        />
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import _ from 'loadsh';
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faSearch, faCaretDown, faCaretUp, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faStar, faSearch, faCaretUp, faCaretDown, faTimes);

export default {
  data() {
    function save(id) {
      _.find(this.favorites, {id}) ?  _.pull(this.favorites, _.find(this.favorites, {id})) : this.favorites.push({id});
      localStorage.setItem("fav", JSON.stringify(this.favorites));
      window.location.reload();
    }

    function sort(by, order) {
      this.currencies = _.orderBy(this.currencies, [by], [order]);
    }

    function search(e) {
      e.preventDefault();
      const arr = [];
      arr.push(_.find(this.currenciesSearchData, {name: e.target.value}));
      arr[0] ? this.currencies = arr : this.currencies = [];
    }

    function resetSearch() {
      window.location.reload();
    }

    return {
      currencies: [],
      currenciesSearchData: [],
      favorites: [],
      save,
      sort,
      search,
      resetSearch,
      _
    }
  },

  mounted() {
    axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50')
        .then((response) => {
          this.currencies = response.data;
          this.currenciesSearchData = response.data;
          this.favorites = JSON.parse(localStorage.getItem('fav'));
        })
  }
}

</script>

