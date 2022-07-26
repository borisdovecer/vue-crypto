import Dashboard from '/src/components/Dashboard.vue';
import CryptoDetails from '/src/components/CryptoDetails.vue';

export const routes = [
    { path: '/', component: Dashboard },
    { path: '/:id', component: CryptoDetails },
];

export default routes;
