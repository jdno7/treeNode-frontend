import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import './GenerateChildrenForm.css'

// Creates new Children for the correcponding factory
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
    // if a user changes the numChildren input to more than 15
    // set it back to 15
    if (+formData.numChildren > 15) formData.numChildren = 15
    // if the Min(lowerBound) input is greater than Max 
    // set the Max to on number greater than Min
    if (+formData.lowerBound > +formData.upperBound) 
        setFormData(d => ({
            ...d,
            upperBound: +formData.lowerBound+1
        }) )
    // if the Max(upperBound) input is less than Min
    // set the Max the one number greater than Min
    if (+formData.upperBound < +formData.lowerBound) 
        setFormData(d => ({
            ...d,
            upperBound: +formData.lowerBound+1
        }) )

    return (
        <>
        <form onSubmit={handleSubmit}  className='GenerateChildrenForm'>
            <h6>Generate Children</h6>
            <label className='GenerateChildrenForm-label' htmlFor='children'>Children: (15 max) </label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.numChildren}
                    className="GenerateChildrenForm-input"
                    type="number"
                    max={15}
                    name="numChildren"/>
        <br></br>
            <label className='GenerateChildrenForm-label' htmlFor='min'>Min :</label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.lowerBound}
                    className="GenerateChildrenForm-input"
                    type="number"
                    name="lowerBound"/>
        {/* <br></br> */}
            <label className='GenerateChildrenForm-label' htmlFor='max'>Max :</label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.upperBound}
                    className="GenerateChildrenForm-input"
                    type="number"
                    name="upperBound"/> <br></br>
            <button>Generate</button>
        </form>
        </>
        
    )
}

export default GenerateChildrenForm