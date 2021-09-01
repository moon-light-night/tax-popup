import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import './assets/style/main.scss'

const firebaseConfig = {
    apiKey: "AIzaSyDedczDjzylhH6vOjv3QFLsyKCAbQI2i0g",
    authDomain: "tax-popup.firebaseapp.com",
    projectId: "tax-popup",
    storageBucket: "tax-popup.appspot.com",
    messagingSenderId: "968710091989",
    appId: "1:968710091989:web:c9661d48cebb790a2a1e5c"
};

const app = initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
