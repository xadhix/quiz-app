import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);
const firebaseDatabase = firebase.database();

export default {

  namespace: 'quiz',

  state: {
    quiz_loading: true,
    quiz_submitting: false,
    quiz_result: false,
    questions: []
  },


  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetch_quiz' })
    },
  },

  effects: {
    *fetch_quiz({ payload }, { call, put }) {  // eslint-disable-line
      const questionsRef = firebaseDatabase.ref('questions');
      const questions = yield call( ()=>new Promise((resolve,  reject)=>{
        questionsRef.once('value', function(snapshot) {
          resolve(snapshot.val());
        });
      }));
      yield put({ type: 'set_quiz', payload: { questions } });
    },
    *submit_quiz({ payload },{ call,put }){

      yield put({ type: 'set_quiz_submitting'});

      const result = yield call(()=>new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve("Passed")
        }, 1000)
      }));

      yield put({ type: 'set_result', payload: { quiz_result : result } });
    }
  },

  reducers: {
    save_answer(state, action) {
      const questions = state.questions.map((question=>{
        if(question.id === action.payload.questionId ){
          question.answer = action.payload.answer;
        }
        return question;
      }))
      return { ...state, questions };
    },
    set_quiz(state, action){
      return { ...state, quiz_loading: false, ...action.payload};
    },
    set_quiz_submitting(state, action){
      return { ...state, quiz_submitting: true };
    },
    set_result(state, action){
      return { ...state, quiz_submitting: false, ...action.payload };
    },
    set_quiz_loading(state, action){
      return { ...state, quiz_loading: true,};
    }
  },

};
