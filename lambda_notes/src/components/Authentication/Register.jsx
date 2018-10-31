import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    width: 50%;
    margin-top: 80px;
    padding-left: 3%;
    color: #4a494a;

    input {
        width: 400px;
    }

    textarea {
        height: 500px;
    }
`;

const Button = Styled.button`
    width: 30%;
    height: 60px;
    background-color: #2ac0c4;
    color: white;
    border: 1px solid #969696;
    cursor: pointer;
    margin-top: 20px;
`;

function Register(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.userRegister();
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <p className="h4 mb-4">Register Account</p>
                <input type="text" placeholder="Email" name="email" id="defaultFormContactNameEx" className="form-control" defaultValue={props.user.email} onChange={props.handleChange} />
                <br />
                <input type="text" placeholder="Username" name="username" id="defaultFormContactNameEx" className="form-control" value={props.user.username} onChange={props.handleChange} />
                <br/>
                <input type="password" placeholder="Password" name="password" id="defaultFormContactNameEx" className="form-control" value={props.user.password} onChange={props.handleChange} />
                <br/>
                <Button type="button" onClick={handleSubmit}>Register</Button>
                <br/><br/>
                <p>Already have an account? <NavLink to="/login">Login</NavLink> in and view your notes!</p>
            </form>
        </Wrapper>
    )
}

export default Register;