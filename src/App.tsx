import React, { useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import { Todo } from './Components/model';
import TodosList from './Components/TodosList';
 import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import { sortAndDeduplicateDiagnostics } from 'typescript';

function App() {
  const [todo, setTodo]= useState<string>("");
  const [todos, setTodos]= useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos]= useState<Todo[]>([]);
  
  const handleAdd =(e: React.FormEvent)=>{
    e.preventDefault();
    if (todo){
      setTodos([...todos,{id:Date.now(), todo, isDone:false}]);
      setTodo("");
    }
  }
  
  // console.log(todos);
  const onDragEnd=(result:DropResult)=>{
    const {destination,source}= result
    if(!destination) return;
    if(destination.droppableId===source.droppableId&& destination.index===source.index) return;
    let add,active=todos,complete=completedTodos;

    if(source.droppableId==='TodosList'){
      add=active[source.index];
      active.splice(source.index,1);
    }else{
      add= complete[source.index];
      complete.splice(source.index,1);
      
    }

    if(destination.droppableId==='TodosList'){
      active.splice(destination.index,0, add);
    }else{
      complete.splice(destination.index,0, add);
    }

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <h2 className='heading'>Task List</h2>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodosList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
    </div>
    </DragDropContext>
  );
}

export default App;
