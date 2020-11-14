import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
display:flex;
justify-content:center;
padding:5px;
`;
const Input = styled.input`
border:1px solid #ccc;
width:500px;
padding:2px;
`
const Label = styled.label`
font-size:1em;
padding:2px;
margin-right:5px;
`
export default function searchPanel({ onKeywordChange, keyword, inputRef }) {

    return (
        <Row>
            <Label>Search</Label>
            <Input
                ref={inputRef}
                type='text'
                value={keyword}
                placeholder='Search Wikipedia'
                onChange={onKeywordChange} />
        </Row>
    )
} 