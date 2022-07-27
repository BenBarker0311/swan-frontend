import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts"

const data: any = {
          
  series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 11, 33, 45]
  }, 
  ],
  options: {
    colors: ['#2979FF', '#63C1C0', '#FABB42 '],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      colors: ['#2979FF', '#63C1C0', '#FABB42 '],
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['1' ,'', '3', '', '5', '', '7', '', '9', '', '11', ''],
    },
    yaxis: {
      title: {
        // text: '$ (thousands)'
      }
    },
    responsive: [{
      breakpoint: 1024,
      options: {
        xaxis: {
          categories: ['1' ,'', '3', '', '5', '', '7', '', '9', '', '11', ''],
        },
      }
    }],
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    },
    title: {
      text: 'Liquidity Pool',
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

const BarChart = () => {
  const width: any = `100%`
    return (
      <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          width={width}
          height={width}
      />
    )
}

export default BarChart