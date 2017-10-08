import React, { PropTypes } from 'react';
import moment from 'moment';

const TradeHistoryWidget = (trades) => {
  return (
    <div>
      <h1>Trade History Widget</h1>
      <table className="table">
        <thead>
          <tr>
            <th>TIME</th>
            <th>PRICE</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {trades.trades.map((trade, i) =>
            <tr key={i}>
              <td>{moment(trade[1]).format("HH:mm:ss")}</td>
              <td>{trade[3]}</td>
              <td>{trade[2]}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

TradeHistoryWidget.propTypes = {
  trades: PropTypes.array.isRequired
};

export default TradeHistoryWidget;
