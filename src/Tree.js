import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import Factory from './Factory'
import Factories from './Factories'
import NewFactoryForm from './NewFactoryForm'
import './RootNode.css'

const Tree = () => {
    const [tree, setTree] = useState(null)
    useEffect (() => {
        const getTree = async () => {
            const res = await treeNodeApi.getTree()
            console.log(res)
            setTree(res)
        }
        getTree()
    }, [setTree])
    console.log("tree ==" ,tree)

    return (
        <>
        { tree?
            <div>
                <div className='RootNode'>
                    <h1>{tree.root.name}</h1>
                </div>
                <Factories factories={tree.factories} tree={tree} setTree={setTree}/>
            </div>
            :  <div>Loading...</div>
        }
        <NewFactoryForm tree={tree} setTree={setTree}/>
        </>
        
    )

}

export default Tree