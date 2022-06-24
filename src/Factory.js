import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import './Factory.css'
import GenerateChildrenForm from './GenerateChildrenForm'

const Factory = ({factory, tree, setTree}) => {
    const {name, node_id, children} = factory

    const removeFactory = async (id) => {
        await treeNodeApi.removeFactory(id)
        const newTree = {...tree}
        newTree.factories = newTree.factories.filter(factory => factory.node_id != id)
        setTree(oldTree => newTree)
    }
    return (
        <>
        <div className='Factory'>
            <button onClick={() => removeFactory(node_id)}>X</button>
            <div className='FactoryNode'>
                {name}
                <GenerateChildrenForm/>
            </div>
            <div className='Children'>
                {children.map(c => <span className='Child'>{c.name}</span>)}
            </div>
        </div>  
        </>
    )
}

export default Factory