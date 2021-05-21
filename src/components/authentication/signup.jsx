import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { signInWithGoogle, auth, generateUserDocument } from '../../database/firebase'
import SignInWithGoogle from '../../media/signinwithgoogle.png'

export default function SignUp({ setError }) {
    const history = useHistory()

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <div style={{ textAlign: '-webkit-center', margin: '25px', padding: '0 75px 75px' }}>
            <div style={{ border: '1px solid grey', maxWidth: '1000px', backgroundColor: 'white' }}>
                <div style={{ margin: '50px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 700  }}>Create an Account</span>
                    <Form onSubmit={(e) => createAccountHandler(e)} style={{ width: '75%', margin: '15px' }}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                data-lpignore="true"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                                placeholder="ILovePokémon1234"
                            />
                            <Form.Text className="text-muted">
                            Be Creative!
                            </Form.Text>
                        </Form.Group>
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
                            <Form.Text className="text-muted">
                            Weʼll never share your email with anyone else.
                            </Form.Text>
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
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => createAccountHandler(e)}>
                        Create Account
                        </Button>
                    </Form>
                    <div style={{ margin: '35px 10px 10px' }}>
                        Already Have an Account?
                        <div>
                            <a href='' onClick={() => history.push('/account/sign-in')}>Sign In Here</a>
                        </div>
                    </div>
                    <div style={{ fontWeight: 700 }}>
                        <span style={{ borderBottom: '1px solid black' }}>or</span>
                    </div>
                    <div style={{ margin: '15px' }}>
                        <input type='image' src={ SignInWithGoogle } alt='' onClick={() => signInWithGoogle()} style={{ width: '260px' }} />
                    </div>
                </div>
            </div>
        </div>
    )

    async function createAccountHandler(e) {
        e.preventDefault()

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            generateUserDocument(user, {username})
        }
        catch(e){
            setError(e.message)
        }

        console.log(email)
        console.log(password)
        console.log(username)
    }
}

SignUp.propTypes ={
    setError: PropTypes.func
}