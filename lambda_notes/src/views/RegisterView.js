import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Register from "../components/Authentication/Register";
import { loginUser, setId } from '../store/actions';

class RegisterView extends Component {
    state = {
        user: {
            email: '',
            username: '',
            password: '',
            password2: '',
        },
        isUpdating: false,
        error: '',
    };

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        }, () => {
            if(this.state.user.password !== this.state.user.password2) {
                this.setState({ error: 'Passwords do not match'})
            } else if (this.state.user.password.length <= 7 || this.state.user.password2.length <= 7) {
                this.setState({ error: 'Passwords must be at least 8 characters'})
            } else if(!this.validateEmail(this.state.user.email)) {
                this.setState({error: 'Invalid email address.'});
            } else {
                this.setState({
                    error: ''
                });
            }
        });
    }

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    userRegister = e => {
        if(!this.validateEmail(this.state.user.email)) {
            this.setState({error: 'Invalid email address.'});
            return;
        }
        if (this.state.user.password.length <= 7 || this.state.user.password2.length <= 7) {
            this.setState({ error: 'Passwords must be at least 8 characters'})
            return;
        }

        const endpoint = 'http://localhost:8000/api/users/register';
        const newUser = {
            email: this.state.user.email.toLowerCase(),
            username: this.state.user.username,
            password: this.state.user.password,
        }

        axios.post(endpoint, newUser).then(res => {
            this.setState({
                error: ''
            });
            localStorage.setItem('jwt', res.data.token);
            this.props.setId(res.data.newUserId);
            this.props.loginUser(res.data.username);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({
                error: err.response.data.error
            });
        });
    };

    render() {
        return (
            <Register
                {...this.props}
                user={this.state.user}
                error={this.state.error}
                handleChange={this.handleChange}
                userRegister={this.userRegister}
            />
        );
    };
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { loginUser, setId })(RegisterView);