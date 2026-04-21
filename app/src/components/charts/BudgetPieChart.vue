<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)
export default {
    name: 'PieChart',
    components: { Pie },
    data() {
        return {
            chartData: {
                labels: ['Needs', 'Wishes'],
                datasets: [
                    {
                        label: 'Needs and wishes',
                        backgroundColor: ['#56D788', '#A4FBC1'],
                        data: [429, 854]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Needs and Wishes'
                }
            }
        }
    }
}

</script>

<template>
  <Pie
    id="pie-chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>