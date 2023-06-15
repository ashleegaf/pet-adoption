import Pet from './components/Pet';

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name='Luna' animal='dog' breed='bulldog' />
      <Pet name='Pepper' animal='bird' breed='cockatiel' />
      <Pet name='Greeny' animal='cat' breed='Mixed' />
    </div>
  );
};

export default App;
