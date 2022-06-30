import React, {useState, useEffect,useRef} from 'react'
import treeNodeApi from './api'
import Factory from './Factory'
import Factories from './Factories'
import NewFactoryForm from './NewFactoryForm'
import './RootNode.css'
import './Tree.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'


const Tree = () => {
    const [tree, setTree] = useState(null)
    const serverURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const webSocketURL = serverURL.slice(4)
    // open up a websocket for real time connection
    const ws = new WebSocket(`ws${webSocketURL}/tree`)
    ws.onopen = function (evt) {
    console.log("client socket connection open")
    }
    ws.onclose = function (evt) {
    console.log("client socket connection closed")
    }
    // When the server sends a message
    // update the tree State
    ws.onmessage = function (evt) {
        console.log("client recieved", evt.data,"from server")
        setTree(JSON.parse(evt.data))
    }
    // On first load get the tree the API and setState
    useEffect (() => {
        const getTree = async () => {
            const res = await treeNodeApi.getTree()
            console.log(res)
            setTree(res)
        }
      
        getTree()
    }, [])  

    return (
        <Container>
      { tree? <>  
                 <Card className='Root'>
                    <Card.Body>
                        <Card.Title>{tree.root.name}</Card.Title>
                    </Card.Body>
                </Card>
                <h2>FACTORIES</h2>
                    <Factories factories={tree.factories} tree={tree} setTree={setTree} ws={ws}/>
                    <NewFactoryForm tree={tree} setTree={setTree} ws={ws}/>
               </>
            :  <>
                    <Spinner style={{marginTop:'40vh'}} animation="border" role='status'></Spinner>
                </>      
        } 
        </Container>
        
    )

}

export default Tree

