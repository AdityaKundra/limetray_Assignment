import './App.css'
import Todo from './components/Todo'
import { TaskProvider } from './context/TaskContext'
function App() {
  return (
    <>
    <TaskProvider>
      <Todo/>
    </TaskProvider>
    </>
  )
}

export default App
