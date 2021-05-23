import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { auth } from '../../database/firebase'
import { useHistory} from 'react-router-dom'

export default function PasswordReset({ setError }) {
    const history = useHistory()

    const [email, setEmail] = useState(null)
    const [emailHasBeenSent, setEmailHasBeenSent] = useState()

    return (
        <div style={{ textAlign: '-webkit-center', margin: '25px', padding: '0 75px 75px' }}>
            <div style={{ border: '1px solid grey', maxWidth: '1000px', backgroundColor: 'white' }}>
                <div style={{ margin: '50px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 700  }}>Reset Password</span>
                    <Form onSubmit={(e) => passwordResetHandler(e)} style={{ width: '75%', margin: '15px' }}>
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
                        <Button variant="primary" type="submit" onClick={(e) => passwordResetHandler(e)}>
                        Send Password Reset Email
                        </Button>
                    </Form>
                    {emailHasBeenSent &&
                    <div>
                        An email has been sent!
                    </div>}
                    <div style={{ fontWeight: 700, margin: '30px' }}>
                        <span style={{ borderBottom: '1px solid black' }}>or</span>
                    </div>
                    <div>
                        Need To Create an Account?
                        <div>
                            <a href='' onClick={() => history.push('/account/sign-up')}>Create an Account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function passwordResetHandler(e) {
        e.preventDefault()
        if (email) {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    setEmailHasBeenSent(true)
                })
                .catch((e) => {
                    console.log(e)
                    if (e.code === 'auth/user-not-found') {
                        setError('This email address is not registered. Please try another or proceed to Create an Account')
                    } else if (e.code === 'auth/invalid-email') {
                        setError('Please enter a valid email address')
                    } else {
                        setError('Error sending email')
                    }
                })
        } else {
            setError('Please enter an email')
        }
    }
}

PasswordReset.propTypes = {
    setError: PropTypes.func
}