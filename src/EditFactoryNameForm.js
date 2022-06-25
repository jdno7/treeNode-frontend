import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import './EditFactoryNameForm.css'

// This form will appear in place of the factory name when the edit button is clicked
// an input will apear with a placeholder of the current factory name
// When submitted the state and db will be updated with the new factory name
const EditFactoryNameForm = ({currName, node_id, tree, setTree, edit, setEdit}) => {
    const initialState = {name:""}
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(d => ({
            ...d,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newNameRes = await treeNodeApi.updateFactoryName(node_id,formData)
        const newName = newNameRes.name
        const newTree = {...tree}
        const factory = newTree.factories.findIndex(f => f.node_id === node_id)
        newTree.factories[factory].name = newName
        setTree(oldTree => newTree)
        setEdit(!edit)
    }

    return (
        <form className='EditFactoryNameForm'onSubmit={handleSubmit}>
            
            <input
                required
                onChange={handleChange}
                value={formData.name}
                className="EditFactoryNameForm-input"
                placeholder={currName}
                type="text"
                name="name"
            />
            <button>Save</button>
        </form>
    )
}

export default EditFactoryNameForm 