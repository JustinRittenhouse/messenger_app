import { addDoc, collection, collectionGroup, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore"
import { createContext, useCallback, useEffect, useState } from "react";
import { firebaseApp } from '../firebase/config';
import { useAuth } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = (props) =>
{

    const [ messages, setPosts ] = useState([])
    const { currentUser } = useAuth()
    const db = getFirestore()

    // loop over posts collection and setPosts
    const getPosts = useCallback(
        async () =>
        {
            const q = query(collectionGroup(db, 'messages'))

            const querySnapshot = await getDocs(q)

            let newPosts = [];
            querySnapshot.forEach(async doc =>
            {
                const userRef = await getDoc(doc.ref);
                // console.log(userRef.data())

                newPosts.push({
                    id: doc.id,
                    ...doc.data(),
                    user: { ...userRef.data() }
                })
                setPosts( messages.concat(newPosts) )
            })

            return querySnapshot;
        },
        [ db ],
    )

    const addPost = async (formData) =>
    {
        let collectionRef = await collection(db, `messages`)


        await addDoc(collectionRef, formData)
        setPosts([ ...messages ])
    }


    useEffect(() =>
    {
        getPosts()
    }, [ getPosts ])

    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
        messages, setPosts, addPost
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}