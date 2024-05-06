import { ReactNode } from 'react'
import styles from './Alert.module.css'

type AlertProps = {
    children : ReactNode
}

const Alert = ({children}: AlertProps) => {
  return (
    <div className={styles.alert}>
      {children}
    </div>
  )
}

export default Alert
