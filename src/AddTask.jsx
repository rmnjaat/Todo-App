import { useState  } from "react";
function AddTask({handleAdd}){
    const [text , setText ] = useState('')
    function  handleChange(e){
        setText(e.target.value);
        console.log("setChsanged called ")
    }
    return<>
    <input className="input" type="text" value={text} onChange={handleChange}  placeholder="ex : Make Tea..."/>
    <button onClick={()=>{
        handleAdd(text);
        setText('');
    }} className="button">Add</button>

    
    </>
}

export default AddTask;