import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);
const firebaseDatabase = firebase.database();

export default {

  namespace: 'quiz',

  state: {
    userId: 'testUser2',
    userName: 'Test User',
    quizId: 'testQuiz',
    quiz_loading: true,
    quiz_submitting: false,
    quiz_result: false,
    leaderboard: {},
    questions: []
  },


  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetch_quiz' })
      const leaderBoardRef = firebaseDatabase.ref(`leaderboard`);
      leaderBoardRef.on('value', function(snapshot) {
        dispatch({ type: 'set_leaderboard', payload: snapshot.val()})
      });
    },
  },

  effects: {
    *fetch_quiz({ payload }, { call, put }) {  // eslint-disable-line
      const quizIdRef = firebaseDatabase.ref('current_quiz');
      const quizId = yield call( ()=>new Promise((resolve,  reject)=>{
        quizIdRef.once('value', function(snapshot) {
          resolve(snapshot.val());
        });
      }));

      const questionsRef = firebaseDatabase.ref(`${quizId}/questions`);
      const questions = yield call( ()=>new Promise((resolve,  reject)=>{
        questionsRef.once('value', function(snapshot) {
          resolve(snapshot.val());
        });
      }));
      yield put({ type: 'set_quiz', payload: { quizId: quizId, questions } });
    },
    *submit_quiz({ payload },{ call,put, select }){
      const quiz_response = yield select((state)=>{
        return {
          questions: state.quiz.questions,
          userId: state.quiz.userId,
          userName: state.quiz.userName,
          quizId: state.quiz.quizId
        }
      });
      console.log('Quiz Response ', quiz_response );
      yield put({ type: 'set_quiz_submitting'});

      const result = yield call(()=>new Promise((resolve, reject)=>{
        const updates = {};
        updates[`/quiz_responses/${quiz_response.userId}/${quiz_response.quizId}`] = quiz_response;
        firebase.database().ref().update(updates).then(resolve).catch(reject);
      }));
      yield put({ type: 'set_result', payload: { quiz_result : 'Quiz submitted successfully' } });
    },
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
    },
    set_leaderboard(state, action){
      return { ...state, leaderboard: action.payload };
    }
  },

};
