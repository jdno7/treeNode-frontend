import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'
import './GenerateChildrenForm.css'

// Creates new Children for the correcponding factory
const GenerateChildrenForm = ({node_id, tree, setTree}) => {
    const initialState = {lowerBound:"", upperBound:"", numChildren:''}
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(d => ({
            ...d,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        // If a user tries to submit with the Max > Min Alert them to this issue and return
        if (+formData.upperBound < +formData.lowerBound) {
            alert("Max must be less than Min")
            e.preventDefault()
            return
        }
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
    console.log(+formData.upperBound,+formData.lowerBound, +formData.upperBound<+formData.lowerBound?'True':"False" )
   
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
                    name="upperBound"
                    style={+formData.upperBound<+formData.lowerBound? {backgroundColor:'red'}:{backgroundColor:'white'}}
                    />
                    <br></br>
            <button>Generate</button>
        </form>
        </>
        
    )
}

export default GenerateChildrenForm