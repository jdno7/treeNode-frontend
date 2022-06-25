import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'

// Create a new factory from the Name provided
const NewFactoryForm = ({tree,setTree}) => {
    
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
        console.log(formData)
        const newFactory = await treeNodeApi.createNewFactory(formData)
        newFactory.children = []
        const newTree = {...tree}
        newTree.factories.push(newFactory)
        setTree(oldTree => newTree)
        setFormData(initialState)
    }

    return (
        <form className='NewFactoryForm'onSubmit={handleSubmit}>
            <h4>Create New Factory</h4>
            <label className='NewFactoryForm-name-label' htmlFor='name'>Factory Name</label> <br></br>
            <input
                required
                onChange={handleChange}
                value={formData.name}
                className="NewFactoryForm-name-input"
                type="text"
                name="name"
            />
            <button>Create Factory</button>
        </form>
    )
}

export default NewFactoryForm