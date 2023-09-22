import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useDebounce } from "use-debounce";
import Paginate from "./Paginate";
import Link from "next/link";
import userContext from "@/context/user/userState";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebaseConfig";
import RenderGif from "./RenderGif";

function Giphy() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [debounceSearch] = useDebounce(search, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // const handleSearchChange = async (e) => {
  //   setSearch(e.target.value);

  // };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="  m-2 flex justify-center items-center ">
        <input
          type="text"
          placeholder="search"
          className=" mx-auto rounded-lg p-3 text-lg focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className=" mx-auto mt-20 w-4/5 flex flex-wrap justify-center">
        <RenderGif
          search={debounceSearch}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          pageSelected={pageSelected}
          data={data}
          setData={setData}
        />
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
