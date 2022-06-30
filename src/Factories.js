import React from 'react';
import Factory from './Factory';
import './Factories.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Row from 'react-bootstrap/Row'
// import Row from 'react-bootstrap/Row'

// Parent element for Factory Nodes
// loop through the factories and render a Factory Component for each
const Factories = ({factories, tree, setTree, ws}) => {
    return (
        <>
        <CardGroup className='flex-row flex-wrap justify-content-center align-items-center'>
            {factories.map(f =><Factory factory={f} tree={tree} setTree={setTree} ws={ws}/>)}  
        </CardGroup>  
        </>
    )
}

export default Factories