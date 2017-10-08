import React, { PropTypes } from 'react';

const OrderBooksWidget = (books) => {
  return (
    <div>
      <h1>Order Books Widget</h1>
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
        {books.books.map((book, i) =>
          <tr key={i}>
            <td>{book[0]}</td>
            <td>{book[1]}</td>
            <td>{book[2]}</td>
            <td></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

OrderBooksWidget.propTypes = {
  books: PropTypes.array.isRequired
};

export default OrderBooksWidget;
