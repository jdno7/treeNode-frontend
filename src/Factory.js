import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import './Factory.css'
import GenerateChildrenForm from './GenerateChildrenForm'
import EditFactoryNameForm from './EditFactoryNameForm'

const Factory = ({factory, tree, setTree}) => {
    const {name, node_id, children} = factory
    const [edit, setEdit] = useState(false)

    const removeFactory = async (id) => {
        await treeNodeApi.removeFactory(id)
        const newTree = {...tree}
        newTree.factories = newTree.factories.filter(factory => factory.node_id != id)
        setTree(oldTree => newTree)
    }
    return (
        <>
        <div className='Factory'>
            <button className='Factory-btn-remove' onClick={() => removeFactory(node_id)}>X</button>
            <button className='Factory-btn-edit' onClick={() => setEdit(!edit)}>Edit</button>
            <div className='FactoryNode'>
                {edit? <EditFactoryNameForm tree={tree} setTree={setTree} node_id={node_id} currName={name} edit={edit} setEdit={setEdit}/>
                           :<h4 className='Factory-name'>{name}</h4>}
                <GenerateChildrenForm node_id={node_id} tree={tree} setTree={setTree}/>
            </div>
            <div className='Children'>
                {children.map(c => <span className='Child'>{c.name}</span>)}
            </div>
        </div>  
        </>
    )
}

export default Factory