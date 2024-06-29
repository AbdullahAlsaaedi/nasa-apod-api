function Main({data}) {

    return (
        <div className="imgContainer">
            <img className="bgImage" src={data?.hdurl} alt={data?.title || 'bg-img'}/>
        </div>
    );
}

export default Main;