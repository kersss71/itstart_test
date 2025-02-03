import React from "react";
import { ISeminar } from "../../store/SeminarSlice"
import styles from "./SeminarItem.module.css";

interface SeminarItemProps {
  seminar: ISeminar;
  onDelete: (id: number) => void;
  onEdit: (seminar: ISeminar) => void;
}

const SeminarItem: React.FC<SeminarItemProps> = ({ seminar, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <img src={seminar.photo} alt={seminar.title} />
      <div className={styles.cardContent}>
        <h2>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <p>{seminar.date}</p>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.button} onClick={() => onDelete(seminar.id)}>
          Удалить
        </button>
        <button className={`${styles.button} ${styles.edit}`} onClick={() => onEdit(seminar)}>
          Редактировать
        </button>
      </div>
    </div>
  );
};

export default SeminarItem;