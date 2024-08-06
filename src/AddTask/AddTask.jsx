import { useState  } from "react";
function AddTask({handleAdd}){
    const [text , setText ] = useState('')
    function  handleChange(e){
        setText(e.target.value);
    }
    return<>
    <input className="input" type="text" value={text} onChange={handleChange}  placeholder="ex : Make Tea..."/>
    <button onClick={()=>{
        handleAdd(text);
        setText('');
    }} className="button" disabled={text.length==0}>Add</button>

    
    </>
}

export default AddTask;