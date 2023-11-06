const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem('currentUser'))?.user._id,
  title: '',
  cat: '',
  cover: '',
  images: [],
  desc: '',
  shortTitle: '',
  shortDesc: '',
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

const GigReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ADD_IMAGES':
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case 'ADD_FEATURES':
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case 'REMOVE_FEATURES':
      return {
        ...state,
        features: state.features.filter((f) => f !== action.payload),
      };
    default:
      return state;
  }
};

export { INITIAL_STATE, GigReducer };
