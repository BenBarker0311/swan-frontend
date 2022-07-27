import { useRef } from "react";
import ReactApexChart from "react-apexcharts"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material'
import AWS from 'aws-sdk'
import cx from 'classnames'
import { useResize } from "../../../utils/Helper";

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
    paddingBottom: '10px',
  },
  chartTitle: {
    fontWeight: `700`,
    fontSize: `20px`,
    lineHeight: `28px`,
    marginRight: '20px',
    color: `#073763`
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
  },
  selectedToggleButton: {
    fontSize: '11px',
    textTransform: 'none',
    border: 'none',
    borderRadius: '20px !important',
    backgroundColor: "#059B9A",
    color: '#fff'
  },
  legend: {
    maxWidth: `650px`,
    left: `80px`,
    bottom: `20px`,
    position: `absolute`,
    textAlign: `center`,
    margin: `0 auto`
  },
  chartInfo: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    flexWrap: `wrap`
  },
  chartInfoItem: {
    border: `1px solid #DBDCDD`,
    margin: `8px 0px`
  },
  chartInfoTitle: {
    background: `#F0F1F2`,
    color: `#083964`,
    padding: `8px 12px`,
    borderBottom: `1px solid #DBDCDD`
  },
  chartInfoValue: {
    background: ``,
    color: `B5B5B5`,
    padding: `8px 12px`,
  }
}))

const timeLists = [
  { name: '3days' }, { name: '1w' }, { name: '1mo' }, { name: '3mo' }, { name: '1yr' }, { name: 'All' },
]

