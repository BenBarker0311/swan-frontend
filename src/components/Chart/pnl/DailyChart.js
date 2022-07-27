import React, { useRef, useEffect, useContext, useState } from 'react';
import ThemeContext from '../../../theme-context';
import { createChart, CrosshairMode } from 'lightweight-charts';

const DailyChart = ({ chartData, range }) => {
    const theme = useContext(ThemeContext);
    const chartRef = useRef();
    const dailyColor = 'rgba(45, 85, 255, 1)';
    const [chartState, setChartState] = useState();

    useEffect(() => {
        while(chartRef.current.hasChildNodes() ){
            chartRef.current.removeChild(chartRef.current.lastChild);
        }
        const chart = createChart(chartRef.current, { 
            height: 150, 
            crosshair: { mode: CrosshairMode.Normal }, 	
            timeScale: {
                visible: false,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
            },
            layout: theme.chart,
            grid: theme.chartGridColor,
    
        });
    
        const pnlBars = chart.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            color: dailyColor,
        });
        const dailyPnl = [];
        for (let row of chartData) {
            const time = Date.parse(row[0]) / 1000;
            dailyPnl.push({ time: time, value: parseFloat(row[1])});            
        } 
        pnlBars.setData(dailyPnl);

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
            Daily PnL
            <div ref={chartRef} className='chart' />
        </div>
    );
  };
  export default DailyChart;
