import React from 'react'
import './LoginPage.scss'
import {useHistory} from "react-router-dom"
import {useAuth} from "../../auth"
import HFNLogo from './hfn.png'

const LoginPage = () => {
    const history = useHistory()
    const auth = useAuth()

    const doLogin = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        auth.signin({username: data.get('username'), password: data.get('password')},
            (res) => {
                if(res.success)
                    history.replace('/dashboard')
            });
    }

    return (
        <div className="LoginPage">
            <div className="container">
                <div className="col-md-4 offset-md-4">
                    <div className="login-form">

                        <header>
                            <img src={HFNLogo} alt="Humanitas Firenze Nord" className="logo"/>
                            <h3>Portale Vaccinazioni</h3>
                        </header>

                        <form onSubmit={doLogin}>
                            <div className="form-group">
                                <label htmlFor="loginUsername">Username</label>
                                <input type="text" className="form-control" id="loginUsername"
                                       placeholder="inserisci nome utente" name="username" required="required"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Password</label>
                                <input type="password" className="form-control" id="loginPassword"
                                       placeholder="inserisci password" name="password" required="required"/>
                            </div>
                            <button className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
