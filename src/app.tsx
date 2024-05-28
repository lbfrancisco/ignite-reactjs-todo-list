import { useState, type ChangeEvent, type FormEvent } from 'react'
import { PlusCircle, ScrollText } from 'lucide-react'

import { Button } from './components/button'
import { Header } from './components/header'
import { Task, type TaskType } from './components/task'

import styles from './app.module.css'

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [newTask, setNewTask] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTaskToCreate = {
      id: crypto.randomUUID(),
      content: newTask,
      isChecked: false,
    }

    setTasks((prev) => [...prev, newTaskToCreate])
    setNewTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function toggleTaskStatus(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task,
      ),
    )
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const createdTasksCount = tasks.length
  const finishedTasksCount = tasks.filter((task) => task.isChecked).length
  const newTaskIsEmpty = newTask.length === 0

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.container}>
        <form>
          <label className={styles['sr-only']} htmlFor="new-task">
            Adicione uma nova tarefa
          </label>
          <input
            className={styles['input-new-task']}
            type="text"
            id="new-task"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            value={newTask}
          />
          <Button
            type="submit"
            typeStyle="create"
            onClick={handleCreateNewTask}
            disabled={newTaskIsEmpty}
          >
            Criar <PlusCircle />
          </Button>
        </form>
        <div>
          <header className={styles['task-header']}>
            <div className={styles['all-tasks']}>
              Tarefas criadas <span>{createdTasksCount}</span>
            </div>
            <div className={styles['finished-tasks']}>
              Concluídas{' '}
              <span>
                {finishedTasksCount} de {createdTasksCount}
              </span>
            </div>
          </header>
          <div className={styles['task-list']}>
            {tasks.length === 0 && (
              <div className={styles['no-tasks']}>
                <ScrollText />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}
            {tasks.length > 0 &&
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={handleDeleteTask}
                    onToggleStatus={toggleTaskStatus}
                  />
                )
              })}
          </div>
        </div>
      </main>
    </div>
  )
}
