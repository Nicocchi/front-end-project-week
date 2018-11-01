import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from "../components/Authentication/Login";
import { loginUser, setId, clearError } from '../store/actions';

class LoginView extends Component {
    state = {
        user: {
            email: '',
            password: '',
        },
        error: '',
    };

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        });
    }

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    userLogin = e => {
        if(!this.validateEmail(this.state.user.email)) {
            this.setState({ error: 'Invalid email address.'});
            return;
        }

        this.props.clearError();

        this.setState({
            error: ''
        });

        const existingUser = {
            email: this.state.user.email.toLowerCase(),
            password: this.state.user.password
        }

        this.props.loginUser(existingUser);
        // this.props.history.push('/');

        // const endpoint = 'http://localhost:8000/api/users/login';
        //
        // axios.post(endpoint, existingUser).then(res => {
        //     this.setState({
        //         error: ''
        //     });
        //     localStorage.setItem('jwt', res.data.token);
        //     this.props.setId(res.data.userId);
        //     this.props.loginUser(res.data.username);
        //     this.props.history.push('/');
        // }).catch(err => {
        //     this.setState({
        //         error: err.response.data.error
        //     });
        // });
    }

    render() {
        return (
            <Login
                {...this.props}
                user={this.state.user}
                error={this.props.error}
                localError={this.state.error}
                isLoggedIn={this.props.isLoggedIn}
                handleChange={this.handleChange}
                loginUser={this.userLogin}
            />
        );
    };
};

const mapStateToProps = state => ({
    error: state.error,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, { loginUser, setId, clearError })(LoginView);