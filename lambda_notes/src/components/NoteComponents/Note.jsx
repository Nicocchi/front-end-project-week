import React from 'react';
import Styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import './Note.css';

const Container = Styled.div`
    padding: 1%;
    margin: 1%;
    width: 20%;
    height: 300px;
    overflow: hidden;
    border: 1px solid #a5a5a5;
    background-color: #ffffff;
    text-overflow: ellipsis;

    h5:hover {
        color: #3f51b5;
    }
`;

const Header = Styled.header`
    border-bottom: 2px solid #b0b0b0;
    font-weight: bold;
    color: black;
    width: 100%;
    
    h1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Tags = Styled.div`
    color: blue;
    width: 100%;
    height: 30px;
    padding: 1%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Content = Styled.div`
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 70%;
    white-space: pre-line;
`;

function Note(props) {
    let tags = props.note.tags;
    let tags2;
    if(!tags || tags === null) {
        tags2 = []
    } else {
        tags2 = tags;
    }
    return (
        <Container>
             <NavLink to={`/notes/${props.note.id}`} >
                 <Header><h1>{props.note.title}</h1></Header>
                 <Tags>{tags2}</Tags>
                 <Content className="block-with-text">{props.note.content}</Content>
             </NavLink>
         </Container>

        
    );
};

export default Note;