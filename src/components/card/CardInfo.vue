<template>
  <div class="v-card-info">
    <div
        class="v-card-info__input"
    >
        <SearchInput
            v-if="!oneCallCityInfo"
            v-model:value="inputCity"
            :options="citiesList"
            @select="getCityInfo"
        />
        <span
            v-if="oneCallCityInfo"
            class="v-card-info__bold"
        >
            {{ findCityInfo.name + ', ' + findCityInfo.sys.country }}
        </span>
        <div
            v-if="oneCallCityInfo"
            class="v-card-info__control-buttons"
        >
            <button
                class="v-card-info__button"
                type="button"
                @click="addToFavorite(findCityInfo.id)"
            >
                <FontAwesome
                    icon="star"
                    class="v-card-info__icon-favorite"
                    :class="{ 'v-card-info__icon-favorite-active': favoriteActive }"
                />
            </button>
            <button
                v-if="id > 1"
                type="button"
                class="v-card-info__button"
                @click="deleteCard(id)"
            >
                <FontAwesome
                    icon="trash"
                    class="v-card-info__icon-delete"
                />
            </button>
        </div>
    </div>
    <WeatherTabs
        v-if="oneCallCityInfo"
        :tabs="weatherTabs"
    >
        <template #currentDay>
            <div
                class="v-card-info__container"
            >
                <CardTextPart
                    :data="oneCallCityInfo"
                />
                <ChartTemperature
                    :dataset="chartData.data"
                    :options="chartData.options"
                    units="&deg;C"
                />
            </div>
        </template>
        <template #fiveDays>
            <div
                class="v-card-info__container-five-days"
            >
                <CardFiveDays
                    :items="weatherFiveDays.daysData"
                />
                <ChartTemperature
                    :dataset="weatherFiveDays.chartData.data"
                    :options="weatherFiveDays.chartData.options"
                    units="&deg;C"
                />
            </div>
        </template>
    </WeatherTabs>
    <LoaderWeather
        :loading="isLoading"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import axios from 'axios'
import SearchInput from '../search/SearchInput'
import ChartTemperature from './ChartTemperature'
import { mapOneCallData, mapChartData, mapFiveDaysForecast } from '@/mappers/cardInfo'
import LoaderWeather from '@/components/loader/LoaderWeather'
import CardTextPart from './CardTextPart'
import CardFiveDays from './CardFiveDays'
import WeatherTabs from '../tabs/WeatherTabs'

