import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Book from "../Asset/BookComponent/BookComponent";
import Search from "../Asset/SearchComponent/SearchComponent";
import Loader from "../Asset/Loader/Loader";
import { Button } from '@mui/material';

export default function HomePage() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(false);

    const searchQuery = (e) => {
        setPageCount(1);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [pageCount]);

    const fetchData = () => {
        setLoading(true);
        var q = query ? query : "programming";
        fetch(
            "https://openlibrary.org/search.json?q=" +
            q +
            "&limit=10&page=" +
            pageCount
        )
            .then((res) => res.json())
            .then((data) => {
                data.numFound ? setData(data) : setData(null);
                setLoading(false);
            });
    };

    const prevClick = () => {
        setPageCount((prev) => prev - 1);
    };

    const nextClick = () => {
        setPageCount((prev) => prev + 1);
    };

    return (
        <div className="main">
            <Search
                placeholder="Search by name or author"
                value={query}
                setValue={setQuery}
                searchClick={searchQuery}
                focus={true}
            />

            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
            <div>
                <h1 style={{ marginBottom: 39, marginTop: 15, textAlign: "center", fontWeight: "200" }}>
                    Top trending subjects
                </h1>
                <div className="trending-subjects">
                    <Button variant="outlined" onClick={() => (navigate('/subject/design'))} className="btN" >Design
                    </Button>
                    <Button variant="outlined" onClick={() => (navigate('/subject/programming'))} className="btN">Programming</Button>
                    <Button variant="outlined" onClick={() => (navigate('/subject/finance'))} className="btN">Finance</Button>
                    <Button variant="outlined" onClick={() => (navigate('/subject/exercise'))} className="btN">Exercise</Button>
                    <Button variant="outlined" onClick={() => (navigate('/subject/management'))} className="btN">Management</Button>
                </div>
            </div>
            <div className="books-container">
                {/* {!data && (
          <div style={{ textAlign: "center" }}>
            <p> No records found</p>
            <h4> Please search something </h4>
          </div>
        )} */}
                {data &&
                    data.docs.map((d, i) => {
                        return (
                            <Book
                                key={i}
                                title={d.title}
                                author={d.author_name && d.author_name.map((d) => `${d}, `)}
                                coverId={d.cover_i}
                            />
                        );
                    })}
            </div>
            {data && (
                <div className="btn-box">
                    <button
                        type="button"
                        className="btn"
                        onClick={prevClick}
                        disabled={pageCount <= 1}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={nextClick}
                        disabled={pageCount >= data.numFound / 10}
                    >
                        Next
                    </button>
                </div>
            )}
            <Loader state={loading} />
        </div>
    );
}
