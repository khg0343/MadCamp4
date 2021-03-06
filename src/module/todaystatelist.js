const SET_CURTODAYSTATE = 'todaystatelist/SET_CURTODAYSTATE';

export const setCurTodayState = payload => ({ type: SET_CURTODAYSTATE, payload });

const initialState = {
  list: [
    'π·νλ³΅', 'π΅μ¦κ±°μ', 'πμ€λ ', 'βοΈμ¬μ¬',
    'πμΈλ‘μ', 'βκ·Έλ₯', 'β°λ°μ¨', 'π€νΌκ³€',
    'π©Ήμν', 'π§μ¬ν', 'π§οΈμ°μΈ', 'π¨οΈν©λΉ',
    'β‘μ§μ¦', 'π₯μ΄λ°μ', 'β£οΈμ¬λν΄', 'β­μμΈ',
    'πκΈ°μ¨', 'π©ν©ν', 'πλΏλ―', 'βοΈκ°μ΄',
    'βνμ΄ν', 'β οΈνλ¦', 'π λ΅λ΅', 'π§ΉμΈμΈ',
  ],
  curTodayState: {
    title: 'π·νλ³΅',
  },
};



export default function todaystatelist(state = initialState, action) {
  switch (action.type) {
    case SET_CURTODAYSTATE:
      return {
        ...state,
        curTodayState: {
          title: action.payload.title,
        },
      };
    default:
      return state;
  }
}
