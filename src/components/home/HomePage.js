import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/mainActions';
import BooksWidget from '../widgets/BooksWidget';
import TradesWidget from "../widgets/TradesWidget";

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { trades, booksBids, booksAsks } = this.props;

    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={this.props.closeConnection}>Close Connection</button>
        <button onClick={this.props.reConnect}>Reconnect</button>
        <BooksWidget booksBids={booksBids} booksAsks={booksAsks} />
        <TradesWidget trades={trades}/>
      </div>
    );
  }
}

HomePage.propTypes = {
  trades: PropTypes.array.isRequired,
  booksBids: PropTypes.object.isRequired,
  booksAsks: PropTypes.object.isRequired,
  closeConnection: PropTypes.func.isRequired,
  reConnect: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    trades: state.trades,
    booksBids: state.booksBids,
    booksAsks: state.booksAsks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeConnection: () => dispatch(actions.closeConnection()),
    reConnect: () => dispatch(actions.reConnect())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