const ValueOverTime = () => {
  let chartRef: any = useRef();
  const width: any = `100%`
  const classes = useStyles()
  const { isMobile } = useResize()
  const [valueId, setValueId] = useState(5)
  const [isLoading, setLoading] = useState(false)
  const [jsonDate, setJsonDate] = useState<any[]>([]);
  const [totalData, setTotalData] = useState<any[]>([]);
  const [days, setDays] = useState<number>(0);
  const [positive, setPositive] = useState<number>(0);
  const [totalHeat, setTotalHeat] = useState<number>(0);
  const [min, setMin] = useState<number>(0)
  const [sharp, setSharp] = useState<number>(0)
  const [averHeat, setAverHeat] = useState<number>(0)
  const [cumulatives, setCumulatives] = useState<any[]>([]);
  const [arrCumulatives, setArrCumulatives] = useState<any[]>([])
  const [arrDateSort, setArrDateSort] = useState<any[]>([])
  const [totalPnl, setTotalPnl] = useState(0)
  const [averagePnl, setAveragePnl] = useState(0)
  const [bestDailyPnl, setBestDailyPnl] = useState(0)

  AWS.config.update({
    accessKeyId: 'AKIAYBV2Y46UFUA55CQP',
    secretAccessKey: '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',
    region: 'eu-central-1'
  })

  const s3 = new AWS.S3();
  const tempPnl: any = []
  let tempDate: any = [];
  let tempDailyPnl: any = [];
  let parseJson1: any = [];
  let Pnls: any[] = [];
  let Cumulatives :any[] = [];
  let arrDate:any[] = []
  let total: any = 0;
  let heat: any = 0;
  
  const data: any =
  {
    series:
      [
        {
          name: 'Combined Data',
          type: 'area',
          data: totalData,
        }
      ]
    ,
    options: {
      colors: ['#FF0000', '#BBBBBB', '#FFC700', '#FF6E00', '#2979FF', '#6600CC', '#50CD89'],
      annotations: {
        position: 'front' ,
        yaxis: [{
          y: 0,
          y2: null,
          strokeDashArray: 1,
          borderColor: '#c2c2c2',
          fillColor: '#c2c2c2',
          opacity: 0.3,
          offsetX: 0,
          offsetY: -3,
          width: '100%',
          yAxisIndex: 0,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: undefined,
            textAnchor: 'end',
            position: 'right',
            offsetX: 0,
            offsetY: 0,
            mouseEnter: undefined,
            mouseLeave: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-yaxis-annotation-label',
              padding: {
                left: 5,
                right: 5,
                top: 0,
                bottom: 2,
              }
            },
          },
        }],
        xaxis: [{
          x: 0,
          x2: null,
          strokeDashArray: 1,
          borderColor: '#c2c2c2',
          fillColor: '#c2c2c2',
          opacity: 0.3,
          offsetX: 0,
          offsetY: 0,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: undefined,
            textAnchor: 'middle',
            position: 'top',
            orientation: 'vertical',
            offsetX: 0,
            offsetY: 0,
            mouseEnter: undefined,
            mouseLeave: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-xaxis-annotation-label',
            },
          },
        }],
        points: [{
          x: 0,
          y: null,
          yAxisIndex: 0,
          seriesIndex: 0,
          mouseEnter: undefined,
          mouseLeave: undefined,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: undefined,
            textAnchor: 'middle',
            offsetX: 0,
            offsetY: -15,
            mouseEnter: undefined,
            mouseLeave: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-point-annotation-label',
              padding: {
                left: 5,
                right: 5,
                top: 0,
                bottom: 2,
              }
            },
          },
          image: {
            path: undefined,
            width: 20,
            height: 20,
            offsetX: 0,
            offsetY: 0,
          }
        }],
        
        texts: [{
          x: 0,
          y: 0,
          text: '',
          textAnchor: 'start',
          foreColor: undefined,
          fontSize: '13px',
          fontFamily: undefined,
          fontWeight: 400,
          appendTo: '.apexcharts-annotations',
          backgroundColor: 'transparent',
          borderColor: '#c2c2c2',
          borderRadius: 0,
          borderWidth: 0,
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 2,
          paddingBottom: 2,
        }],
        images: [{
          path: '',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          appendTo: '.apexcharts-annotations'
        }],
      },

      chart: {
        height: 320,
        type: 'area',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
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
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,
        },
      },
      stroke: {
        width: [2, 2, 2, 2, 2, 4],
        colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',],
        curve: 'smooth'
      },
      responsive: [{
        breakpoint: 1024,
        options: {
          legend: {
            show: true,
            horizontalAlign: 'center',
          }
        },
      }],
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        onItemHover: {
          highlightDataSeries: false
        },
        // markers: {
        //   width: 12,
        //   height: 12,
        //   strokeWidth: 0,
        //   strokeColor: '#fff',
        //   fillColors: undefined,
        //   radius: 12,
        //   customHTML: undefined,
        //   onClick: undefined,
        //   offsetX: 0,
        //   offsetY: 0
        // },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      grid: {
        strokeDashArray: 5
      },
      yaxis: {
        forceNiceScale: true,
        labels: {
          formatter: function (y: any) {
            return y.toFixed(0);
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: jsonDate,
        labels: {
          rotate: -20,
          rotateAlways: true,
          style: {
            fontSize: `12px`,
            textTransform: `rotate(45deg)`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom',
          },
          datetimeUTC: false,
          datetimeFormatter: {
            year: 'yyyy',
            month: "dd MMM",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
      },
    },
  };

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

      let ref:any
      for (let i = 0; i < res.length; i++) {
        const stt: any = await getFileFromS3(res[i]?.json);
        const decoder1 = new TextDecoder('utf-8');
        const reader1 = await decoder1.decode(stt.Body)
        parseJson1 = JSON.parse(reader1)
        tempPnl.push(parseJson1)
        parseJson1.index.map((item:any, index:any) => {
          if (index > 0 && arrDate.findIndex(itm => itm === item) < 0) {
            arrDate = [...arrDate, item]
          }
        })
        // setArrangDate([...arrDate])
        tempDate = [...tempDate, ...parseJson1.index]
        parseJson1.data.find((item: any, idx: any) => {
          tempDailyPnl = [...tempDailyPnl, item[0]]
        })
      
        parseJson1.data.map((item: any, index:any) => {
          if (index > 0) { 
            Pnls = [...Pnls, item[0]]
            Cumulatives = [...Cumulatives, item[2]]
          }
        })
      }
      let arr: any[] = arrDate.sort(function(a:any, b:any) {return a - b})
      setArrDateSort([...arr])
        //get cumulative Pnl values according to reagrranged days(24)
      for (let k = 0; k < arrDate.length; k ++) {
        let combined = 0;
        tempPnl.map((item: any, idx: any) => {
          const res = item.index.findIndex((item2: any, idx2: any) => {
            return arrDate[k] == item2
          })
          if (res >= 0) {
            combined += item.data[res][2];
          }
        })
        arrCumulatives.push(combined)
      }
      tempPnl.map((item: any, index: any) => {
        total += item.data[item.data.length - 1][2]
      })
      tempPnl.map((item: any, index: any) => {
        item.data.map((it: any, idx: any) => {
          heat += it[1]
          if (idx == 0 && index == 0) {
            ref = it[1]
          } else {
            if (it[1] < ref) {
              ref = it[1]
            }
          }
        })
      })
      
      let averageHeat = heat / arrDate.length;
      setAverHeat(averageHeat)
      setMin(ref)
      setTotalHeat(heat)
      setTotalPnl(total)
      setDays(arrDate.length)
      setCumulatives([...cumulatives])
      //get rearranged daily-Pnls values(non-duplicated)
      let arrPnls = new Array(arrDate.length).fill(0)
      arrDate.map((item:any, index:any) => {
        let curDate:any[] = []
        tempDate.map((date, idx) => {
          if (item == date) {
            curDate = [...curDate, idx]
          }
        })
        curDate.map(ix => {
          arrPnls[index] += Pnls[ix]
        })  
      })
    
      let positiveDays = 0

      arrDate.map(index => {
        let curarrDate:any[] = [], sum = 0
        tempDate.map((date,idx) => {
          if (date === index) {
            curarrDate = [...curarrDate, idx]
          }
        })
        curarrDate.map(idx => sum += Pnls[idx])
        if (sum > 0) {
          ++positiveDays
        }
      })
      let sharp = (total /  arrDate.length) / getStandardDeviation(Pnls)   
      // setTotalArr([...arrPnls])
      setSharp(sharp)
      setPositive(positiveDays * 100 / arrDate.length)
      setBestDailyPnl(Math.max(...tempDailyPnl))
      setAveragePnl(total /  arrDate.length)
      if (valueId == 5) {
        setJsonDate([...arr])
        setTotalData([...arrCumulatives])
      }
      
      setLoading(false)
    })()
  }, [])

  function getStandardDeviation(array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }

  const handleChange = async (index: any) => {

    setLoading(true)
    setValueId(index)

    switch (index) {
      case 0:
        var day = new Date()
        day.setDate(day.getDate() - 5);
        const threeDays = arrDateSort.filter((item) => {
          return item > day.getTime()
        })
        setJsonDate([...threeDays])
        const findthreeDays: any = arrDateSort.findIndex((item) => {
          return item > day.getTime()
        })
        let threeDaysArr: any[] = []
        for (let i = findthreeDays; i < arrCumulatives.length; i++) {
          threeDaysArr.push(arrCumulatives[i])
        }
        setTotalData([...threeDaysArr])
        break;

      case 1:
        // let week:any[] = [];
        var day = new Date()
        day.setDate(day.getDate() - 8);
        const week = arrDateSort.filter((item) => {
          return item > day.getTime()
        })
        setJsonDate([...week])
        const findWeek: any = arrDateSort.findIndex((item) => {
          return item > day.getTime()
        })
        let weekArr: any[] = []
        for (let i = findWeek; i < arrCumulatives.length; i++) {
          weekArr.push(arrCumulatives[i])
        }
        setTotalData([...weekArr])
        break;
        
      case 2:
        let oneMonth:any[] = [];
        var day = new Date()
        day.setMonth(day.getMonth() - 1);
        // oneMonth = [...oneMonth, day.setDate(day.getDate())]
        // let oneMonthArr:any = [...oneMonth, ...arrDateSort]
        const oneMonthArr: any = arrDateSort.filter((item) => {
          return item > day.getTime()
        })
        setJsonDate([...oneMonthArr])
        const findOneMonth: any = arrDateSort.findIndex((item) => {
          return item > day.getTime()
        })
     
        let oneMonthCumul: any[] =[]
        for (let i = findOneMonth; i < arrCumulatives.length; i++) {
          oneMonthCumul.push(arrCumulatives[i])
        }
        setTotalData([...oneMonthCumul])
        break;

      case 3:
        let threeMonth:any[] = [];
        var day = new Date()
        day.setMonth(day.getMonth() - 3);
        threeMonth = [...threeMonth, day.setDate(day.getDate())]
        for (let i = 0; i < 2; i ++) {
          threeMonth = [...threeMonth, day.setDate(day.getDate() + 30)] 
        }
        let threeMonthArr:any = [...threeMonth, ...arrDateSort]
        if (arrDateSort.includes(day.getTime()) == false) {
          setJsonDate([...threeMonthArr])
        }
        let threeCumul = new Array(3).fill(0)
        let threeMonthCumul = [...threeCumul, ...arrCumulatives]
        setTotalData([...threeMonthCumul])
        break;

      case 4:
        let NewYear:any[] = [];
        var day = new Date()
        day.setFullYear(day.getFullYear() - 1);
        NewYear = [...NewYear, day.setDate(day.getDate())]
        for (let i = 0; i < 10; i ++) {
          NewYear = [...NewYear, day.setDate(day.getDate() + 30)] 
        }
        let NewYearArr:any = [...NewYear, ...arrDateSort]
        if (arrDateSort.includes(day.getTime()) == false) {
          setJsonDate([...NewYearArr])
        }
        let arrCumul = new Array(11).fill(0)
        let NewArrCumul = [...arrCumul, ...arrCumulatives]
        setTotalData([...NewArrCumul])
        break;

      case 5:
        setJsonDate([...arrDateSort])
        setTotalData([...arrCumulatives])
        break;

      default:
        break;
    }
    setLoading(false)
  }
  
  return (
    <>
      {isLoading &&
        < CircularProgress sx={{
          position: `absolute`,
          left: `50%`,
          top: `50%`,
          transform: `translate(-44%,-50%)`
        }} />}
      <div>
        <div style={{display: isMobile ? 'block' : 'flex'}}>
          <div className={classes.chartTitle} style={{ alignItems:'center',marginBottom: isMobile ? '10px' : 0, display: 'flex', justifyContent: isMobile ? 'center' : 'start', width: '100%'}}>Combined Chart</div>
          <div style={{ overflow: 'auto', display: 'flex', justifyContent: isMobile ? 'center':'end' }}>
        </div>
        <div className={classes.chartHeader} style={{ display: isMobile ? 'block' : 'flex', textAlign: isMobile ? 'unset' : 'center' }}>
            <ToggleButtonGroup
              className={classes.toggleButtonGroup}
              sx={{ height: '30px', borderRadius: '20px' }}
            >
              {
                timeLists.map((item: any, idx: any) => {
                  return (
                    <ToggleButton
                      onClick={() => handleChange(idx)}
                      value={item.name}
                      className={idx === valueId ? classes.selectedToggleButton : classes.toggleButton}
                      key={idx}
                    >{item.name}</ToggleButton>
                  )
                })
              }

            </ToggleButtonGroup>
          </div>
        </div>

        <ReactApexChart
          ref={chartRef}
          id="chart"
          options={data.options}
          series={data.series}
          type="area"
          width={width}
          height="530px"
        />

        <div className={cx(classes.chartInfo, 'row')}>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Days Traded</div>
              <div className={classes.chartInfoValue} >{days}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >% Days Positive</div>
              <div className={classes.chartInfoValue} >{positive.toFixed(0)}%</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Total Pnl</div>
              <div className={classes.chartInfoValue} >{totalPnl.toFixed(1)}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Sharpe</div>
              <div className={classes.chartInfoValue} >{sharp.toFixed(2)}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Best Daily Pnl</div>
              <div className={classes.chartInfoValue} >${bestDailyPnl.toFixed(1)}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Average PnL</div>
              <div className={classes.chartInfoValue} >${averagePnl.toFixed(1)}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Average Heat</div>
              <div className={classes.chartInfoValue} >{averHeat.toFixed(1)}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','p-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >PnL/Heat</div>
              <div className={classes.chartInfoValue} >{(totalPnl/totalHeat).toFixed(1)}</div>
            </div>
          </div>
          <div className={cx('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-4', 'col-12','ml-1 mr-1')}>
            <div className={cx(classes.chartInfoItem)} >
              <div className={classes.chartInfoTitle} >Worst Heat</div>
              <div className={classes.chartInfoValue} >{min.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ValueOverTime