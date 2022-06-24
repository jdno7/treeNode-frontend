import React, {useState, useEffect} from 'react'
import treeNodeApi from './api'

const GenerateChildrenForm = ({tree, setTree}) => {
    const initialState = {min:"", max:"", numChildren:''}
    const [formData, setFormData] = useState(initialState)
    console.log(formData)
    const handleChange = (e) => {
        const {name, value} = e.target
        // if (name === 'numChildren' && value > 15) {
        //     alert("Maximum of 15 children")
        //     setFormData(d => ({
        //         ...d,
        //         [name]: ''
        //     }))
        // } 
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
    if (+formData.numChildren > 15) formData.numChildren = 15
    return (
        <>
        <form className='GenerateChildrenForm'>
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
                    name="min"/>
        <br></br>
            <label htmlFor='max'>Max</label> <br></br>
                <input
                    required
                    onChange={handleChange}
                    value={formData.max}
                    className="GenerateChildrenForm-input"
                    type="number"
                    name="max"/> <br></br>
            <button>Generate</button>
        </form>
        </>
        
    )
}

export default GenerateChildrenForm