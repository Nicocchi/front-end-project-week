import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Login from "../components/Authentication/Login";
import { loginUser } from '../store/actions';

class LoginView extends Component {
    state = {
        user: {
            email: '',
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

    userLogin = e => {
        // this.props.loginUser(this.state.user);
        const endpoint = 'http://localhost:8000/api/users/login';
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
            <Login
                {...this.props}
                user={this.state.user}
                handleChange={this.handleChange}
                loginUser={this.userLogin}
            />
        );
    };
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { loginUser })(LoginView);