import React, {useState} from "react";
import {authService, firebaseInstance} from "../fbase";

export default function Auth() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
    const {email, password} = inputs
    const onChange = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch (e) {
            setError(e.message)
        }
    }
    const onSocialClick = async (e) => {
        const {target: {name}} = e
        let provider
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }
    const toggleAccount = () => setNewAccount((prev) => {
        return !prev
    })

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                       onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with GOogle</button>
            </div>
        </div>
    )
}

