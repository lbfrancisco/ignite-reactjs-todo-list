import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './styles.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  typeStyle: 'create' | 'delete'
}

export function Button({ children, typeStyle, ...props }: ButtonProps) {
  return (
    <button
      className={
        typeStyle === 'create'
          ? styles['create-button']
          : styles['delete-button']
      }
      {...props}
    >
      {children}
    </button>
  )
}
