<template>
    <div class="v-main-page container">
        <div class="v-main-page__nav">
            <NavigationBar />
        </div>
        <template
            v-if="!isLoading"
        >
            <CardInfo
                v-for="item in cardAmount"
                :key="item"
                :id="item"
                :city-coords="defaultCity"
                @delete="deleteCard"
                @full="favoritesIsFull"
            />
        </template>
        <div class="v-main-page__button-add-wrapper">
            <button
                class="v-main-page__add-card"
                type="button"
                @click="addNewCard"
            >
                <FontAwesome
                    icon="plus"
                    class="v-main-page__add-card--icon"
                />
            </button>
        </div>
        <LoaderWeather
            :loading="isLoading"
        />
        <Teleport to="#app">
            <ModalPopup
                v-model:isOpen="openPopup"
                title="Attention"
            >
                <template #content>
                    <p
                        class="v-main-page__popup-text"
                    >
                        {{ popupText.isFavorite ? popupText.favorites : popupText.cards }}
                    </p>
                    <div class="v-main-page__popup-button-wrapper">
                        <button
                            type="button"
                            class="v-main-page__popup-button"
                            @click="openPopup = false"
                        >
                            OKAY
                        </button>
                    </div>
                </template>
            </ModalPopup>
        </Teleport>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import NavigationBar from '@/components/nav/NavigationBar'
import CardInfo from '@/components/card/CardInfo'
import LoaderWeather from '@/components/loader/LoaderWeather'
import ModalPopup from '@/components/popup/ModalPopup'
import { mapDefaultData } from '@/mappers/cardInfo'
import axios from 'axios'

export default {
    name: 'MainPage',
    components: {
        NavigationBar,
        CardInfo,
        LoaderWeather,
        ModalPopup
    },
    setup () {
        const cardAmount = ref([1])
        const defaultCity = ref({})
        const openPopup = ref(false)
        const isLoading = ref(false)
        const popupText = reactive({
            isFavorite: false,
            cards: 'You cannot create more than 5 blocks. Please delete one of the previous ones to add a new one.',
            favorites: 'You cannot add more than 5 favorites. To add a new city to favorites, delete a previous city from favorites.'
        })

        const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'
        const freeGeoIpUrl = 'https://freegeoip.app/json/'
        
        async function getIp () {
            isLoading.value = true
            try {
                const { data } = await axios.get('https://api.ipify.org/?format=json')
                const ipAddress = data.ip
                const geoData = await axios.get(`${corsAnywhereUrl}${freeGeoIpUrl}${ipAddress}`)
                const res = geoData.data
                defaultCity.value = mapDefaultData(res)
                isLoading.value = false
            } catch (error) {
                console.error(error)
                isLoading.value = false
            }
        }
        
        function addNewCard () {
            if (cardAmount.value.length < 5) {
                cardAmount.value.push(cardAmount.value[cardAmount.value.length - 1] + 1)
                return
            }
            popupText.isFavorite = false
            openPopup.value = true
        }

        function deleteCard (id) {
            cardAmount.value = cardAmount.value.filter(item => item !== id)
        }

        function favoritesIsFull () {
            popupText.isFavorite = true
            openPopup.value = true
        }

        getIp()

        return {
            cardAmount,
            addNewCard,
            openPopup,
            isLoading,
            defaultCity,
            deleteCard,
            favoritesIsFull,
            popupText
        }
    }
}
</script>

<style lang="scss">
.v-main-page {

    &__nav {
        display: flex;
        justify-content: center;
    }

    &__button-add-wrapper {
        display: flex;
        justify-content: flex-end;
    }

    &__add-card {
        align-items: center;
        background-color: rgb(0, 96, 158);
        border-radius: 30px;
        display: flex;
        height: 60px;
        justify-content: center;
        margin-top: 20px;
        width: 60px;
        box-shadow: 0 0px 0px rgba(0,0,0,0.1);
        transition: all 0.5s;

        &--icon {
            color: #fff;
            height: 36px;
            width: 36px;
        }
    }

    &__add-card:hover {
        transition: all 0.9s;
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    }

    &__popup {

        &-text {
            line-height: 1.8;
            margin-bottom: 20px;
        }
        
        &-button-wrapper {
            display: flex;
            justify-content: flex-end;
        }

        &-button {
            background-color: rgb(0, 68, 255);
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            height: 40px;
            padding: 10px;
            width: 100px;
        }

        &-button:hover {
            transition: all 0.9s;
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
    }
}
</style>
