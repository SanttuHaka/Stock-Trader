import stocks from '../../data/stocks';
import time from '../../data/time';

const state = {
  lucky_number: Math.round(Math.random() * (12 - 1) + 1),
  cycle_date: 1,
  cycle_length: Math.round(Math.random() * (21 - 3) + 3),
  cycle_type: (Math.random() * ((0.1) - (0.01)) + 0.01),
  time: [],
  stocks: []
};

const mutations = {
  'SET_TIME' (state, time) {
    state.time = time;
  },
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks;
  },
  'SET_CYCLE' (state) {
    if (state.cycle_date == state.cycle_length) {
      state.cycle_date = 1;
      state.cycle_length = Math.round(Math.random() * (21 - 3) + 3);
      state.lucky_number = Math.round(Math.random() * (12 - 1) + 1);
      if (state.cycle_type > 0) {
        state.cycle_type = (Math.random() * ((-0.01) - (-0.2)) + (-0.2));
      } else {
        state.cycle_type = (Math.random() * ((0.2) - (0.01)) + 0.01);
      }
    } else {
      state.cycle_date++;
    };
  },
  'RND_STOCKS' (state) {
    state.time.forEach(time => {
      if (time.quartal == 4) {
        time.year++;
        time.quartal = 1;
      } else {
        time.quartal++;
      };
    });
    state.stocks.forEach(stock => { 
      if (stock.price < 1) {
        stock.news = 'KONKURSSI';
      } else if (stock.luck == state.lucky_number) {
        stock.price = Math.round(stock.price * (1 + (Math.random() * ((-0.1) - (-0.8)) + (-0.8))));
        stock.news = 'Huonoja uutisia :(';
      } else if (stock.price < 10) {
        stock.price = Math.round(stock.price * (2 + (Math.random() * ((0.1) - (0.05)) + 0.05) + state.cycle_type));
        stock.news = 'Hyviä uutisia :)';
      } else if (stock.price > 1000) {
        stock.price = Math.round(stock.price * (1 + (Math.random() * ((0.08) - (0.03)) + 0.03) + state.cycle_type));
        stock.news = 'Hyviä uutisia :)';
      } else if (stock.price > 10000) {
        stock.price = Math.round(stock.price * (1 + (Math.random() * ((0.01) - (0.005)) + 0.005) + state.cycle_type));
        stock.news = 'Hyviä uutisia :)';
      } else if (stock.price > 100000) {
        stock.price = Math.round(stock.price * (1 + (Math.random() * ((0.001) - (0.0005)) + 0.0005) + state.cycle_type));
        stock.news = 'Hyviä uutisia :)';
      } else if (stock.price > 1000000) {
        stock.price = Math.round(stock.price * (1 + (Math.random() * ((0.000001) - (0.0000005)) + 0.0000005) + (state.cycle_type - 0.2)));
        stock.news = 'Hyviä uutisia :)';
      } else {
        stock.price = Math.round(stock.price * (1 + (Math.random() * ((0.1) - (0.05)) + 0.05) + state.cycle_type));
        stock.news = 'Hyviä uutisia :)';
      };
    });
  }
};

const actions = {
  buyStock: ({commit}, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({commit}) => {
    commit('SET_STOCKS', stocks)
  },
  initTime: ({commit}) => {
    commit('SET_TIME', time)
  },
  randomizeStocks: ({commit}) => {
    commit('RND_STOCKS');
  },
  cycleNext: ({commit}) => {
    commit('SET_CYCLE');
  }
};

const getters = {
  stocks: state => {
    return state.stocks;
  },
  time: state => {
    return state.time;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}