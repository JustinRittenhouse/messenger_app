import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext, AuthProvider } from '../contexts/AuthProvider'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { async } from '@firebase/util'

export const Message = (props) => {

    
    const message = props.message
    const { currentUser } = useContext( AuthContext )
    const [ m, setM ] = useState({})
    const db = getFirestore()

    const [ userName, setUserName ] = useState("")

    useEffect( async () => {
        setM( message )
        // console.log(m)
        // console.log(message.userId)
        const docRef = doc(db, "users", `${ message.senderId }`);
        const docSnap = await getDoc(docRef);
        setUserName(docSnap.data().name)
        // console.log(docSnap.data())
    }, [])

    
    return (
        <li className="list-group-item">
            <div>
                <p>{m.body}</p>
                <span className="float-right">
                    <small>
                        {moment(m.timeCreated?.toDate()).fromNow()}
                    </small>
                </span>
            </div>
            <div>
                <cite> &mdash; {`${ userName }`}</cite>
            </div>
        </li>
    )
}
