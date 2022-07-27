import React from 'react';
import PnlChartContainer from './PnlChartContainer';

const Pnl = ({ strategies }) => {

    return (
        <div>
            <p>Mock data</p>
            <div className='charts-flex-container'>
            {strategies.map((strategy, idx) => {
                return <PnlChartContainer key={idx} strategy={strategy} />;
            })}
            </div>
        </div>

    );
  };
  export default Pnl;
