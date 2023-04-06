<template>
    <div
        class="v-card-text-part__content"
    >
        <div class="v-card-text-part__title">
            <IconWeather
                :value="data.weatherMain"
                :day="data.dayPeriod"
            />
            <div class="v-card-text-part__text-temp">
                <p class="v-card-text-part__bold">
                    {{ data.weatherMain + ', ' + data.temperature + '&deg;C' }}
                </p>
                <div>
                    <span class="v-card-text-part__bold">Feels like: </span>
                    <span class="v-card-text-part__medium">{{ data.feelsLike + '&deg;C' }}</span>
                </div>
            </div>
        </div>
        
        <div class="v-card-text-part__secondary-container">
            <div class="v-card-text-part__secondary-column">
                <div class="v-card-text-part__secondary-info">
                    <img
                        src="@/assets/svg/sunrise.svg"
                        class="v-card-text-part__image-icon"
                    >
                    <span class="v-card-text-part__bold">Sunrise:</span>
                    <span class="v-card-text-part__medium">{{ data.sunrise }}</span>
                </div>
                <div class="v-card-text-part__secondary-info">
                    <img
                        src="@/assets/svg/sunset.svg"
                        class="v-card-text-part__image-icon"
                    >
                    <span class="v-card-text-part__bold">Sunset:</span>
                    <span class="v-card-text-part__medium">{{ data.sunset }}</span>
                </div>
            </div>
            <div class="v-card-text-part__secondary-column">
                <div class="v-card-text-part__secondary-info">
                    <img
                        src="@/assets/svg/humidity.svg"
                        class="v-card-text-part__image-icon"
                    >
                    <span class="v-card-text-part__bold">Humidity:</span>
                    <span class="v-card-text-part__medium">{{ data.humidity }}</span>
                </div>
                <div class="v-card-text-part__secondary-info">
                    <img
                        src="@/assets/svg/wind.svg"
                        class="v-card-text-part__image-icon"
                    >
                    <span class="v-card-text-part__bold">Wind speed:</span>
                    <span class="v-card-text-part__medium">{{ data.windSpeed }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconWeather from '@/components/icons/IconWeather'

export default {
    name: 'CardTextPart',
    components: {
        IconWeather
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card-text-part {

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__title {
        align-items: center;
        display: flex;
        gap: 35px;
    }

    &__text-temp {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__image-icon {
        height: 20px;
        width: 20px;
    }

    &__secondary-container {
        display: flex;
        gap: 50px;
        margin-top: 20px;
    }

    &__secondary-column {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    &__secondary-info {
        align-items: flex-end;
        display: flex;
        gap: 5px;
    }

    &__bold {
        font-weight: bold;
    }

    &__medium {
        font-weight: 600;
    }
}

</style>