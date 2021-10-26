import { client } from './config/client-graphql';
import { ApolloProvider } from '@apollo/client';
import Characters from './components/Characters';


function App() {

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Characters/>
    </div>
    </ApolloProvider>
  );
}

export default App;
