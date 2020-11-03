import React from "react";
import {useHistory} from "react-router-dom"
import {authService} from "../fbase";

export default function () {
    const history = useHistory()
    const onLogoutClick = () => {
        authService.signOut()
        history.push('/')
    }
    return (
        <>
            <button onClick={onLogoutClick}>Log Out</button>
        </>
    )
}