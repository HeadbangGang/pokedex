import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { signInWithGoogle } from '../../database/firebase'
import PropTypes from 'prop-types'
import SignInWithGoogle from '../../media/signinwithgoogle.png'

export default function SignIn({ setError }) {
    const history = useHistory()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <div style={{ textAlign: '-webkit-center', margin: '25px', padding: '0 75px 75px' }}>
            <div style={{ border: '1px solid grey', maxWidth: '1000px', backgroundColor: 'white' }}>
                <div style={{ margin: '50px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 700  }}>Sign In</span>
                    <Form onSubmit={(e) => signInToAccountHandler(e)} style={{ width: '75%', margin: '15px' }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                autoComplete="email"
                                data-lpignore="true"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                placeholder="example@gmail.com"
                                type="email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                autoComplete="current-password"
                                data-lpignore="true"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                placeholder="Password"
                                type="password"
                            />
                            <div style={{ textAlign: 'left' }}>
                                <Link to={{ pathname: '/account/password-reset'}}>
                                Forgot Password?
                                </Link>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type='null' onClick={(e) => {
                            e.preventDefault()
                            signInToAccountHandler(e)
                        }}
                        >
                        Sign In
                        </Button>
                    </Form>
                    
                    <div style={{ fontWeight: 700 }}>
                        <span style={{ borderBottom: '1px solid black' }}>or</span>
                    </div>
                    <div style={{ margin: '15px' }}>
                        <input type='image' src={ SignInWithGoogle } alt='' onClick={() => signInWithGoogle()} style={{ width: '260px' }} />
                    </div>
                    <div style={{ margin: '35px 10px 10px' }}>
                        Need To Create an Account?
                        <div>
                            <a href='' onClick={() => history.push('/account/sign-up')}>Create an Account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function signInToAccountHandler(e) {
        e.preventDefault()
        console.log(email)
        console.log(password)
    }
}

SignIn.propTypes ={
    setError: PropTypes.func
}