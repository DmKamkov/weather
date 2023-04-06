<template>
	<nav>
		<RouterLink to="/">Main</RouterLink>
		<RouterLink to="/favorite">Favorites</RouterLink>
		<div class="animation" :class="active"></div>
	</nav>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
	name: 'NavigationBar',
	components: {
		RouterLink
	},
	props: {
		active: {
			type: String,
			default: 'main'
		}
	}
}
</script>

<style lang="scss" scoped>
nav {
	border-radius: 8px;
	font-size: 0;
	height: 50px;
	position: relative;
	right: 0;

	a {
		line-height: 50px;
		height: 100%;
		font-size: 16px;
		display: inline-block;
		position: relative;
		z-index: 1;
		text-decoration: none;
		text-transform: uppercase;
		text-align: center;
		color: #fff;
		cursor: pointer;
	}

	.animation {
		position: absolute;
		height: 100%;
		top: 0;
		z-index: 0;
		transition: all .5s ease 0s;
		border-radius: 8px;
	}

	a:nth-child(1) {
		width: 100px;
	}

	a:nth-child(2) {
		width: 110px;
	}

	.main, a:nth-child(1):hover~.animation {
		width: 100px;
		left: 0;
		background-color: #1abc9c;
	}

	.favorite, a:nth-child(2):hover~.animation {
		width: 110px;
		left: 100px;
		background-color: #e67e22;
	}
}
</style>