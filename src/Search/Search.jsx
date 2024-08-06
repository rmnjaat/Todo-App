import { useState } from "react";

function Search({onSearch}){
    return<>
        <input type="text" onChange={(e)=>{onSearch(e.target.value)}} placeholder="Search here" className="input search"/>
        
    </>
}


export default Search;