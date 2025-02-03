import React from "react";
import styles from "./Error.module.css";

interface ErrorProps {
  message: string;
}

// Компонент для отображения ошибок

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <div className={styles.error}>{message}</div>;
};

export default Error;
