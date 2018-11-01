import {
    NOTES_FETCH_START,
    NOTES_FETCH_COMPLETE,
    NOTES_FETCH_FAILURE,
    ADD_NOTE_START,
    ADD_NOTE_COMPLETE,
    ADD_NOTE_FAILURE,
    DELETE_NOTE_START,
    DELETE_NOTE_COMPLETE,
    DELETE_NOTE_FAILURE,
    SET_UPDATE_NOTE,
    TOGGLE_UPDATE_NOTE,
    UPDATE_NOTE_START,
    UPDATE_NOTE_COMPLETE,
    UPDATE_NOTE_FAILURE,
    SEARCH_NOTE,
    SEARCH_NOTE_OFF,
    SORT_NOTES_FRONT,
    SORT_NOTES_BACK,
    LOGIN_USER_START,
    LOGIN_USER_COMPLETE,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_START,
    LOGOUT_USER_COMPLETE,
    LOGOUT_USER_FAILURE,
    REGISTER_USER_START,
    REGISTER_USER_COMPLETE,
    REGISTER_USER_FAILURE,
    SET_ID_START,
    CLEAR_ERROR,
} from '../actions';

const initialState = {
    addingNote: false,
    notes: [],
    isLoading: false,
    isDeleting: false,
    isUpdating: false,
    error: '',
    noteToUpdate: null,
    filtered: false,
    filteredNotes: null,
    sorted: false,
    sort: null,
    isLoggingIn: false,
    isLoggedIn: false,
    userId: null,
    username: '',
};

export const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        case NOTES_FETCH_START:
            return { ...state, isLoading: true };
        case NOTES_FETCH_COMPLETE:
            const noteList = action.payload.sort((a,b) => {return a.title.toLowerCase().localeCompare(b.title.toLowerCase());});
            
            if (state.sorted) {
                if (state.sort === 'front') {
                    return { ...state, isLoading: false, notes: noteList };
                } else if (state.sort === 'back') {
                    return { ...state, isLoading: false, notes: noteList.reverse() };
                } else {
                    return { ...state, isLoading: false, notes: action.payload };
                }
            } else {
                return { ...state, isLoading: false, notes: action.payload };
            }
        case NOTES_FETCH_FAILURE:
            console.log(action.payload);
            return { ...state, isLoading: false, error: action.payload };
        case ADD_NOTE_START:
            return { ...state, filtered: false, addingNote: true };
        case ADD_NOTE_COMPLETE:
            return { ...state, addingNote: false };
        case ADD_NOTE_FAILURE:
            return { ...state, addingNote: false, error: action.payload };
        case DELETE_NOTE_START:
            return { ...state, filtered: false, isDeleting: true };
        case DELETE_NOTE_COMPLETE:
            return { ...state, isDeleting: false };
        case DELETE_NOTE_FAILURE:
            console.log('DELETE_NOTE_FAILURE' ,action.payload);
            return { ...state, isDeleteing: false, error: action.payload };
        case SET_UPDATE_NOTE:
            const note = state.notes.map(note => note).filter(note => note.id === action.payload);
            return { ...state, filtered: false, isUpdating: true, noteToUpdate: note};
        case TOGGLE_UPDATE_NOTE:
            return { ...state, filtered: false, isUpdating: false };
        case UPDATE_NOTE_START:
            return { ...state, isUpdating: true };
        case UPDATE_NOTE_COMPLETE:
            return { ...state, isUpdating: false };
        case UPDATE_NOTE_FAILURE:
            console.log('UPDATE_NOTE_FAILURE' ,action.payload);
            return { ...state, isUpdating: false, error: action.payload };
        case SEARCH_NOTE:
            return { ...state, filtered: true, filteredNotes: action.payload };
        case SEARCH_NOTE_OFF:
            return { ...state, filtered: false }
        case SORT_NOTES_FRONT:
            return { ...state, sorted: true, sort: 'front', notes: action.payload }
        case SORT_NOTES_BACK:
            return { ...state, sorted: true, sort: 'back', notes: action.payload }
        case LOGIN_USER_START:
            return { ...state, isLoggingIn: true }
        case LOGIN_USER_COMPLETE:
            localStorage.setItem('jwt', action.payload.token);
            return { ...state, isLoggingIn: false, isLoggedIn: true, username: action.payload.username };
        case LOGIN_USER_FAILURE:
            if(localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            };
            return { ...state, isLoggingIn: false, isLoggedIn: false, userId: null, error: action.payload };
        case LOGOUT_USER_START:
            return { ...state, isLoggingIn: false, isLoggedIn: false, userId: null  }
        case LOGOUT_USER_COMPLETE:
            return { ...state, isLoggingIn: false, isLoggedIn: false};
        case LOGOUT_USER_FAILURE:
            if(localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            };
            return { ...state, isLoggingIn: false, isLoggedIn: false };
        case REGISTER_USER_START:
            return { ...state }
        case REGISTER_USER_COMPLETE:
            localStorage.setItem('jwt', action.payload.token);
            return { ...state, isLoggingIn: false, isLoggedIn: true, username: action.payload.username };
        case REGISTER_USER_FAILURE:
            if(localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            };
            return { ...state, error: action.payload };
        case SET_ID_START:
            return { ...state, userId: action.payload };
        case CLEAR_ERROR:
            return { ...state, error: ''}
        default:
            return state;
    }
};