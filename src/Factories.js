import React from 'react';
import Factory from './Factory';

const Factories = ({factories, tree, setTree}) => {
    return (
        <div className='Factories'>
            {factories.map(f => <Factory factory={f} tree={tree} setTree={setTree}/>)}
        </div>
    )
}

export default Factories