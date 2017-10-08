import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/widgetsActions';
import OrderBooksWidget from '../widgets/OrderBooksWidget';
import TradeHistoryWidget from "../widgets/TradeHistoryWidget";

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { trades, books } = this.props;

    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={this.props.closeConnection}>Close Connection</button>
        <button onClick={this.props.reConnect}>Reconnect</button>
        <OrderBooksWidget books={books} />
        <TradeHistoryWidget trades={trades}/>
      </div>
    );
  }
}

HomePage.propTypes = {
  trades: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  closeConnection: PropTypes.func.isRequired,
  reConnect: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    trades: state.trades,
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeConnection: () => dispatch(actions.closeConnection()),
    reConnect: () => dispatch(actions.reConnect())

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
