const SET_CURFRIEND = 'friendlist/SET_CURFRIEND';

export const setCurFriend = payload => ({ type: SET_CURFRIEND, payload });

const initialState = {
  list: [
    '윤영훈',
    '김윤재',
    '김현지',
    // '백지윤',
  ],
  curFriend: {
    idx: 0,
    title: '김현지',
  },
};

export default function friendlist(state = initialState, action) {
  switch (action.type) {
    case SET_CURFRIEND:
      return {
        ...state,
        curFriend: {
          idx: action.payload.idx,
          title: action.payload.title,
        },
      };
    default:
      return state;
  }
}
