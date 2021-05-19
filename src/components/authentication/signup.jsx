import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import SignInWithGoogle from '../../media/signinwithgoogle.png'

export default function SignUp() {
    const history = useHistory()

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <div style={{ textAlign: '-webkit-center', margin: '25px' }}>
            <div style={{ border: '1px solid grey', minHeight: '750px', maxWidth: '1000px', backgroundColor: 'white' }}>
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
                            <Form.Label>Email address</Form.Label>
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
                        Submit
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
                        <input type='image' src={ SignInWithGoogle } alt='' onClick={() => console.log('Sign In With Google')} style={{ width: '30%' }} />
                    </div>
                </div>
            </div>
        </div>
    )

    function createAccountHandler(e) {
        e.preventDefault()
        console.log(email)
        console.log(password)
        console.log(username)
    }
}