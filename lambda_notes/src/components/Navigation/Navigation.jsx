import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormInline, Fa } from 'mdbreact';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleUpdateNote, searchNote, searchNoteOff, sortNotesFront, sortNotesBack, logoutUser, } from '../../store/actions';

const Header = Styled.header`
    height: 100%;
    background-color: #d7d7d7;
    color: #4a494a
    border-right: 2px solid #c2c2c2;

    display: flex;
    flex-direction: column;
    padding: 1%;

    h1 {
        padding-top: 30px;
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 20px;
        margin-left: 10%;
        line-height: 40px;
    }

    h2 {
        font-size: 60px;
        font-weight: bold;
        margin-top: -30px;
        margin-bottom: 20px;
        margin-left: 10%;
    }

    h3 {
        font-size: 30px;
        font-weight: bold;
        margin-left: 5%;
    }

    button {
        width: 95%;
        background-color: #2ac0c4;
    }

    
`;

const Search = Styled.div`
    margin-left: 8%;
`

const Button = Styled.button`
    width: 80%;
    height: 60px;
    background-color: #2ac0c4;
    border: 1px solid #969696;
    color: white;
    border: none;
    margin-left: 2%;
    margin-bottom: 20px;
    cursor: pointer;
`;

const H3 = Styled.h3`
    font-size: 20px;
    margin-left: 1%;
`;

class Navigation extends Component {
    state = {
        inputValue: '',
    };
    

    handleSubmit = e => {
        if (e === '' || e === undefined || e.length <= 0) this.searchNoteOff;
        let updatedList = this.props.notes.filter(item => {
            return item.title.toLowerCase().search(e.toLowerCase()) !== -1;
        });
        this.props.searchNote(updatedList);
    };

    handleChange = e => {
        this.setState({ inputValue: e.target.value}, () => this.handleSubmit(this.state.inputValue));
    }

    sortList = (e, sorting) => {
        e.preventDefault();
        switch(sorting) {
            case 'front':
                return this.props.sortNotesFront(this.props.notes);
            case 'back':
                return this.props.sortNotesBack(this.props.notes);
            default:
                return this.props.sortNotesFront(this.props.notes);
        }
      }

      handleLogout = e => {
          this.props.toggleUpdateNote
          if(localStorage.getItem('jwt')) {
              localStorage.removeItem('jwt');
              this.props.logoutUser;
              this.forceUpdate();
          } else {
          }
      }

    render() {
        let isLogged = false;
        if(localStorage.getItem('jwt')) {
            isLogged = true;
        } else {
            isLogged = false;
        }

        return (
            <Header>
                <h1>Lambda</h1>
                <h2>Notes</h2>
                <div>
                    {isLogged ? <H3>Welcome {this.props.username}</H3> : null}
                </div>
                <Search>
                <FormInline className="md-form active-cyan active-cyan-2 ">
                    <Fa icon="search" />
                    <input value={this.state.inputValue} onChange={e => this.handleChange(e)}  className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
                </FormInline>
                </Search>
                <div>
                    {!isLogged ? <NavLink to="/login"><Button type="button" onClick={this.props.toggleUpdateNote}>Login</Button></NavLink> : <NavLink to="/"><Button type="button" onClick={this.handleLogout}>Logout</Button></NavLink>}
                </div>
                {/*<NavLink to="/login"><Button type="button" onClick={this.props.toggleUpdateNote}>Login</Button></NavLink>*/}
                {/*<NavLink to="/"><Button type="button" onClick={this.handleLogout}>Logout</Button></NavLink>*/}
                { isLogged ? <NavLink to="/"><Button type="button" onClick={this.props.toggleUpdateNote}>View Your Notes</Button></NavLink> : null }

                { isLogged ? <NavLink to="/form"><Button type="button" onClick={this.props.toggleUpdateNote}>+ Create A New Note</Button></NavLink> : null}
                { isLogged ? <br /> : null}
                { isLogged ? <h3>Sort Notes</h3> : null}
                { isLogged ? <NavLink to="/" ><Button type="button" onClick={event => this.sortList(event, 'front')}>A-Z</Button></NavLink> : null }
                { isLogged ? <Button type="button" onClick={event => this.sortList(event, 'back')}>Z-A</Button> : null }
            </Header>
        )
    }
}

// export default Navigation;

const mapStateToProps = state => ({
  notes: state.notes,
    isLoggedIn: state.isLoggingIn,
    username: state.username
});

export default connect(mapStateToProps, { toggleUpdateNote, searchNote, searchNoteOff, sortNotesFront, sortNotesBack })(Navigation)