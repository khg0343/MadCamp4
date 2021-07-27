const SET_CURTODAYSTATE = 'todaystatelist/SET_CURTODAYSTATE';

export const setCurTodayState = payload => ({ type: SET_CURTODAYSTATE, payload });

const initialState = {
  list: [
    '🌷행복', '🎵즐거움', '💓설렘', '☁️심심',
    '🍂외로움', '❔그냥', '⏰바쁨', '💤피곤',
    '🩹아픔', '💧슬픔', '🌧️우울', '🗨️황당',
    '⚡짜증', '🔥열받음', '❣️사랑해', '⭐앗싸',
    '🍎기쁨', '🍩황홀', '🍀뿌듯', '☀️개운',
    '❕파이팅', '☠️힘듦', '🍠답답', '🧹쓸쓸',
  ],
  curTodayState: {
    idx: 0,
    title: '🌷행복',
  },
};



export default function todaystatelist(state = initialState, action) {
  switch (action.type) {
    case SET_CURTODAYSTATE:
      return {
        ...state,
        curTodayState: {
          idx: action.payload.idx,
          title: action.payload.title,
        },
      };
    default:
      return state;
  }
}
