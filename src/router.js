import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage'
import FavoritePage from './pages/FavoritePage'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Main', component: MainPage },
        { path: '/favorite', name: 'Favorite', component: FavoritePage }
    ]
})