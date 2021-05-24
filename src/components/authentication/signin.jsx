import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory, Link } from 'react-router-dom'
import { auth } from '../../database/firebase'

export default function SignIn({ setError }) {
    const history = useHistory()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <div style={{ margin: '25px', padding: '0 75px 75px' }}>
            <div style={{ border: '1px solid grey', maxWidth: '1000px', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto' }}>
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
                        <Button
                            variant="primary"
                            type='null'
                            onClick={(e) => {
                                signInToAccountHandler(e)
                            }}
                        >
                        Sign In
                        </Button>
                    </Form>
                    <div style={{ fontWeight: 700 }}>
                        <span style={{ borderBottom: '1px solid black' }}>or</span>
                    </div>
                    <div style={{ margin: '20px 10px 10px' }}>
                        Need To Create an Account?
                        <div>
                            <a href='' onClick={() => history.push('/account/sign-up')}>Create an Account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    async function signInToAccountHandler(e) {
        e.preventDefault()
        if (email && password) {
            await auth.signInWithEmailAndPassword(email, password)
                .then(user => {
                    if(user.user) {
                        history.push('/account/profile')
                    }
                })
                .catch(e => {
                    console.log(e)
                    if (e.code === 'auth/wrong-password') {
                        setError('Wrong password. Please try again.')
                    } else if(e.code === 'auth/user-not-found') {
                        setError('No user was found with this email. Try another email address or proceed to Create an Account')
                    } else {
                        setError('Error signing in with password and email!')
                    }
                })
        } else {
            if (!email) {
                setError('Please enter a email')
            } else if (!password) {
                setError('Please enter a password')
            }
        }
        
    }
}

SignIn.propTypes={
    getUserDocument: PropTypes.func,
    setError: PropTypes.func
}