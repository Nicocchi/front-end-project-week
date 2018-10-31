import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Register from "../components/Authentication/Register";
import { loginUser } from '../store/actions';

class RegisterView extends Component {
    state = {
        user: {
            email: '',
            username: '',
            password: '',
        },
        isUpdating: false,
    };

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        });
    }

    userRegister = e => {
        // this.props.loginUser(this.state.user);
        const endpoint = 'http://localhost:8000/api/users/register';
        console.log(this.state.user);

        axios.post(endpoint, this.state.user).then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.props.loginUser();
            this.props.history.push('/');
        }).catch(err => {
            console.log('LOGIN ERROR', err);
        });
    }

    render() {
        return (
            <Register
                {...this.props}
                user={this.state.user}
                handleChange={this.handleChange}
                userRegister={this.userRegister}
            />
        );
    };
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { loginUser })(RegisterView);