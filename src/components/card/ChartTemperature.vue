<template>
    <div class="v-chart-temperature__container">
        <p
            v-if="units"
            class="v-chart-temperature__units"
        >
            {{ units }}
        </p>
        <canvas
            ref="rootEl"
            class="v-chart-temperature"
        />
    </div>
</template>

<script>
import { ref, toRefs, onMounted } from 'vue'
import Chart from 'chart.js/auto';

export default {
    name: 'ChartTemperature',
    props: {
        dataset: {
            type: Object,
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({})
        },
        units: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const {
            dataset,
            options
        } = toRefs(props);
        const rootEl = ref(null);

        onMounted(() => {
            new Chart(rootEl.value, { // eslint-disable-line no-new
                type: 'line',
                data: dataset.value,
                options: options.value
            });
        });

        return {
            rootEl
        }
    }
}
</script>

<style lang="scss">
.v-chart-temperature {

    &__container {
        min-width: 50%;
    }

    &__units {
        font-size: 10px;
        line-height: 12px;
        color: #737476;
    }
}
</style>