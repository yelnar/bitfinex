import _ from 'lodash';
import * as booksActions from "../actions/booksActions";
import * as tradesActions from "../actions/tradesActions";

let socket = null;
const wsHost = 'wss://api.bitfinex.com/ws/2';

const setSocketListeners = (socket, store) => {
  let receiveTradesSnapshot = false;
  let receiveBooksSnapshot = false;
  let tradesId = null;
  let booksId = null;
  const BOOKS = {
    bids: {},
    asks: {}
  };

  socket.onopen = () => {
    store.dispatch(booksActions.subscribeToBooksChannel());
    store.dispatch(tradesActions.subscribeToTradesChannel());
  };

  socket.onmessage = (m) => {
    try {
      let msg = JSON.parse(m.data);
      let msgId = msg[0];

      if (msg[1] === 'hb') return;

      if (receiveTradesSnapshot) {
        receiveTradesSnapshot = false;
        tradesId = msgId;
        store.dispatch(tradesActions.initTrades(msg[1]));
      }
      else if (receiveBooksSnapshot) {
        receiveBooksSnapshot = false;
        booksId = msgId;

        msg[1].forEach(b => {
          let book = {price: b[0], count: b[1], amount: b[2]};
          const side = book.amount >= 0 ? 'bids' : 'asks';
          book.amount = Math.abs(book.amount);
          BOOKS[side][book.price] = book;
        });

        sortAndDispatch(BOOKS, store, booksActions.initBooksBids(BOOKS.bids));
        sortAndDispatch(BOOKS, store, booksActions.initBooksAsks(BOOKS.asks));
      }
      else if (msg.event === 'subscribed') {
        if (msg.channel === 'trades') {
          receiveTradesSnapshot = true;
        }
        else if (msg.channel === 'book') {
          receiveBooksSnapshot = true;
        }
      }
      else if (msgId === tradesId) {
        store.dispatch(tradesActions.updateTrades(msg[2]));
      }
      else if (msgId === booksId) {
        let b = msg[1];
        let book = {price: b[0], count: b[1], amount: b[2]};
        if (book.count === 0) {
          if (book.amount > 0) {
            if (BOOKS['bids'][book.price]) {
              delete BOOKS['bids'][book.price];
              sortAndDispatch(BOOKS, store, booksActions.updateBooksBids(BOOKS.bids));
            }
          } else if (book.amount < 0) {
            if (BOOKS['asks'][book.price]) {
              delete BOOKS['asks'][book.price];
              sortAndDispatch(BOOKS, store, booksActions.updateBooksAsks(BOOKS.asks));
            }
          }
        } else {
          let side = book.amount >= 0 ? 'bids' : 'asks';
          book.amount = Math.abs(book.amount);
          BOOKS[side][book.price] = book;
          if (side === 'bids') {
            sortAndDispatch(BOOKS, store, booksActions.updateBooksBids(BOOKS.bids));
          } else {
            sortAndDispatch(BOOKS, store, booksActions.updateBooksAsks(BOOKS.asks));
          }
        }
      }

    } catch (e) {
      throw(e);
    }
  };
};

function sortAndDispatch(BOOK, store, action) {
  // _.each(['bids', 'asks'], function(side) {
  //   let sbook = BOOK[side];
  //   let bprices = Object.keys(sbook);
  //
  //   let prices = bprices.sort(function(a, b) {
  //     if (side === 'bids') {
  //       return +a >= +b ? -1 : 1
  //     } else {
  //       return +a <= +b ? -1 : 1
  //     }
  //   });
  //
  //   BOOK[side] = prices;
  // })
  store.dispatch(action);
}

function openWebsocket(store) {
  socket = new WebSocket(wsHost);
  setSocketListeners(socket, store);
}

function closeWebsocket() {
  if (socket !== null) {
    socket.close();
    socket = null;
  }
}

export {socket, openWebsocket, closeWebsocket};
