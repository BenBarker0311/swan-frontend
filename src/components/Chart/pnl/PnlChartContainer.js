import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from '../../../theme-context';
import CumulativeChart from './CumulativeChart';
import DailyChart from './DailyChart';
import HeatChart from './HeatChart';
import DataError from '../DataError';
import { Button } from 'react-bootstrap';

import { fetchCsvFromS3 } from '../../../helpers/fetchFromS3';

const PnlChartContainer = ({ strategy }) => {
    const theme = useContext(ThemeContext);
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState('');
    const [range, setRange] = useState({});
    const defaultZoom = useRef();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const file = 'pnl/mock-pnl.csv';
        const fetch = async () => {
            const data = await fetchCsvFromS3(file, setError);
            data ? setChartData(data) : setChartData([]);
        }
        fetch()
    }, []);

    const rescale = () => {
        setRange(defaultZoom.current);
        setRefresh(true);
    }
    
    return (
        <div style={{ width: "100%", padding: "20px"}} className={`content ${theme.content}`}>
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <h4>{strategy}</h4>
                <Button variant={ theme.text === 'light' ? 'light' : 'secondary' } onClick={rescale}>&#x21bb;</Button>
            </div>
            {error 
            ? <DataError error={error} />
            : <>
                <CumulativeChart chartData={chartData} defaultZoom={defaultZoom} setRange={setRange} 
                                 refresh={refresh} setRefresh={setRefresh} />
                <hr></hr>
                <DailyChart chartData={chartData} range={range} setRange={setRange} />
                <hr></hr>
                <HeatChart chartData={chartData} range={range} setRange={setRange} />
              </>
            }
        </div>

    );
  };
  export default PnlChartContainer;
