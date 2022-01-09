import { useState } from 'react';
import './App.scss';

function App() {
  const [todo, setTodo] = useState([])


  return (
    <div className='todo'>
      <h1 className='todo__head'>Todo app: {todo.length}</h1>

      <input 
       className='todo__input'
       onKeyPress={(e) =>{
        if (e.code === 'Enter') {
          let newTodo = {
            id: new Date().getTime(),
            content: e.target.value,
            isCompleted: false,
          }

          setTodo([newTodo, ...todo])
          e.target.value = null
        }
      }}
      placeholder={'typing...'}/>


      <ul className='todo__list'>
        {
          todo.map(item => {
            return (
              <li
              style={{color: item.isCompleted ? 'red' : 'gold'}}
                className='todo__item'
                key={item.id}>
                  <input
                   onChange={(e) => {
                    const todoId = e.target.dataset.id
                    const findTodo = todo.find(i => i.id === Number(todoId))
                    findTodo.isCompleted = !findTodo.isCompleted
                   }}
                   data-id={item.id}
                   type={'checkbox'}/>
                {item.content}
                <button className='todo__button'
                onClick={(e) => {
                  let filteredTodo = todo.filter(i => i.id !== item.id)
                  alert('Delete !!!',setTodo(filteredTodo, ...todo))
                }}>delete</button>
              </li> 
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
