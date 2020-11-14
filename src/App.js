import React, { createRef, useEffect, useRef, useState } from "react";
import Category from "./components/category";
import SearchPanel from "./components/searchPanel";
import Table from "./components/table"
import styled from 'styled-components';

const Wrapper = styled.div``;
const ContentWrapper = styled.div``;
const Title = styled.h1``;
const TableTitle = styled.h2``;
const Info = styled.div`
  color:red;
`;

export default function App() {
  const inputRef = createRef();
  const firstRender = useRef(true);
  const [keyword, setKeyword] = useState('');
  const [{ loading, content }, setState] = useState({
    loading: false,
    content: ''
  });


  useEffect(() => {
    inputRef.current.focus();
    firstRender.current = false;
  });

  useEffect(() => {
    if (!firstRender.current) {
      const timeOutId = setTimeout(() => {
        makeAnApiCall(keyword)
      }, 700);
      return () => clearTimeout(timeOutId);
    }
  }, [keyword]);

  const makeAnApiCall = (value) => {
    if (!value) {
      setState({ loading: false, content: '' });
    } else {
      fetch(`https://en.wikipedia.org/w/api.php?action=parse&format=json&formatversion=2&page=${value}`)
        .then(resp => resp.json())
        .then(data => {
          if (data.error)
            setState({ loading: false, content: data.error.info });
          else
            setState({ loading: true, content: data.parse });
        })
        .catch((e) => {
          setState({ loading: false, content: '' })
        })
    }
  }
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <Wrapper>
      <SearchPanel
        inputRef={inputRef}
        keyword={keyword}
        onKeywordChange={handleKeywordChange} />
      <ContentWrapper className="mw-body">
        {loading &&
          <Wrapper>
            <Title className='firstHeading'>{content.title}</Title>
            <Wrapper className='toc'>
              <Wrapper className='toctitle'>
                <TableTitle>Contents</TableTitle>
                <Table data={content.sections}></Table>
              </Wrapper>
            </Wrapper>
            <Category categories={content.categories}></Category>
          </Wrapper>
        }
        {
          !loading && <Info>{content}</Info>
        }
      </ContentWrapper>
    </Wrapper>
  )

}
