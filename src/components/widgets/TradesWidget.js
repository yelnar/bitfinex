import React, { PropTypes } from 'react';
import moment from 'moment';

const TradesWidget = (props) => {
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
          {props.trades.map((trade, i) =>
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

TradesWidget.propTypes = {
  trades: PropTypes.array.isRequired
};

export default TradesWidget;
