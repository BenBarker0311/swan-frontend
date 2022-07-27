import React, { useState, useEffect, useRef, useContext } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import ThemeContext from '../../../theme-context';

const CumulativeChart = ({ chartData, defaultZoom, setRange, refresh, setRefresh }) => {
    const theme = useContext(ThemeContext);
    const chartRef = useRef();
    const [chartState, setChartState] = useState({});

    const cumColor = 'rgba(50, 205, 50, 1)';
    useEffect(() => {
        while (chartRef.current.hasChildNodes()) {
            chartRef.current.removeChild(chartRef.current.lastChild);
        }
        const chart = createChart(chartRef.current, {
            height: 400,
            crosshair: { mode: CrosshairMode.Normal },
            timeScale: {
                visible: false,
            },
            layout: theme.chart,
            grid: theme.chartGridColor,

        });

        const cumPnlSeries = chart.addAreaSeries({ lineColor: cumColor });
        const cumPnl = [];

        for (let row of chartData) {
            const time = Date.parse(row[0]) / 1000;
            cumPnl.push({ time: time, value: parseFloat(row[2]) });
        }
        cumPnlSeries.setData(cumPnl);
        chart.timeScale().fitContent();
        chart.timeScale().subscribeVisibleLogicalRangeChange((_range) => {
            setRange(_range)
        });

        if (!!chart.timeScale().getVisibleLogicalRange()) {
            defaultZoom.current = chart.timeScale().getVisibleLogicalRange();
            defaultZoom.current.from = 0;
        }
        setChartState(chart);
    }, [chartData, theme]);

    useEffect(() => {
        if (!refresh) return;
        if (!chartState) return;
        if (!Object.keys(defaultZoom.current).length) return;
        chartState.timeScale().setVisibleLogicalRange(defaultZoom.current);
        setRefresh(false)
    }, [refresh])


    return (
        <div>
            Cumulative PnL
            <div ref={chartRef} className='chart' />
        </div>
    );
}

export default CumulativeChart;
