<template>
    <div>
        <input
            v-model="inputValue"
            id="city"
            name="city"
            type="text"
            placeholder="Enter the city"
            class="v-search-input"
            :class="{'v-search-input__expanded': options.length }"
            @input="handleInput"
        >
        <div v-if="options.length">
            <ul class="v-search-input__list">
                <li
                    v-for="option in options"
                    :key="option.id"
                    class="v-search-input__option"
                    @click="selectCity(option)"
                >
                    {{ option.name }}
                    <div>
                        <span>{{ Math.round(option.main.temp) }}&deg;C</span>
                        <img
                            :src="`https://openweathermap.org/images/flags/${(option.sys.country).toLowerCase()}.png`"
                            class="v-search-input__country-image"
                        />
                    </div>
                </li>
            </ul>
        </div>
    </div> 
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SearchInput',
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, context) {
        const inputValue = ref(props.value)
        let timerId

        function handleInput () {
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                context.emit('update:value', inputValue.value)
            }, 1000)
        }

        function selectCity (city) {
            context.emit('select', city)
        }

        return {
            inputValue,
            handleInput,
            selectCity
        }
    }
}
</script>

<style lang="scss">
.v-search-input {
    background-color: rgb(232, 240, 254);
    border-radius: 20px;
    border: none;
    min-height: 30px;
    padding: 10px 20px;
    min-width: 50%;

    &__list {
        background-color: rgb(232, 240, 254);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border-top: none;
        display: block;
        left: 0;
        list-style: none;
        margin: 0;
        max-height: 250px;
        overflow: auto;
        padding: 5px;
        top: 25px;
        width: inherit;
    }

    &__expanded {
        border-radius: 20px 20px 0 0;
    }  

    &__option {
        align-items: center;
        border-radius: 20px;
        color: #484848;
        cursor: pointer;
        display: flex;
        height: 45px;
        justify-content: space-between;
        margin: 0;
        overflow: hidden;
        padding: 0 5px;
        text-decoration: none;
        opacity: 0.8;
    }

    &__option:hover {
        opacity: 1;
    }

    &__country-image {
        margin-left: 5px;
    }
}
</style>