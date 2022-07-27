import ReactApexChart from "react-apexcharts"
import { useEffect, useState, useRef } from "react";
import { makeStyles, withStyles } from '@mui/styles';
import { useResize } from "../../../utils/Helper";
import { CircularProgress } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import AWS from 'aws-sdk'


AWS.config.update({
  accessKeyId: 'AKIAYBV2Y46UFUA55CQP',
  secretAccessKey: '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',
  region: 'eu-central-1'
})
const S3 = new AWS.S3();


const useStyles = makeStyles((theme) => ({
  root: {

  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    padding: '15px 15px',
    // overflow: 'auto'
  },
  chartTitle: {
    fontWeight: `700`,
    fontSize: `20px`,
    lineHeight: `28px`,
    marginLeft: '20px',
  },
  toggleButtonGroup: {
    backgroundColor: '#F3F3F3'
  },
  toggleButton: {
    fontSize: '11px',
    textTransform: 'none',
    border: 'none',
    borderRadius: '20px !important',
    color: '#000000'
    // padding: '10px'

  }
}))

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



const HornedPuffin = () => {
  const classes = useStyles()
  const { isMobile, isResponsive } = useResize()

  const [isLoading, setLoading] = useState(false)
  const [csvDate, setCsvDate] = useState<any>([])
  const [csvPnl, setCsvPnl] = useState<any>([])
  const [csvDailyPnl, setCsvDailyPnl] = useState<any>([])
  const [csvHeat, setCsvHeat] = useState<any>([])
  const [xAxis, setXAxis] = useState({
    min: 0,
    max: 0
  })
  // const [totalData, setTotalData] = useState([]);
  const s3: AWS.S3 = new AWS.S3();

  const [objectName, setObjectName] = useState<any[]>([])
  const [changeValue, setChangeValue] = useState('')
  const [changeId, setChangeId] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const tempPnl: any = []
  const tempDailyPnl: any = []
  const tempHeat: any = []
  const tempDate: any = [];

  let chartRef: any = useRef();


  const CumulativePnlData: any = {
    series: [
      {
        name: 'Cumulative Pnl',
        type: 'line',
        data: csvPnl
      },
      // {
      //   name: 'Combined Data',
      //   type: 'area',
      //   data: totalData,
      // }
    ],
    options: {
      title: {
        text: 'Cumulative Pnl',
        align: 'center'
      },
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            }
          },
          autoSelected: 'zoom'
        },
        events: {
          beforeZoom: (chartContext, { xaxis }) => {
            setXAxis({ min: xaxis.min, max: xaxis.max })
            return {
              xaxis
            }
          }
        }
      },
      color: ['yellow', 'green', 'blue'],
      stroke: {
        width: 3,
        curve: 'straight'
      },

      dataLabels: {
        enabled: false,
      },
      yaxis: {
        // max: 50,
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: csvDate,
        min: xAxis.min,
        max: xAxis.max,
        labels: {
          rotate: -25,
          rotateAlways: true,
          style: {
            fontSize: `12px`,
            textTransform: `rotate(45deg)`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom',
          }
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 8,
          height: 8,
          radius: 24
        },
        onItemHover: {
          highlightDataSeries: false
        },
      },
      fill: {
        type: `solid`
      },
      responsive: [{
        breakpoint: 1024,
        options: {
          title: {
            text: 'Cumulative Pnl',
            align: 'left'
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      }],
    },
  }

  const DailyPnlData: any = {

    series: [
      {
        name: 'DailyPnl',
        type: 'bar',
        data: csvDailyPnl
      }
    ],
    options: {
      title: {
        text: 'Daily Pnl',
        align: 'center'
      },
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            }
          },
          autoSelected: 'zoom'
        },
        events: {
          beforeZoom: (chartContext, { xaxis }) => {
            setXAxis({ min: xaxis.min, max: xaxis.max })
            return {
              xaxis
            }
          }
        }
      },
      background: ['#008ffbff'],
      colors: ['#008ffbff'],
      stroke: {
        width: 3,
        curve: 'straight'
      },

      dataLabels: {
        enabled: false,
      },
      yaxis: {
        // max: 50,
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: csvDate,
        min: xAxis.min,
        max: xAxis.max,
        labels: {
          rotate: 0,
          rotateAlways: true,
          style: {
            fontSize: `12px`,
            textTransform: `rotate(45deg)`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom',
          }
        },

      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 8,
          height: 8,
          radius: 24
        },
        onItemHover: {
          highlightDataSeries: false
        },
      },
      fill: {
        type: `solid`
      },
      responsive: [{
        breakpoint: 1024,
        options: {
          title: {
            text: 'Daily Pnl',
            align: 'left'
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      }],
    },
  }


  const HeatData: any = {
    series: [
      {
        name: 'Heat',
        type: 'bar',
        data: csvHeat
      },
    ],
    options: {
      title: {
        text: 'Heat',
        align: 'center'
      },
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            }
          },
          autoSelected: 'zoom'
        },
        events: {
          beforeZoom: (chartContext, { xaxis }) => {
            setXAxis({ min: xaxis.min, max: xaxis.max })
            return {
              xaxis
            }
          }
        }
      },
      background: '#7e2931ff',
      colors: ['#7e2931ff'],
      stroke: {
        width: 3,
        curve: 'straight'
      },

      dataLabels: {
        enabled: false,
      },
      yaxis: {
        // max: 50,
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: csvDate,
        min: xAxis.min,
        max: xAxis.max,
        labels: {
          rotate: -25,
          rotateAlways: true,
          style: {
            fontSize: `12px`,
            textTransform: `rotate(45deg)`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom',
          }
        },

      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 8,
          height: 8,
          radius: 24
        },
        onItemHover: {
          highlightDataSeries: false
        },
      },
      fill: {
        type: `solid`
      },
      responsive: [{
        breakpoint: 1024,
        options: {
          title: {
            text: 'Heat',
            align: 'left'
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      }],
    },
  }

  const handleChangeValue = async (item: any, idx: any) => {
    setLoading(true)
    handleClose()

    setChangeId(idx)

    setChangeValue(item?.prefix);
    const stt: any = await getFileFromS3(objectName[idx]?.json);
    const decoder1 = new TextDecoder('utf-8');
    const reader1 = await decoder1.decode(stt.Body)
    const parseJson1 = JSON.parse(reader1)

    for (let i = 0; i < parseJson1.data.length; i++) {
      tempPnl.push(parseJson1.data[i][2])
      tempDailyPnl.push(parseJson1.data[i][0])
      tempHeat.push(parseJson1.data[i][1])
      tempDate.push(parseJson1.index[i])
    }
    setXAxis({ min: parseJson1.index[0], max: parseJson1.index[parseJson1.index.length - 1] })
    setCsvPnl([...tempPnl])
    setCsvDailyPnl([...tempDailyPnl])
    setCsvHeat([...tempHeat])
    setCsvDate([...tempDate])

    setLoading(false)
  }

  const getFileFromS3 = async (objectKey: string) => {
    return new Promise((resolve, reject) => {
      try {
        S3.getObject({
          Bucket: `spread-viz-bucket`,
          Key: objectKey
        }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      var params = {
        Bucket: 'spread-viz-bucket',
        Delimiter: '/',
        Prefix: ''
      }
      let res: any[] = []
      const itemNames: any = await new Promise((resolve, reject) => {
        try {
          s3.listObjects(params, async function (err: any, data: any) {
            if (err) throw err;
            const result = data?.CommonPrefixes.map((item: any) => {
              return item?.Prefix
            })
            resolve(result)
          })
        }
        catch (err) {
          reject(``);
        }
      });


      for (let i = 0; i < itemNames.length; i++) {
        const temp2 = await new Promise((resolve, reject) => {
          try {
            s3.listObjects({
              Bucket: 'spread-viz-bucket',
              Delimiter: '/',
              Prefix: itemNames[i]
            }, function (err: any, data: any) {
              if (err) throw err;
              resolve(data?.Contents[1]?.Key);
            });
          } catch (error) {
            resolve(``);
          }
        });

        res.push({
          bucket: 'spread-viz-bucket',
          delimiter: '/',
          prefix: itemNames[i].replace(/[_/]/g, ' '),
          json: temp2
        });
      }
      // console.log('ressss', res)
     
      setObjectName([...res]);
      if (res.length > 0) {
        setChangeId(0);
        setChangeValue(res[0].prefix)
        // get amazon s3 json data
        // setChangeId(0)
        const stt: any = await getFileFromS3(res[0]?.json);
        const decoder1 = new TextDecoder('utf-8');
        const reader1 = await decoder1.decode(stt.Body)
        const parseJson1 = JSON.parse(reader1)

        for (let i = 0; i < parseJson1.data.length; i++) {
          tempPnl.push(parseJson1.data[i][2])
          tempDailyPnl.push(parseJson1.data[i][0])
          tempHeat.push(parseJson1.data[i][1])
          tempDate.push(parseJson1.index[i])
        }
        setXAxis({ min: parseJson1.index[0], max: parseJson1.index[parseJson1.index.length - 1] })
        setCsvPnl([...tempPnl])
        setCsvDailyPnl([...tempDailyPnl])
        setCsvHeat([...tempHeat])
        setCsvDate([...tempDate])
      }
      
      setLoading(false)
    })()
  }, [])

  return (
    <>
      {isLoading && <CircularProgress sx={{
        position: `absolute`,
        left: `50%`,
        transform: `translate(-44%,0)`
      }} />}
      <div style={{ width: '100%' }}>
        <div className={classes.chartHeader} style={{ display: isMobile ? 'block' : 'flex', textAlign: isMobile ? 'unset' : 'center' }}>
          <div className={classes.chartTitle}>
            <label className="select" >
              {/* <select id="slct" required>
              {
                objectName?.map((item: any, idx: any) => {
                  return (
                    <option value={idx} onClick={() => { alert(idx) }}>{item.replace(/[_/]/g, ' ')}</option>
                  )
                })
              }
            </select> */}
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {changeValue}
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {
                  objectName.map((item: any, idx: any) => {
                    return (
                      <MenuItem onClick={() => handleChangeValue(item, idx)} disableRipple key={idx}>
                        {item?.prefix}
                      </MenuItem>
                    )
                  })
                }

              </StyledMenu>

            </label>
          </div>
        </div>
        {/* <ReactApexChart options={cumulativePnl.options} series={cumulativePnl.series} type="area" height={350} />
      <ReactApexChart options={dailyPnl.options} series={dailyPnl.series} type="area" height={200} />
      <ReactApexChart options={heat.options} series={heat.series} type="area" height={200} /> */}
        {changeId !== null &&
          <>

            <ReactApexChart
              ref={chartRef}
              options={{ ...CumulativePnlData.options, xaxis: { ...CumulativePnlData.options.xaxis, min: xAxis.min, max: xAxis.max } }}
              series={CumulativePnlData.series}
              type="area"
              height={350} />
            <ReactApexChart
              ref={chartRef}
              options={{ ...DailyPnlData.options, xaxis: { ...DailyPnlData.options.xaxis, min: xAxis.min, max: xAxis.max } }}
              series={DailyPnlData.series}
              type="bar"
              height={200} />
            <ReactApexChart
              ref={chartRef}
              options={{ ...HeatData.options, xaxis: { ...HeatData.options.xaxis, min: xAxis.min, max: xAxis.max } }}
              series={HeatData.series}
              type="bar"
              height={200} />
          </>
        }


      </div>
    </>
  )
}

export default HornedPuffin