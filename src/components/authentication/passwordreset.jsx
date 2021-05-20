import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory} from 'react-router-dom'

export default function PasswordReset() {
    const history = useHistory()

    const [email, setEmail] = useState(null)

    return (
        <div style={{ textAlign: '-webkit-center', margin: '25px', padding: '0 75px 75px' }}>
            <div style={{ border: '1px solid grey', maxWidth: '1000px', backgroundColor: 'white' }}>
                <div style={{ margin: '50px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 700  }}>Reset Password</span>
                    <Form onSubmit={(e) => createAccountHandler(e)} style={{ width: '75%', margin: '15px' }}>
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
                        <Button variant="primary" type="submit" onClick={(e) => createAccountHandler(e)}>
                        Send Password Reset Email
                        </Button>
                    </Form>
                    
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

    function createAccountHandler(e) {
        e.preventDefault()
        console.log(email)
    }
}