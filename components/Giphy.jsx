import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import useDebounce from "./useDebounce";
import Paginate from "./Paginate";
import Link from "next/link";

function Giphy() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = async (e) => {
    setSearch(e.target.value);
    setLoading(true);

    const result = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
        q: e.target.value,
        limit: 100,
      },
    });

    setData(result.data.data);
    console.log(data);
    setLoading(false);
  };

  const renderGifs = () => {
    if (loading) {
      return <Loader />;
    }
    return currentItems.map((el) => {
      return (
        <div className="group relative">
          <div
            key={el.id}
            className="hover:opacity-25 transition ease-in-out delay-150 "
          >
            <img src={el.images.fixed_height.url} />
          </div>
          <button class=" absolute  bottom-2 right-0 group-hover:z-50 transition ease-in-out delay-150 text-center opacity-[0] group-hover:opacity-100 rounded-lg text-white w-40 font-bold text-lg">
          <i className="far fa-heart fa-2xl w-60"></i>
          </button>
        </div>
        // </div>
      );
    });
  };
  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="  m-2 flex justify-center items-center ">
        <input
          type="text"
          placeholder="search"
          value={search}
          className=" mx-auto rounded-lg p-3 text-lg focus:outline-none"
          onChange={handleSearchChange}
        />
        <Link
          href="/favorites"
          className="underline text-2xl fonr-bold text-white mr-10"
        >
          Favs
        </Link>
      </div>
      <div className=" mx-auto mt-20 w-4/5 flex flex-wrap justify-center">
        {renderGifs()}
      </div>
      <div>
        <Paginate
          pageSelected={pageSelected}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
        />
      </div>
    </>
  );
}

export default Giphy;
