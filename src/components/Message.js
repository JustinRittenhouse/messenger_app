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

    const [ fromName, setFromName ] = useState("")
    const [ toName, setToName ] = useState("")

    useEffect( async () => {
        setM( message )
        // console.log(m)
        // console.log(message.userId)
        let docRef = doc(db, "users", `${ message.senderId }`);
        let docSnap = await getDoc(docRef);
        setFromName(docSnap.data().name)
        // console.log(docSnap.data())
        docRef = doc(db, "users", `${message.userId}`);
        docSnap = await getDoc(docRef)
        setToName(docSnap.data().name)
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
                <cite>from -{`${ fromName }`}</cite>
            </div>
            <div>
                <cite>to -{`${ toName }`}</cite>
            </div>
        </li>
    )
}
