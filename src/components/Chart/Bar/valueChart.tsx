import ReactApexChart from "react-apexcharts"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import { makeStyles } from '@mui/styles';
import { useResize } from "../../../utils/Helper";

const data: any = {

  series: [{
    name: 'Strategies',
    data: [44, 55, 57, 56, 61]
  },
  ],
  options: {
    colors: '#165DFF',
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
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
      categories: [`Artic Loon`, `Bald Eagle`, `Emperor Penguin`, `Black Falcon`, `Horned Puffin`],
    },
    yaxis: {
      title: {
      }
    },
    responsive: [{
      breakpoint: 1024,
      options: {
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7'],
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
    grid: {
      strokeDashArray: 5
    }
  },
};


const useStyles = makeStyles((theme) => ({
  root: {
  },
  chartHeader: {
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    overflow: 'auto',
    marginBottom: '10px'
  },
  chartTitle: {
    fontWeight: `700`,
    fontSize: `20px`,
    lineHeight: `28px`,
    marginRight: '20px',
    color: `#073763`,
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
  }
}))

const timeLists = [
  { name: '3days' }, { name: '1w' }, { name: '1mo' }, { name: '3mo' }, { name: '1yr' }, { name: 'All' },
]

const ValueChart = () => {
  const width: any = `100%`
  const { isMobile } = useResize()
  const [alignment, setAlignment] = useState('3days');
  const classes = useStyles()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <div>
      <div className={classes.chartHeader} style={{ marginTop: isMobile ? '0px' : '20px', display: isMobile ? 'block' : 'flex'}}>
        <div className={classes.chartTitle} style={{marginBottom: isMobile ? '10px' : '0px'}}>Value</div>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleChange}
          className={classes.toggleButtonGroup}
          sx={{ height: '30px', borderRadius: '20px' }}
        >
          {
            timeLists.map(time => <ToggleButton value={time.name} className={classes.toggleButton} sx={{ '&.Mui-selected:hover, &.Mui-selected': { backgroundColor: "#059B9A", color: '#fff' } }}>{time.name}</ToggleButton>)
          }
        </ToggleButtonGroup>
      </div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        width={width}
        height="310px"
      />
    </div>
  )
}

export default ValueChart