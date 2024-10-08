import React, { useRef } from 'react'
import  './Styles.css';

interface Props{
    todo: string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent)=>void;
}

function InputField({todo,setTodo, handleAdd}:Props) {
  
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
        <form className='input' onSubmit={(e)=>{handleAdd(e); inputRef.current?.blur();}}>
            <input ref={inputRef} type='input' placeholder='Enter text here' className='input__box' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button className='input__submit' type='submit'>Go</button>
        </form>
    </div>

  )
}

export default InputField