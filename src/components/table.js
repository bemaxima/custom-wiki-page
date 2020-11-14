import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul``;
const Li = styled.li`
   padding-left:${props => props.level * 10 + 'px'}; 
`;

export default function Table({ data }) {
    return (
        <Ul>
            {data.map(data => <Li level={+data.toclevel} key={data.index}>{data.number}.{data.line}</Li>)}
        </Ul>
    )
}