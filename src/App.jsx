import Main from "./components/main.jsx";
import SideBar from "./components/SideBar.jsx";
import Footer from "./components/Footer.jsx";
import {useEffect, useState} from "react";


function App() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAPIData () {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
            const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

            const today = (new Date()).toDateString();
            const localKey = `NASA-${today}`;

            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey));
                setData(apiData);
                console.log("Data fetched from Cache");
                return;
            }

            localStorage.clear();
            console.log('hey')


            const res = await fetch(url);
            const apiData = await res.json();

            localStorage.setItem(localKey, JSON.stringify(apiData));
            setData(apiData);
            console.log("Data fetched from API");
        }
        fetchAPIData();
    }, [])

    function handleToggleModal() {
        setShowModal((showModal) => !showModal);
    }
  return (
    <>
        {data ? (<Main data={data}/>) : (
            <div className="loadingState">
                <i className="fa-solid fa-gear"></i>
            </div>
        )}
        {showModal && <SideBar data={data} handleToggleModal={handleToggleModal}/> }
        {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>) }
    </>
  )
}

export default App
