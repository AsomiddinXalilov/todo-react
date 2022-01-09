import { useState } from 'react';
import './App.scss';

function App() {
  const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem('todos')) || [])
  const [modal, setModal] = useState(false)

  return (
    <div className='todo'>
      <button 
       onClick={() => setModal(!modal)}
       className='btn'>Instruction: todo app</button>
      <h1 className='todo__head'>Todo app: {todo.length}</h1>

      {modal && <div className='inst'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus libero ipsam, labore at inventore architecto autem laboriosam error saepe expedita vero voluptate quam temporibus.</div>}      

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

          window.localStorage.setItem('todos', JSON.stringify([newTodo, ...todo]))
          e.target.value = null
        }
      }}
      placeholder={'typing...'}/>


      <ul className='todo__list'>
        {
          todo.map(item => {
            return (
              <li
              className='todo__item'
                style={{color: item.isCompleted ? 'orange' : 'darkred'}}
                key={item.id}>
                  <input
                   onChange={(e) => {
                    const todoId = e.target.dataset.id
                    const findTodo = todo.find(i => i.id === Number(todoId))
                    findTodo.isCompleted = !findTodo.isCompleted

                    setTodo([...todo])
                    window.localStorage.setItem('todos', JSON.stringify([...todo]))
                   }}
                   data-id={item.id}
                   type={'checkbox'}/>
                {item.content}
                <button className='todo__button'
                  onClick={(e) => {
                  let filteredTodo = todo.filter(i => i.id !== item.id)
                  alert('delete !!!',setTodo(filteredTodo))

                  window.localStorage.setItem('todos', JSON.stringify(filteredTodo))
                }}>x</button>
              </li> 
            )
          })
        }
      </ul>
    </div>
      );
      }

export default App;
