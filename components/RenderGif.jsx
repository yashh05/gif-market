import React, { useContext, useEffect, useState } from 'react'
import { render } from 'react-dom';
import Loader from './Loader';
import axios from 'axios';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import userContext from '@/context/user/userState';

function RenderGif(props) {
    const { user } = useContext(userContext);

    const [loading,setLoading]=useState(false)
    const indexOfLastItem = props.currentPage * props.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - props.itemsPerPage;
    const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(()=>{

        const fetchGifs=async ()=>{
            setLoading(true);

            const result = await axios.get("https://api.giphy.com/v1/gifs/search", {
              params: {
                api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                q: props.search,
                limit: 100,
              },
            });
        
            props.setData(result.data.data);
            setLoading(false);
        }

        fetchGifs();

    },[props.search])


    const addToFav = async (email, gif) => {
        const docRef = doc(db, "favorites", email);
    
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const checkDoc = docSnap.data().gifArray.find((element) => {
              return element.id === gif.id;
            });
            if (checkDoc) {
              alert("This GIF is already in your favorites");
            } else {
              const newGifArray = [...docSnap.data().gifArray, gif];
              return await updateDoc(docRef, {
                gifArray: newGifArray,
              });
            }
          } else {
            await setDoc(doc(db, "favorites", email), {
              gifArray: [gif],
            });
          }
        } catch (error) {
          console.log(error);
        }
      };


    const rendergifs = () => {
        if (loading) {
          return <Loader />;
        }
        return currentItems.map((el) => {
          return (
            <div className="group relative w-48" key={el.id}
            >
              <div
                className="hover:opacity-25 my-auto transition ease-in-out delay-150 "
              >
                <img src={el.images.fixed_height.url} />
              </div>
              <button
                onClick={() => addToFav(user.email, el)}
                className=" absolute  bottom-2 right-0 group-hover:z-50 transition ease-in-out delay-150 text-center opacity-[0] group-hover:opacity-100 rounded-lg text-white w-40 font-bold text-lg"
              >
                <i className="far fa-heart fa-2xl w-60"></i>
              </button>
            </div>
            // </div>
          );
        });
      };


  return (
    <div className='flex flex-wrap m-auto gap-5 justify-center'>
       {rendergifs()}
    </div>
  )
}

export default RenderGif