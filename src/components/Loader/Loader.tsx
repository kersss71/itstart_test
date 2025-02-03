import React from 'react'
import styles from './Loader.module.css'


// Компонент для отображения загрузки

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader