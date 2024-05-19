<template>
    <Header />
    <div class="product-page p-6">
        <div class="product-card shadow-lg rounded-md p-4 mb-6">
            <h2 class="text-2xl font-semibold mb-4">{{ product.name }}</h2>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
            <div class="flex justify-between items-center">
                <span class="text-xl font-bold">{{ product.price }}$</span>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="input-container">
                <div class="w-1/3">
                    <label for="startDate">От:</label>
                    <input type="date" id="startDate" v-model="startDate" @click="openCalendar('startDate')"
                        class="px-2 py-1 border border-gray-300 rounded-md rounded-l-none pr-8 w-full sm:w-full bg-inherit shadow-md transition-shadow transition-colors duration-300 focus:outline-none focus:border-gray-100 focus:bg-gray-100 focus:shadow-lg">
                </div>
                <div class="w-1/3">
                    <label for="endDate">До:</label>
                    <input type="date" id="endDate" v-model="endDate" @click="openCalendar('endDate')"
                        class="px-2 py-1 border border-gray-300 rounded-md rounded-l-none pr-8 w-full sm:w-full bg-inherit shadow-md transition-shadow transition-colors duration-300 focus:outline-none focus:border-gray-100 focus:bg-gray-100 focus:shadow-lg">
                </div>
                <button class="w-1/3 flex justify-center items-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    @click="updateChart">Обновить</button>
            </div>
            <div class="charts mt-8">
                <label class="charts_label">ПРОДАЖИ</label>
                <div ref="chartContainerTotal" id="chart_total"></div>
                <div class="flex flex-row w-full">
                    <div class="flex flex-col items-center w-1/2">
                        <label class="charts_label">ЦЕНА И БОНУСЫ</label>
                        <div ref="chartContainerPrice" id="chart_total_price" class="w-full"></div>
                    </div>
                    <div class="flex flex-col items-center w-1/2">
                        <label class="charts_label">РЕЙТИНГ</label>
                        <div ref="chartContainerRating" id="chart_total_rating" class="w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import ApexCharts from 'apexcharts';

const product = ref({
    name: 'Product Name',
    description: 'Product description goes here.',
    price: 99.99
});

const chartContainerTotal = ref(null);
const chartContainerPrice = ref(null);
const chartContainerRating = ref(null);

const startDate = ref('');
const endDate = ref('');

const lotsData = [
    { x: new Date("2024-01-01"), y: 10 },
    { x: new Date("2024-02-01"), y: 41 },
    // Добавьте остальные данные здесь
];

const gmvData = [
    { x: new Date("2024-01-01"), y: 20 },
    { x: new Date("2024-02-01"), y: 35 },
    // Добавьте остальные данные здесь
];

const priceData = [
    { x: new Date("2024-01-01"), y: 15 },
    { x: new Date("2024-02-01"), y: 30 },
    // Добавьте остальные данные здесь
];

const bonusesData = [
    { x: new Date("2024-01-01"), y: 24 },
    { x: new Date("2024-02-01"), y: 56 },
    // Добавьте остальные данные здесь
];

const ratingData = [
    { x: new Date("2024-01-01"), y: 3.5 },
    { x: new Date("2024-02-01"), y: 4.2 },
    // Добавьте остальные данные здесь
];

// Преобразование данных в массивы
const lots = ref(Object.values(lotsData));
const gmv = ref(Object.values(gmvData));
const price = ref(Object.values(priceData));
const rating = ref(Object.values(ratingData));
const bonuses = ref(Object.values(bonusesData));

onMounted(() => {
    updateChart();
});

function updateChart() {
    const seriesTemplateLots = [
        { title: "Продажи в ШТ", name: "order_r", type: "line", color: "#db4437", width: 3, data: lots.value },
        { title: "Продажи в рублях", name: "order_r", type: "column", color: "#1a73e8", width: 3, data: gmv.value }
    ];

    const seriesTemplatePrice = [
        { title: "Цена", name: "price", type: "line", color: "#db4437", width: 3, data: price.value },
        { title: "Бонусы", name: "bonuses", type: "line", color: "#1a73e8", width: 3, data: bonuses.value }
    ];

    const seriesTemplateRating = [
        { title: "Рейтинг", name: "rating", type: "column", color: "#1a73e8", width: 3, data: rating.value }
    ];

    const dates = []; // Предположим, что у вас есть данные о датах

    CreateApexChart('chart_total_total', chartContainerTotal.value, dates, 500, seriesTemplateLots);
    CreateApexChart('chart_total_price', chartContainerPrice.value, dates, 500, seriesTemplatePrice);
    CreateApexChart('chart_total_rating', chartContainerRating.value, dates, 500, seriesTemplateRating);
}

function CreateApexChart(targetId, target, dates, height, series) {
    const options = {
        series: series,
        chart: {
            height: height,
            type: "line",
        },
        xaxis: {
            type: "datetime",
            categories: dates,
        },
        tooltip: {
            x: {
                format: "dd/MM/yyyy",
            },
        },
        stroke: {
            curve: "smooth",
        },
    };

    const chart = new ApexCharts(target, options);
    chart.render();
}

function openCalendar(id) {
  document.getElementById(id).focus();
}
</script>

<style scoped>
    .charts_label{
        font-size:24px;
        font-style: bold;
    }
    .input-container{
        display:flex;
        flex-direction: row;
        gap:4px;
    }
</style>