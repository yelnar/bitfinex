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
            {props.booksBids.map((book, key) =>
              <tr key={key}>
                <td>{book.count}</td>
                <td>{book.amount}</td>
                <td>{book.total}</td>
                <td>{book.price}</td>
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
            {props.booksAsks.map((book, key) =>
              <tr key={key}>
                <td>{book.price}</td>
                <td>{book.total}</td>
                <td>{book.amount}</td>
                <td>{book.count}</td>
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
  booksBids: PropTypes.array.isRequired,
  booksAsks: PropTypes.array.isRequired
};

export default BooksWidget;
