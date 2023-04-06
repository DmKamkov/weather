<template>
    <router-view></router-view>
    <AnimationWaves />
</template>

<script>
import './main.scss';
import AnimationWaves from './components/waves/AnimationWaves.vue';

export default {
  name: 'App',
  components: {
    AnimationWaves
  }
}
</script>
