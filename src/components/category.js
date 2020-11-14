import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Links = styled.div``;
const Ul = styled.ul``;
const Li = styled.li``;

export default function Category({ categories }) {

    return (<Wrapper className='catlinks'>
        <Links className='mw-normal-catlinks'>
            Categories:
            <Ul>
                {
                    categories
                        .filter(c => !c.hidden)
                        .map((c, index) =>
                            <Li key={index}>{c.category}</Li>)
                }
            </Ul>
        </Links>
    </Wrapper>)
}