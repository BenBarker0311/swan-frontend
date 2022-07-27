import ReactApexChart from "react-apexcharts"
import styled from 'styled-components'
import { useResize } from "../../../utils/Helper";

// get data for chart
const series: any = [24, 25, 13, 18, 20]
const data: any = {
  series: series,
  options: {
    colors: ['#165DFF', '#63C1C0', '#FABB42', '#E6E6E6', '#13F3F3'],
    chart: {
      width: 580,
      height: '100%',
      type: 'donut',
      offsetY: 0,
      offsetX: -20
    },
    labels: [`Artic Loon: ${series[0]}%`, `Bald Eagle: ${series[1]}%`, `Emperor Penguin: ${series[2]}%`, `Black Falcon: ${series[3]}%`, `Horned Puffin: ${series[3]}%`],
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: '100%',
            offsetY: 0,
            offsetX: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '12px',
                    formatter: function (val: string) {
                      return 'Total Value'
                    }
                  },
                  value: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '14px',
                    fontWeight: 800,
                    formatter: function (val: string) {
                      return '$6,123'
                    }
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Total Value',
                    fontSize: '10px',
                    fontWeight: 800,
                    formatter: function (w) {
                      
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return '$6,193'
                      }, 0)
                    }
                  }
                },
                size: '65%',
              },
              offsetX: 0,
              offsetY: 0,
              customScale:1,
            }
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
            show: true,
            fontSize: 12,
            markers: {
              width: 5,
              height: 5,
              radius: 10,
              offsetY: 0,
              offsetX: 0
            }
          }
        }
      },
      {
        breakpoint: 820,
        options: {
          chart: {
            width: '100%',
            offsetY: 0,
            offsetX: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '12px',
                    formatter: function (val: string) {
                      return 'Total Value'
                    }
                  },
                  value: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '14px',
                    fontWeight: 800,
                    formatter: function (val: string) {
                      return '$6,123'
                    }
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Total Value',
                    fontSize: '10px',
                    fontWeight: 800,
                    formatter: function (w) {
                      
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return '$6,193'
                      }, 0)
                    }
                  }
                },
                size: '65%',
              },
              offsetX: 0,
              offsetY: 60,
              customScale:1,
            }
          },
          legend: {
            position: 'right',
            offsetY: 0,
            show: true,
            fontSize: 12,
            // markers: {
            //   width: 5,
            //   height: 5,
            //   radius: 10,
            //   offsetY: 0,
            //   offsetX: 0
            // }
          }
        }
      },
      {
        breakpoint: 912,
        options: {
          chart: {
            width: '100%',
            offsetY: 0,
            offsetX: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '12px',
                    formatter: function (val: string) {
                      return 'Total Value'
                    }
                  },
                  value: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '12px',
                    fontWeight: 800,
                    formatter: function (val: string) {
                      return '$6,123'
                    }
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Total Value',
                    fontSize: '12px',
                    fontWeight: 800,
                    formatter: function (w) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return '$6,193'
                      }, 0)
                    }
                  }
                },
                size: '65%',
              },
              offsetX: 0,
              offsetY: 60,
              customScale:1,
            }
          },
          legend: {
            position: 'right',
            offsetY: 0,
            show: true,
            fontSize: 12,
          }
        }
      },
      {
        breakpoint: 1300,
        options: {
          chart: {
            width: '100%',
            offsetY: 0,
            offsetX: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '12px',
                    formatter: function (val: string) {
                      return 'Total Value'
                    }
                  },
                  value: {
                    showAlways: true,
                    show: true,
                    color: '#073763',
                    fontSize: '6px',
                    fontWeight: 800,
                    formatter: function (val: string) {
                      return '$6,123'
                    }
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Total Value',
                    fontSize: '6px',
                    fontWeight: 800,
                    formatter: function (w) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return '$6,193'
                      }, 0)
                    }
                  }
                },
                size: '65%',
              },
              offsetX: 0,
              offsetY: 200,
              customScale:1.2,
            }
          }
        }
      },
    ],
    legend: {
      position: 'right',
      offsetY:0,
      fontSize: 14,
      fontWeight: 800,
      color: '#073763',
      markers: {
        width: 4,
        height: 50,
        radius: 10,
        offsetY: 20,
        offsetX: -15
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              showAlways: true,
              show: true,
              color: '#073763',
              fontSize: '12px',
              formatter: function (val: string) {
                return 'Total Value'
              }
            },
            value: {
              showAlways: true,
              show: true,
              color: '#073763',
              fontSize: '14px',
              // lineHeight: '26px',
              fontWeight: 800,
              formatter: function (val: string) {
                return '$6,123'
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Value',
              fontSize: '10px',
              fontWeight: 800,
              formatter: function (w) {
                
                return w.globals.seriesTotals.reduce((a, b) => {
                  return '$6,193'
                }, 0)
              }
            }
          },
          size: '65%',
        },
        offsetX: 0,
        offsetY: 100,
        customScale:1.2,
      }
    }
  },


};

const Wrap = styled.div`
  marginTop: 10px;
  color: #073763;
  fontWeight: 700;
  fontSize: 20px;
  lineHeight: 28px;
  width: 100%;
  @media screen and (min-width: 600px) {
    & .apexcharts-canvas {
      min-height: 100vh;important!
      margin-top: 20px;important!
    }
    & .apexcharts-canvas svg foreignObject {
      height: 100vh;important!
    }
  }
`
const style: any = {
  header: {
    color: `#073763`,
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '28px',
    margin: '15px 0 0 15px',
    display: 'flex',
    justifyContent: 'center',
    width:'100%'
  }
}

const DoughnutChart = () => {
  const width: any = `100%`
  const height: any = `100%`
  const { isMobile } = useResize()
  return (
    <Wrap>      
      <div style={style.header}>Breakdown of Treasury</div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="donut"
        width={width}
        height={isMobile ? '300px' : height}
      />
    </Wrap>
  )
}

export default DoughnutChart