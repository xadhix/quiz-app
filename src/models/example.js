
export default {

  namespace: 'example',

  state: {
    questions: [
      {
        "id" : 1,
        "questionText" : "Which of the following is not JavaScript unit testing frameworks",
        "options" : {
          "a" : "jasmine",
          "b" : "Mocha",
          "c" : "AVA",
          "d" : "None of the above"
        },
        "answer" : 3
      },
      {
        "id" : 2,
        "questionText" : "In the context of unit testing, a 'unit' is",
        "options" : {
          "a" : "A set of functions",
          "b" : "A function",
          "c" : "A class",
          "d" : "A plugin"
        },
        "answer" : 1
      }
    ]
  },


  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
