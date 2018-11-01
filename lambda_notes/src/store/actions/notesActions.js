import axios from 'axios';

export const NOTES_FETCH_START = 'NOTES_FETCH_START';
export const NOTES_FETCH_COMPLETE = 'NOTES_FETCH_COMPLETE';
export const NOTES_FETCH_FAILURE = 'NOTES_FETCH_FAILURE';

export const ADD_NOTE_START = 'ADD_NOTE_START';
export const ADD_NOTE_COMPLETE = 'ADD_NOTE_COMPLETE';
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE';

export const DELETE_NOTE_START = 'DELETE_NOTE_START';
export const DELETE_NOTE_COMPLETE = 'DELETE_NOTE_COMPLETE';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';

export const UPDATE_NOTE_START = 'UPDATE_NOTE_START';
export const UPDATE_NOTE_COMPLETE = 'UPDATE_NOTE_COMPLETE';
export const UPDATE_NOTE_FAILURE = 'UPDATE_NOTE_FAILURE';

export const SET_UPDATE_NOTE = 'SET_UPDATE_NOTE';
export const TOGGLE_UPDATE_NOTE = 'TOGGLE_UPDATE_NOTE';
export const SEARCH_NOTE = 'SEARCH_NOTE';
export const SEARCH_NOTE_OFF = 'SEARCH_NOTE_OFF';

export const SORT_NOTES_FRONT = 'SORT_NOTES_FRONT';
export const SORT_NOTES_BACK = 'SORT_NOTES_BACK';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_COMPLETE = 'LOGIN_USER_COMPLETE';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_COMPLETE = 'REGISTER_USER_COMPLETE';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const SET_ID_START = 'SET_ID_START';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const PAGE_NOTES = 'PAGE_NOTES';

let globalID = 0;

export const getNotes = (id) => dispatch => {
    dispatch({ type: NOTES_FETCH_START });
    globalID = id;
    const token = localStorage.getItem("jwt");
    console.log('getID',id);
    const endpoint = `http://localhost:8000/api/notes/get/all/${id}`;
    const options = {
        headers: {
            Authorization: token
        }
    };

    
    axios.get(endpoint, options)
        .then(response => {
            dispatch({ type: NOTES_FETCH_COMPLETE, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: NOTES_FETCH_FAILURE, payload: err });
        });
};

export const addNewNote = note => dispatch => {
    dispatch({ type: ADD_NOTE_START });
    const token = localStorage.getItem("jwt");
    const endpoint = 'http://localhost:8000/api/note/create';
    const options = {
        headers: {
            Authorization: token
        }
    };

    axios.post(endpoint, note, options)
        .then(() => getNotes(note.user_id)(dispatch))
        .then(() => {
            dispatch({ type: ADD_NOTE_COMPLETE });
        })
        .catch(err => {
            console.log('ADD ERROR',err);
            dispatch({ type: ADD_NOTE_FAILURE, payload: err });
        })
};

export const deleteNote = id => dispatch => {
    dispatch({ type: DELETE_NOTE_START });
    const token = localStorage.getItem("jwt");
    const endpoint = `http://localhost:8000/api/note/remove/${id}`;
    const options = {
        headers: {
            Authorization: token
        }
    };

    axios.delete(endpoint, options)
        .then(() => getNotes(globalID)(dispatch))
        .then(() => {
            dispatch({ type: DELETE_NOTE_COMPLETE });
        })
        .catch( err => {
            dispatch({ type: DELETE_NOTE_FAILURE, payload: err });
        });
};

export const setUpdateNote = id => dispatch => {
    dispatch({ type: SET_UPDATE_NOTE, payload: id });
};

export const updateNote = note => dispatch => {
    dispatch({ type: UPDATE_NOTE_START });
    const token = localStorage.getItem("jwt");
    const options = {
        headers: {
            Authorization: token
        }
    };

    const nNote = {
        id: note.id,
        user_id: note.user_id,
        tags: note.tags,
        title: note.title,
        content : note.content,
    };

    const endpoint = `http://localhost:8000/api/note/edit/${nNote.id}`;
    axios.put(endpoint, nNote, options)
        .then(() => getNotes(note.user_id)(dispatch))
        .then(() => {
            dispatch({ type: UPDATE_NOTE_COMPLETE });
        })
        .catch(err => {
            dispatch({ type: UPDATE_NOTE_FAILURE, payload: err });
        });
};

export const toggleUpdateNote = () => dispatch => {
    dispatch({ type: TOGGLE_UPDATE_NOTE });
};

export const searchNote = note => dispatch => {
    dispatch({ type: SEARCH_NOTE, payload: note });
};

export const searchNoteOff = () => dispatch => {
    dispatch({ type: SEARCH_NOTE_OFF });
};

export const sortNotesFront = notes => dispatch => {

    const noteList = notes.sort((a,b) => {return a.title.toLowerCase().localeCompare(b.title.toLowerCase());});
    return dispatch({ type: SORT_NOTES_FRONT, payload: noteList});
}

export const sortNotesBack = notes => dispatch => {

    const noteList = notes.sort((a,b) => {return a.title.toLowerCase().localeCompare(b.title.toLowerCase());}).reverse();
    return dispatch({ type: SORT_NOTES_BACK, payload: noteList});
}

export const loginUser = user => dispatch => {
    dispatch({ type: LOGIN_USER_START });

    const endpoint = 'http://localhost:8000/api/users/login';
    let id = 0;
    axios.post(endpoint, user)
        .then(res => {
            id = res.data.userId;
            dispatch({ type: LOGIN_USER_COMPLETE, payload: res.data });
    })
        .then(() => setId(id)(dispatch))
        .then(() => getNotes(id)(dispatch))
        .catch(err => {
        dispatch({ type: LOGIN_USER_FAILURE, payload: err.response.data.error });
    });

}

export const logoutUser = () => dispatch => {
    dispatch({ type: LOGOUT_USER });

}

export const registerUser = user => dispatch => {
    dispatch({ type: REGISTER_USER_START });

    const endpoint = 'http://localhost:8000/api/users/register';
    let id = 0;
    axios.post(endpoint, user)
        .then(res => {
            id = res.data.newUserId;
            dispatch({ type: REGISTER_USER_COMPLETE, payload: res.data });
        })
        .then(() => setId(id)(dispatch))
        .then(() => getNotes(id)(dispatch))
        .catch(err => {
            dispatch({ type: REGISTER_USER_FAILURE, payload: err.response.data.error });
        });

}

export const setId = (id) => dispatch => {
    dispatch({ type: SET_ID_START, payload: id})
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR });
}

export const pageNotes = pageOfItems => dispatch => {
    dispatch({ type: PAGE_NOTES, payload: pageOfItems })
}