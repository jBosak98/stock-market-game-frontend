import React from 'react';
import './StockSection.scss';
import Typography from '@material-ui/core/Typography';
import useStock from '../hooks/useStock';

function StockSection() {
  const stockData = useStock();
  const stockTotalCount = stockData.data?.companiesConnection.totalCount;
  console.log(stockTotalCount);
  return (
    <div className="StockSection">
      <Typography component="h1" variant="h5" color="textPrimary">
        StockSection
        {stockTotalCount}
      </Typography>
    </div>
  );
}

export default StockSection;
