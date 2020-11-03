import React, {useEffect, useState} from "react";
import {dbService} from "../fbase";
import Nweet from "../components/Nweet";

export default function Home({userObj}) {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([]);
    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get()
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id
    //         };
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // }

    useEffect(() => {
       dbService.collection("nweets").onSnapshot((snapshot => {
           const nweetArray = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data()
           }))
           setNweets(nweetArray)
       }))
    },[])

    const onSubmit = async (e) => {
        e.preventDefault()
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid
        })
        setNweet("")
    }

    const onChange = (e) => {
        const {target: {value}} = e
        setNweet(value)
    }

    console.log(nweets)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?"
                       maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}