import { gql } from '@apollo/client';
import { client } from '../../config/client-graphql';
import { useState, useEffect } from 'react';



const Characters = () => {

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesQtd, setPagesQtd] = useState();
  const [text, setText] = useState('');
  const [err, setErr] = useState();

  useEffect (()=> {
    initial(); 
    },[page, text]);

    function initial() {
      client
        .query({
          query: gql`
          query {
  characters(page: ${page}, filter: {name: "${text}"}) {
    info {
      pages
    }
    results {
      name
      image
      status
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
          `})
        .then(result => result.data)
        .then((data) => {
          setCharacters(data.characters)
          setPagesQtd(data.characters.info.pages)
        })
        .catch(error => setErr(error));
         
}

function handleNext() {
  if(page >= 1 && page < pagesQtd) {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }
}

function handlePrev() {
  if(page !== 1) {
    setPage (page - 1);
    window.scrollTo(0, 0);
  }
}

function handleText(event) {
  setPage(1);
  setText(event.target.value)
}
  
if(characters.length === 0) {
    return <div>Carregando...</div>
  }

  

  return (
    <div>
      <p>Página: {page} de {pagesQtd}</p>
      <input value={text} onChange={handleText}/>
      <button onClick={handlePrev}>Voltar</button>
      <button onClick={handleNext}>Avançar</button>
      {characters.results.map((item, index)=> (
        <p key={index}>
          <img src={item.image} style={{width: '150px'}} /><br/>
          <span>{item.name}</span> - {item.status}
        </p>
      ))}
      
      
    </div>
  )

}

export default Characters;