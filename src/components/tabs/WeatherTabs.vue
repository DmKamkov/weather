<template>
    <div>
        <ul class="v-weather-tabs">
            <li
                v-for="(tab, index) in tabs"
                :key="index"
                class="v-weather-tabs__item"
                :class="{ 'v-weather-tabs__active': activeTab === index }"
                @click="activeTab = index"
            >
                {{ tab.name }}
            </li>
        </ul>
        <div>
            <slot :name="tabs[activeTab].slug"></slot>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'WeatherTabs',
    props: {
        tabs: {
            type: Array,
            required: true
        }
    },
    setup () {
        const activeTab = ref(0);

        return {
            activeTab
        }
    }
}
</script>

<style lang="scss">
.v-weather-tabs {
    display: flex;
    gap: 10px;
    margin: 10px 0 30px;

    &__item {
        background-color: #fff;
        border-radius: 50px;
        border: 2px solid #060038;
        cursor: pointer;
        padding: 10px 20px;
    }

    &__active {
        background-color: rgba(0, 96, 158, 1);
        color: #fff;
    }

    &__item:hover {
        background-color: rgba(0, 96, 158, 0.8);
        color: #fff;
    }
}
</style>