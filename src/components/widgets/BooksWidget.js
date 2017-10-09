import React, { PropTypes } from 'react';

const BooksWidget = (props) => {
  return (
    <div>
      <h1>Order Books Widget</h1>
      <div className="row">
        <div className="col-md-6">
          <table className="table">
            <thead>
            <tr>
              <th>COUNT</th>
              <th>AMOUNT</th>
              <th>TOTAL</th>
              <th>PRICE</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(props.booksBids).map(key =>
              <tr key={key}>
                <td>{props.booksBids[key].count}</td>
                <td>{props.booksBids[key].amount}</td>
                <td>{props.booksBids[key].amount}</td>
                <td>{props.booksBids[key].price}</td>
              </tr>)
            }
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table">
            <thead>
            <tr>
              <th>PRICE</th>
              <th>TOTAL</th>
              <th>AMOUNT</th>
              <th>COUNT</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(props.booksAsks).map(key =>
              <tr key={key}>
                <td>{props.booksAsks[key].price}</td>
                <td>{props.booksAsks[key].amount}</td>
                <td>{props.booksAsks[key].amount}</td>
                <td>{props.booksAsks[key].count}</td>
              </tr>)
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

BooksWidget.propTypes = {
  booksBids: PropTypes.object.isRequired,
  booksAsks: PropTypes.object.isRequired
};

export default BooksWidget;
