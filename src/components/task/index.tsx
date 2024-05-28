import { Check, Trash } from 'lucide-react'

import { Button } from '../button'

import styles from './styles.module.css'

export interface TaskType {
  id: string
  content: string
  isChecked: boolean
}

interface TaskProps {
  task: TaskType
  onDeleteTask: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function Task({ task, onDeleteTask, onToggleStatus }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  function handleToggleStatus() {
    onToggleStatus(task.id)
  }

  const checkboxCheckedClassName = task.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']

  const taskCheckedClassName = task.isChecked ? styles['paragraph-checked'] : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleToggleStatus}>
          <input readOnly type="checkbox" checked={task.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassName}`}>
            {task.isChecked && <Check size={16} />}
          </span>
          <p className={`${styles.paragraph} ${taskCheckedClassName}`}>
            {task.content}
          </p>
        </label>
      </div>
      <Button type="button" typeStyle="delete" onClick={handleDeleteTask}>
        <Trash />
      </Button>
    </div>
  )
}
