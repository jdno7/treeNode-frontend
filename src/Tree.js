import React, {useState, useEffect,useRef} from 'react'
import treeNodeApi from './api'
import Factory from './Factory'
import Factories from './Factories'
import NewFactoryForm from './NewFactoryForm'
import './RootNode.css'

const Tree = () => {
    const [tree, setTree] = useState(null)
    const ws = new WebSocket(`ws://localhost:3001/tree`)
    ws.onopen = function (evt) {
    console.log("client socket connection open")
    }
    ws.onclose = function (evt) {
    console.log("client socket connection closed")
    }
    ws.onmessage = function (evt) {
        console.log("client recieved", evt.data,"from server")
        setTree(JSON.parse(evt.data))
    }
    useEffect (() => {
        const getTree = async () => {
            const res = await treeNodeApi.getTree()
            console.log(res)
            setTree(res)
        }
      
        getTree()
    }, [setTree])
    // useEffect (() => {
    //     const ws = new WebSocket(`ws://localhost:3001/tree`)
    //     ws.onopen = function (evt) {
    //     console.log("client socket connection open")
    //     ws.send({tree})
    //     }
    //     ws.onclose = function (evt) {
    //     console.log("client socket connection closed")
    //     }
    //     ws.onmessage = function (evt) {
    //         console.log("client recieved", evt.data,"from server")
    //     }
    // }, [setTree]
    //     )

    

    return (
        <>
        { tree?
            <div>
                <div className='RootNode'>
                    <h1>{tree.root.name}</h1>
                </div>
                <Factories factories={tree.factories} tree={tree} setTree={setTree} ws={ws}/>
            </div>
            :  <div>Loading...</div>
        }
        <NewFactoryForm tree={tree} setTree={setTree} ws={ws}/>
        </>
        
    )

}

export default Tree