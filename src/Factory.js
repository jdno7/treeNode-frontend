import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import './Factory.css'
import GenerateChildrenForm from './GenerateChildrenForm'
import EditFactoryNameForm from './EditFactoryNameForm'
import Card from 'react-bootstrap/Card'

// Factory Node
// when the "Edit" btn is clicked and edit state = True an EditFactoryNameForm is rendered with a placeholder of the current factory name for the user to edit
// when the "X" button is clicked it will remove the factory and its children
// contains "GenerateChildrenForm" where a user can create new children 
//           if the factory hsa existing children they are removed 
const Factory = ({factory, tree, setTree, ws}) => {
    const {name, node_id, children} = factory
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)

    const removeFactory = async (id) => {
        await treeNodeApi.removeFactory(id)
        const newTree = {...tree}
        newTree.factories = newTree.factories.filter(factory => factory.node_id != id)
        ws.send("Get me a tree")
        // setTree(oldTree => newTree)
    }
    return (
        <>
        
            <div>
                <Card className='shadow' style={{border:'none', margin:'10px', borderRadius:'15px'}}>
                    <button className='Factory-btn-remove' onClick={() => removeFactory(node_id)}>X</button>
                    <button className='Factory-btn-edit' onClick={() => setEdit(!edit)}>{edit? 'Cancel': 'Edit'}</button>
                    <div className='FactoryNode'>
                        {edit? <EditFactoryNameForm tree={tree} setTree={setTree} node_id={node_id} currName={name} edit={edit} setEdit={setEdit} ws={ws}/>
                                :<h4 style={{backgroundColor:'grey', padding:'10px', borderRadius:'15px 15px 0 0'}}>{name}</h4>}
                        <GenerateChildrenForm className={show?'show':'hide'} node_id={node_id} tree={tree} setTree={setTree} ws={ws} show={show}/>
                        <button className={edit?"hide2":"GenerateChildren-btn"} onClick={()=>setShow(!show)}>{show?'^^^':'+'}</button>
                    </div>
                    
                </Card>
                    <div className='Children'>
                        {children.map(c => <span className='Child'>{c.name}</span>)}
                    </div>
            </div>  
        
        </>
    )
}

export default Factory