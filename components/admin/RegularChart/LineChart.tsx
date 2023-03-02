import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from "chart.js";
import type { ChartData, ChartOptions } from 'chart.js';

Chart.register(Filler);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

const data = {
  labels,
  datasets: [
    {
      label: "Earned",
      data: [280, 250, 300, 1200, 130, 900],
      pointBorderWidth: 1.5,
      pointBackgroundColor: "rgb(255, 210, 76)",
      borderColor: "rgb(255, 210, 76)",
      backgroundColor: "rgba(255, 210, 76, .5)",
      borderCapStyle: "round" as "round",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: "Target",
      data: [200, 200, 30, 700, 950, 350],
      pointBorderWidth: 1.5,
      pointBackgroundColor: "rgb(21, 19, 60)",
      pointHoverBorderWidth: 8,
      borderColor: "rgb(21, 19, 60)",
      backgroundColor: "rgba(21, 19, 60,.3)",
      borderCapStyle: "round" as "round",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;
