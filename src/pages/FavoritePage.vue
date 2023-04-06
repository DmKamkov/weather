<template>
  <div class="v-favorite-page container">
    <div class="v-favorite-page__nav">
        <NavigationBar
          active="favorite"
        />
    </div>
    <template
      v-if="!updateValue"
    >
      <CardInfo
          v-for="item in favoritesCities"
          :key="item.id"
          :favorite-coords="item"
          @unfavorite="deleteFavorite"
      />
    </template>
    <template
      v-if="!favoritesCities.length"
    >
      <div class="v-favorite-page__empty-dashboard">
        <p class="v-favorite-page__empty-text">
          You don't have any favorite cities yet
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import NavigationBar from '@/components/nav/NavigationBar'
import CardInfo from '@/components/card/CardInfo'

export default {
    name: 'FavoritePage',
    components: {
      NavigationBar,
      CardInfo
    },
    setup () {
      const favoritesCities = ref(JSON.parse(localStorage.getItem('towns')) || [])
      const updateValue = ref(false)

      function deleteFavorite (id) {
        updateValue.value = true
        favoritesCities.value = favoritesCities.value.filter(item => item.id !== id)
        updateValue.value = false
      }

      return {
        favoritesCities,
        deleteFavorite,
        updateValue
      }
    }
}
</script>

<style lang="scss" scoped>
.v-favorite-page {

  &__nav {
    display: flex;
    justify-content: center;
  }

  &__empty-dashboard {
    display: flex;
    justify-content: center;
    margin: 200px 0;
  }

  &__empty-text {
    font-size: 40px;
    color: #acb2ca;
    text-align: center;
  }
}
</style>