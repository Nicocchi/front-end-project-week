import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNewNote, pageNotes } from '../store/actions';

import NoteContainer from '../components/NoteComponents/NoteContainer';
import Pagination from '../components/Pagination/Pagination';
import Note from "../components/NoteComponents/Note";
import Styled from "styled-components";

const Container = Styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #f3f3f3;

`;

const PageDiv = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class NoteListView extends Component {
    state = {
        notes: [],
        pageOfItems: []
    };

    componentDidMount() {
        if(localStorage.getItem('jwt')) {
            this.props.getNotes(this.props.userId);
            this.setState({ notes: this.props.notes});

        } else {
        }
    }

    onChangePage = pageOfItems => {
        this.setState({ pageOfItems: pageOfItems });
        this.props.pageNotes(pageOfItems);
        // this.props.getNotes(this.props.userId);
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
            <div>
                {/*<NoteContainer notes={this.props.filtered ? this.props.filteredNotes : this.props.notes} copyNote={this.copyNote} isLoggedIn={this.props.isLoggedIn} isLoggingIn={this.props.isLoggingIn}/>*/}
                <Container>
                    {this.props.pageOfItems.map(item =>
                            <Note key={item.id} note={item} copyNote={this.copyNote} />
                    )}
                </Container>
                <PageDiv>
                    <Pagination items={this.state.notes} onChangePage={this.onChangePage} />
                </PageDiv>
            </div>
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
    pageOfItems: state.pageOfItems,
});

export default connect(mapStateToProps, { getNotes, addNewNote, pageNotes })(NoteListView);