export default {
    name: 'CardInfo',
    components: {
        LoaderWeather,
        SearchInput,
        ChartTemperature,
        CardTextPart,
        WeatherTabs,
        CardFiveDays
    },
    props: {
        cityCoords: {
            type: Object,
            default: () => ({})
        },
        favoriteCoords: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [Number, String],
            default: 0
        }
    },
    setup (props, context) {
        const inputCity = ref('')
        const citiesList = ref([])
        const findCityInfo = ref({})
        const oneCallCityInfo = ref(null)
        const isLoading = ref(false)
        const weatherFiveDays = ref({})
        const chartData = ref({})
        const favoriteCities = ref(JSON.parse(localStorage.getItem('towns')) || [])
        const favoriteActive = ref(false)
        const weatherTabs = ref([
            { name: 'Current Day', slug: 'currentDay' },
            { name: '5 Days', slug: 'fiveDays' }
        ])

        const myKey = '0c5279127f8ac4f3987da69b4da67ae2'
        const productionKey = '439d4b804bc8187953eb36d2a8c26a02'

        function cityAlreadyInFavorites (id = findCityInfo.value.id) {
            favoriteCities.value.forEach((item) => {
                if (item.id === id) {
                    favoriteActive.value = true
                    return
                }
            })
        }

        function findCityOptions () {
            isLoading.value = true
            try {
                axios.get(`https://api.openweathermap.org/data/2.5/find?q=${inputCity.value}&units=metric&appid=${myKey}`)
                    .then(function (response) {
                        citiesList.value = response.data.list
                        isLoading.value = false
                    })
                    .catch(function (error) {
                        console.log(error)
                        isLoading.value = false
                    })
            } catch (e) {
                console.log(e)
                isLoading.value = false
            }
        }

        function weatherRequest (city) {
            isLoading.value = true
            try {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&formatted=0&appid=${myKey}`)
                    .then(function (response) {
                        findCityInfo.value = response.data
                        cityAlreadyInFavorites()
                        isLoading.value = false
                    })
                    .catch(function (error) {
                        console.log(error)
                        isLoading.value = false
                    })
            } catch (e) {
                console.log(e)
            }
        }

        function oneCall (city) {
            isLoading.value = true
            try {
                axios.get(`https://openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&formatted=0&appid=${productionKey}`)
                    .then(function (response) {
                        const res = response.data
                        oneCallCityInfo.value = mapOneCallData(res)
                        weatherFiveDays.value = mapFiveDaysForecast(res)
                        chartData.value = mapChartData(res)
                        isLoading.value = false
                    })
                    .catch(function (error) {
                        console.log(error)
                        isLoading.value = false
                    })
            } catch (e) {
                console.log(e)
                isLoading.value = false
            }
        }

        function getCityInfo (city) {
            oneCall(city)
            findCityInfo.value = city
            citiesList.value = []
        }

        function addToFavorite (id) {
            favoriteCities.value = JSON.parse(localStorage.getItem('towns')) || []

            if (favoriteActive.value) {
                favoriteCities.value = favoriteCities.value.filter(item => Number(item.id) !== Number(id))
                localStorage.setItem('towns', JSON.stringify(favoriteCities.value))
                context.emit('unfavorite', id)
                favoriteActive.value = !favoriteActive.value
                return
            }
            
            if (favoriteCities.value.length < 5) {
                favoriteCities.value.push({ coord: findCityInfo.value.coord, id: findCityInfo.value.id })
                localStorage.setItem('towns', JSON.stringify(favoriteCities.value))
                context.emit('unfavorite', id)
                favoriteActive.value = !favoriteActive.value
                return
            }

            context.emit('full')
        }

        function deleteCard (id) {
            context.emit('delete', id)
        }

        function localCityData () {
            oneCall(props.cityCoords)
            weatherRequest(props.cityCoords)
        }

        if (Number(props.id) === 1) {
            localCityData()
        }
        
        if (Number(props.id) === 0) {
            oneCall(props.favoriteCoords)
            weatherRequest(props.favoriteCoords)
        }

        watch(inputCity, (val) => {
            findCityOptions(val)
        })

        return {
            inputCity,
            citiesList,
            getCityInfo,
            findCityInfo,
            oneCallCityInfo,
            addToFavorite,
            deleteCard,
            isLoading,
            chartData,
            favoriteActive,
            weatherTabs,
            weatherFiveDays
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card-info {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    min-height: 50px;
    padding: 20px;

    &__input {
        display: flex;
        justify-content: space-between;
    }

    &__container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: space-between;
        
    }

    &__container-five-days {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        justify-content: center;
    }

    &__bold {
        font-weight: bold;
    }

    &__control-buttons {
        display: flex;
        gap: 10px;
    }
    
    &__button {
        align-items: center;
        background-color: rgb(0, 96, 158);
        border-radius: 30px;
        display: flex;
        height: 30px;
        justify-content: center;
        width: 30px;
        box-shadow: 0 0px 0px rgba(0,0,0,0.1);
        transition: all 0.5s;
    }

    &__button:hover {
        transition: all 0.9s;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.4);

        .v-card-info__icon-delete {
            color: #c12026;
        }

        .v-card-info__icon-favorite {
            color: #fff100;
        }
    }

    &__icon-favorite {
        color: #fff;
    }

    &__icon-favorite-active {
        color: #fff100;
    }

    &__icon-delete {
        color: #fff;
    }

    &__icon-delete:hover {
        color: #c12026;
    }
}
</style>
