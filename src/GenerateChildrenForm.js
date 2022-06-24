import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'

const GenerateChildrenForm = ({node_id, tree, setTree}) => {
    const initialState = {lowerBound:"", upperBound:"", numChildren:''}
    const [formData, setFormData] = useState(initialState)
    console.log(formData)
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(d => ({
            ...d,
            [name]: value
        }))
       
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newChildren = await treeNodeApi.generateChildren(node_id, formData)
        const newTree = {...tree}
        const factory = newTree.factories.findIndex(f => f.node_id === node_id)
        console.log("factoryIdx = ",factory)
        newTree.factories[factory].children = newChildren
        setTree(oldTree => newTree)
        setFormData(initialState)
    }
    if (+formData.numChildren > 15) formData.numChildren = 15
    return (
        <>
        <form onSubmit={handleSubmit}  className='GenerateChildrenForm'>
            <p><strong>Generate Children</strong></p>
            <label htmlFor='children'>Children (15 max)</label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.numChildren}
                    className="GenerateChildrenForm-input"
                    type="number"
                    max={15}
                    name="numChildren"/>
        <br></br>
            <label htmlFor='min'>Min</label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.min}
                    className="GenerateChildrenForm-input"
                    type="number"
                    name="lowerBound"/>
        <br></br>
            <label htmlFor='max'>Max</label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.max}
                    className="GenerateChildrenForm-input"
                    type="number"
                    name="upperBound"/> <br></br>
            <button>Generate</button>
        </form>
        </>
        
    )
}

export default GenerateChildrenForm