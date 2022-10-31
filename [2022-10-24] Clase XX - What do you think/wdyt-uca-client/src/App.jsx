import classes from './App.module.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Feed from './components/Feed/Feed';

function App() {
  return (
    <div className={classes["App"]} >
      { /* HEADER */}
      <Header />

      { /* MAIN > Los hijos son reemplazables */}
      <main>
        <Feed />
      </main>

      { /* FOOTER */}
      <Footer />
    </div>
  )
}

export default App