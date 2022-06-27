import React from 'react';
import Factory from './Factory';
import './Factories.css'

// Parent element for Factory Nodes
// loop through the factories and render a Factory Component for each
const Factories = ({factories, tree, setTree}) => {
    return (
        <>
            <h2>Factories</h2>
            <div className='Factories'>
                {factories.map(f => <Factory factory={f} tree={tree} setTree={setTree}/>)}
            </div>
        </>
    )
}

export default Factories