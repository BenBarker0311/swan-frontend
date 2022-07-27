import React, { useRef, useEffect, useContext, useState } from 'react';
import ThemeContext from '../../../theme-context';
import { createChart, CrosshairMode } from 'lightweight-charts';

const HeatChart = ({ chartData, range, setRange }) => {
    const theme = useContext(ThemeContext);
    const chartRef = useRef();
    const heatColor = 'rgba(242,38,19, 1)';
    const [chartState, setChartState] = useState();

    useEffect(() => {
        while(chartRef.current.hasChildNodes() ){
            chartRef.current.removeChild(chartRef.current.lastChild);
        }
        const chart = createChart(chartRef.current, { 
            height: 150, 
            crosshair: { mode: CrosshairMode.Normal }, 	
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            layout: theme.chart,
            grid: theme.chartGridColor,
    
        });
    
        const heatBars = chart.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            color: heatColor,
        });
        const heat = [];
        for (let row of chartData) {
            const time = Date.parse(row[0]) / 1000;
            heat.push({ time: time, value: parseFloat(row[3])});            
        } 
        heatBars.setData(heat);

        chart.applyOptions({
            handleScale: {
                mouseWheel: false
            },
            handleScroll: {
                mouseWheel: false
            }
        });
        setChartState(chart);
    }, [chartData, theme]);

    
    useEffect(() => {
        if (!chartState) return;
        if (!Object.keys(range).length) return;
        chartState.timeScale().setVisibleLogicalRange(range);
    }, [range])

    

    return (
        <div>
            Heat
            <div ref={chartRef} className='chart' />
        </div>

    );
  };
  export default HeatChart;
