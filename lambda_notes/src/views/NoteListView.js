import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNotes } from '../store/actions';

import NoteContainer from '../components/NoteComponents/NoteContainer';

class NoteListView extends Component {
    componentDidMount() {
        if(localStorage.getItem('jwt')) {
            this.props.getNotes();
        } else {
        }
    }

    render() {
        return (
            <NoteContainer
              notes={this.props.filtered ? this.props.filteredNotes : this.props.notes} isLoggedIn={this.props.isLoggedIn} isLoggingIn={this.props.isLoggingIn}/>
        );
    }
};

const mapStateToProps = state => ({
    notes: state.notes,
    filtered: state.filtered,
    filteredNotes: state.filteredNotes,
    isLoggingIn: state.isLoggingIn,
    isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, { getNotes })(NoteListView);