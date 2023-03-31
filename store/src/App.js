import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import AddBook from './components/AddBook';
import Books from './components/Book/BookList';
import About from './components/About';
import { Routes, Route } from "react-router-dom";
import BookDetails from './components/Book/Bookdetails';
import SearchHome from './components/SearchHome';
import SubjectPage from './components/SearchSubject';
import '@fontsource/roboto/400.css';



function App() {
    // const [data, setData] = useState(null);
    // const [query, setQuery] = useState("");
    // const [pageCount, setPageCount] = useState(1);
    // const [loading, setLoading] = useState(false);

    // const searchQuery = (e) => {
    //     setPageCount(1);
    //     fetchData();
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [pageCount]);

    // const fetchData = () => {
    //     setLoading(true);
    //     fetch(
    //         "https://openlibrary.org/search.json?q=" +
    //         query +
    //         "&limit=10&page=" +
    //         pageCount
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data.numFound ? setData(data) : setData(null);
    //             setLoading(false);
    //         });
    // };

    // const prevClick = () => {
    //     setPageCount((prev) => prev - 1);
    // };

    // const nextClick = () => {
    //     setPageCount((prev) => prev + 1);
    // };


  return (
      <React.Fragment>
          <header>
              <Header />
          </header>
          <main>
              <Routes>
                  <Route path='/' element={<Home />} exact />
                  <Route path='/add' element={<AddBook />} exact />
                  <Route path='/books' element={<Books />} exact />
                  <Route path='/about' element={<About />} exact />
                  <Route path='/books/:id' element={<BookDetails />} exact />
                  <Route path='/search' element={<SearchHome />} exact />
                  <Route
                      path="/subject/design"
                      element={<SubjectPage subject="design" />}
                  />
                  <Route
                      path="/subject/programming"
                      element={<SubjectPage subject="programming" />}
                  />
                  <Route
                      path="/subject/finance"
                      element={<SubjectPage subject="finance" />}
                  />
                  <Route
                      path="/subject/exercise"
                      element={<SubjectPage subject="exercise" />}
                  />
                  <Route
                      path="/subject/management"
                      element={<SubjectPage subject="management" />}
                  />
                  {/* <Route path='/bookSearched/:name' element={<BookSearched />} exact /> */}
              </Routes>
          </main>
      </React.Fragment >
  );
}

export default App;
