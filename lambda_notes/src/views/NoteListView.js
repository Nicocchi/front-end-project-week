import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNewNote } from '../store/actions';

import NoteContainer from '../components/NoteComponents/NoteContainer';

class NoteListView extends Component {
    componentDidMount() {
        if(localStorage.getItem('jwt')) {
            this.props.getNotes(this.props.userId);
        } else {
        }
    }

    copyNote = note => {
        const newNote = {
            user_id: note.user_id,
            title: note.title,
            content: note.content,
            completed: note.completed,
            is_public: note.is_public,
            tags: note.tags,
        };

        this.props.addNewNote(newNote);
        this.props.history.push('/');
    }

    render() {
        return (
            <NoteContainer
              notes={this.props.filtered ? this.props.filteredNotes : this.props.notes} copyNote={this.copyNote} isLoggedIn={this.props.isLoggedIn} isLoggingIn={this.props.isLoggingIn}/>
        );
    }
};

const mapStateToProps = state => ({
    notes: state.notes,
    filtered: state.filtered,
    filteredNotes: state.filteredNotes,
    isLoggingIn: state.isLoggingIn,
    isLoggedIn: state.isLoggedIn,
    userId: state.userId,
});

export default connect(mapStateToProps, { getNotes, addNewNote })(NoteListView);