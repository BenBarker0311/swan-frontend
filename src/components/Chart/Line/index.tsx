import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts"

const data: any = {

  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100, 44, 22, 33, 14, 55]
  },],
  options: {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'number',
      categories: ['1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11', '12'
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    title: {
      text: 'Market Cap',
      style: {
        fontWeight: `700`,
        fontSize: `20px`,
        lineHeight: `28px`
      },
      offsetY: 10
    },
    grid: {
      strokeDashArray: 5
    }
  },
};

const LineChart = () => {
  const width: any = `100%`
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="area"
      width={width}
      height={width}
    />
  )
}

export default LineChart