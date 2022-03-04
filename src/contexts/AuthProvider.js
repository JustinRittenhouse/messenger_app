import { createContext, useContext, useEffect, useState } from "react";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const AuthContext = createContext()

export function useAuth() {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {

    const [ currentUser, setCurrentUser ] = useState( {loggedIn: false } )
    let auth = getAuth()
    let provider = new GoogleAuthProvider()
    const db = getFirestore()
    
    function signIn() {
        return setPersistence( auth, browserLocalPersistence )
                .then( () => {
                    signInWithPopup( auth, provider )
                        .then( result => {
                            console.log( result )
                        } )
                } )
                .catch( err => console.log( err ) )
    }

    function logOut() {
        signOut( auth )
            .then( () => {
                setCurrentUser( {
                    loggedIn: false
                } )
                console.log( 'User logged out succesfully' )
            } )
    }

    useEffect(() => {

        onAuthStateChanged( auth, ( user ) => {
            if ( user ) {

                // once the user logs in, we need to add them to the databse as a reference
                // quer the userse collection to find the user
                const userRef = doc( db, 'users', user.uid )
                // if that user doesn't exist, add them to the database,
                // otherwise, if the user does exist, overwrite (don't duplicate) their information
                setDoc( userRef, { email: user.email, name: user.displayName }, { merge: true } )

                setCurrentUser( {
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                } )
            }
        } )
    }, [ auth ])
    
    const values = {
        signIn, currentUser, logOut
    }

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )
}