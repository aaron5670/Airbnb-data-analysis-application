import {UserManager} from 'oidc-client';

const config = {
    authority: "https://localhost:5001",
    client_id: "client",
    client_secret: "secret",
    grant_type: "password",
    username: "alice",
    password: "alice",
    // redirect_uri: "https://localhost:6001/signin-oidc",
    // response_type: "id_token token",
    scope: "openid api1",
    // post_logout_redirect_uri: "https://localhost:6001/signout-oidc",
};

const userManager = new UserManager(config)

export async function loadUserFromStorage(store) {
    try {
        let user = await userManager.getUser()
        if (!user) {
            console.log("No user")
        }
        console.log("user found")
        console.log(user)
    } catch (e) {
        console.error(`User not found: ${e}`)
    }
}

export function signinRedirect() {
    return userManager.signinRedirect()
}

export function signinRedirectCallback() {
    return userManager.signinRedirectCallback()
}

export function signoutRedirect() {
    userManager.clearStaleState()
    userManager.removeUser()
    return userManager.signoutRedirect()
}

export function signoutRedirectCallback() {
    userManager.clearStaleState()
    userManager.removeUser()
    return userManager.signoutRedirectCallback()
}

export default userManager