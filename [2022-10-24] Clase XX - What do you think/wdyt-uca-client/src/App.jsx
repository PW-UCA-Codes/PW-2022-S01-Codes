import classes from './App.module.scss';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import NotFoundView from './views/NotFoundView/NotFoundView';
import FeedView from './views/FeedView/FeedView';
import AuthView from './views/AuthView/AuthView';

function App() {
  return (
    <div className={classes["App"]} >
      { /* HEADER */}
      <Header />

      { /* MAIN > Los hijos son reemplazables */}
      <main>
        <Routes>
          <Route index element={<FeedView />} />
          <Route path='auth/*' element={<AuthView />} />
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </main>

      { /* FOOTER */}
      <Footer />
    </div>
  )
}

export default App