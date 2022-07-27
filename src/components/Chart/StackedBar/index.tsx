import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts"
import { useResize } from "../../../utils/Helper";
import AWS from 'aws-sdk'
import { useEffect, useState } from "react";

const data: any = {
          
    series: [{
      name: 'Centralized',
      data: [44, 55, 41, 27, 22, 43, 22, 33, 11, 24, 25, 23]
    }, {
      name: 'Decentralized',
      data: [13, 23, 20, 8, 13, 27, 22, 33, 11, 24, 25, 23]
    }, {
      name: 'Other',
      data: [11, 17, 15, 15, 21, 14, 22, 33, 11, 24, 15, 23]
    }, 
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 1024,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
            horizontalAlign: 'center'
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: '45%'
        },
      },
      xaxis: {
        type: 'number',
        categories: ['1', '2', '3', '4',
          '5', '6', '7', '8', '9', '10', '11', '12' 
        ],
      },
      legend: {
        position: 'top',
        offsetY: -40,
        horizontalAlign: 'right',
        markers: {
          width: 8,
          height: 8,
          radius: 10

        }
      },
      fill: {
        opacity: 1
      },
      title: {
        text: 'Volume',
        style: {
          fontWeight: `700`,
          fontSize: `20px`,
          lineHeight: `28px`
        },
        offsetY: 10
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 5
      }

    },
  
  
};

const StackChart = () => {
  const {isMobile, isResponsive} = useResize()
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

export default StackChart