<template>
    <div class="v-card-five-days">
        <div
            v-for="(data, index) in items"
            :key="index"
            class="v-card-five-days__content"
        >
            <div class="v-card-five-days__title">
                <IconWeather
                    :value="data.weatherMain"
                />
                <div class="v-card-five-days__text-temp">
                    <span class="v-card-five-days__bold v-card-five-days__date">
                        {{ data.calendarDay }}
                    </span>
                    <p class="v-card-five-days__bold">
                        {{ data.weatherMain + ', ' + data.weatherDescription }}
                    </p>
                </div>
            </div>
        
            <div class="v-card-five-days__secondary-container">
                <div class="v-card-five-days__secondary-column">
                    <div class="v-card-five-days__secondary-info">
                        <span class="v-card-five-days__bold">Day:</span>
                        <span class="v-card-five-days__medium">{{ data.temperatureDay + '&deg;C' }}</span>
                    </div>
                    <div class="v-card-five-days__secondary-info">
                        <span class="v-card-five-days__bold">Feels like:</span>
                        <span class="v-card-five-days__medium">{{ data.feelsLikeDay + '&deg;C' }}</span>
                    </div>
                </div>
                <div class="v-card-five-days__secondary-column">
                    <div class="v-card-five-days__secondary-info">
                        <span class="v-card-five-days__bold">Night:</span>
                        <span class="v-card-five-days__medium">{{ data.temperatureNight + '&deg;C' }}</span>
                    </div>
                    <div class="v-card-five-days__secondary-info">
                        <span class="v-card-five-days__bold">Feels like:</span>
                        <span class="v-card-five-days__medium">{{ data.feelsLikeNight + '&deg;C' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconWeather from '@/components/icons/IconWeather'

export default {
    name: 'CardFiveDays',
    components: {
        IconWeather
    },
    props: {
        items: {
            type: Array,
            default: () => ([])
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card-five-days {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    &__date {
        background-color: #0085D9;
        border-radius: 10px;
        color: white;
        font-size: 24px;
        padding: 5px 8px;
        width: fit-content;
    }

    &__content {
        border-radius: 20px;
        border: 1px solid #060038;
        display: flex;
        flex-direction: column;
        padding: 25px 10px;
        width: 280px;
        box-shadow: 0px 0px 10px 3px rgba(0, 96, 158, 0.2);
    }

    &__title {
        align-items: center;
        display: flex;
        gap: 35px;
        justify-content: center;
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
        justify-content: center;
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
