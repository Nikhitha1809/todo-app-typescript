import React, { useEffect, useRef, useState } from 'react';
import {FaEdit} from 'react-icons/fa';
import { MdFileDownloadDone,MdDelete  } from "react-icons/md";
import { Todo } from './model';
import './Styles.css';
import  {Draggable} from'react-beautiful-dnd';

interface Props{
    index:number;
    todo:Todo;
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function SingleTodo({todo,todos,setTodos,index}:Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [edit,setEdit] = useState<boolean>(false);
    const [editTodo,setEditTodo]= useState<string>(todo.todo);

    const handleDone =(id: number)=>{
        setTodos(todos.map((todo)=>
            todo.id===id?{...todo,isDone:!todo.isDone}:todo))
        
    }
    const handleDelete=(id:number)=>{
        setTodos(todos.filter((todo)=>todo.id!==id?{...todo, isDone:!todo.isDone}:""))
    }
    const handleEdit=(e:React.FormEvent, id:number)=>{
        e.preventDefault();
        setTodos(todos.map((todo)=>todo.id===id?{...todo,todo:editTodo}:todo))
        setEdit(false)
    }
    
    useEffect(()=>{
        inputRef.current?.focus();
    },[edit])
  return (
    <Draggable draggableId ={todo.id.toString()} index={index}>
    {(provided,snapshot)=>(
        <form className={`todos__single ${snapshot.isDragging?"drag":""}`} onSubmit={(e)=>handleEdit(e,todo.id)} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps} 
        ref={provided.innerRef}>
            {edit?
            (<input value={editTodo} onChange={(e)=>{setEditTodo(e.target.value)}} ref={inputRef} className='todos__single--text'/>):
            (todo.isDone?(<s className='todos__single--text'>{todo.todo}</s>):(<span className='todos__single--text'>{todo.todo}</span>))
            }
            
            
            <div className='icons-container'>
                <span className='icon'onClick={()=>{if(!edit && !todo.isDone){setEdit(!edit)}}}><FaEdit /></span>
                <span className='icon' onClick={()=>handleDelete(todo.id)}><MdDelete/></span>
                <span className='icon' onClick={()=>handleDone(todo.id)}><MdFileDownloadDone/></span>
            
            </div>
            
        </form>
         )}
         </Draggable>
  )
}

export default SingleTodo