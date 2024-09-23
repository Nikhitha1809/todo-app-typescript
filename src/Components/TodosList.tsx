import React from 'react'
import './Styles.css';
import { Todo } from './model';
import './SingleTodo';
import SingleTodo from './SingleTodo';
import { Droppable,DragDropContext } from 'react-beautiful-dnd';

interface Props{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos:Todo[];
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}
function TodosList({todos,setTodos, completedTodos, setCompletedTodos}:Props) {
  const onDragEnd = (result: any) => {
  const{source,destination}=result;
  if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        let movedTodo: Todo;
        let updatedTodos: Todo[] = [...todos];
        let updatedCompletedTodos: Todo[] = [...completedTodos];

        if (source.droppableId === 'TodosList') {
            movedTodo = todos[source.index];
            updatedTodos.splice(source.index, 1);
        } else {
            movedTodo = completedTodos[source.index];
            updatedCompletedTodos.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodosList') {
            updatedTodos.splice(destination.index, 0, movedTodo);
            setTodos(updatedTodos);
            setCompletedTodos(updatedCompletedTodos.map(todo => todo.id === movedTodo.id ? { ...todo, isDone: false } : todo));
        } else {
            updatedCompletedTodos.splice(destination.index, 0, movedTodo);
            setCompletedTodos(updatedCompletedTodos);
            setTodos(updatedTodos.map(todo => todo.id === movedTodo.id ? { ...todo, isDone: true } : todo));
        }
    };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className='container'>
       <Droppable droppableId='TodosList'>
        {(provided, snapshot)=>( 
          <div className={`todos ${snapshot.isDraggingOver?"dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
          <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo, index)=>(
                <SingleTodo todo={todo} index={index} key={todo.id} todos={todos} setTodos={setTodos}/>
                )
            )}
            {provided.placeholder}
        </div>
         )} 
      </Droppable>
    <Droppable droppableId='TodosRemove'>
      {(provided,snapshot)=>(
        <div className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo,index)=>(
                <SingleTodo todo={todo} index={index} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos}/>
                )
            )}
            {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
     </DragDropContext>
  )
}

export default TodosList