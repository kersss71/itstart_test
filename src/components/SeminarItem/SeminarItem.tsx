import React from "react";
import { useState } from "react";
import { ISeminar } from "../../store/SeminarSlice";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import styles from "./SeminarItem.module.css";

interface SeminarItemProps {
  seminar: ISeminar;
  onDelete: (id: number) => void;
  onEdit: (seminar: ISeminar) => void;
}

const SeminarItem: React.FC<SeminarItemProps> = ({
  seminar,
  onDelete,
  onEdit,
}) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleDelete = () => {
    setIsConfirming(true);
  };

  const handleConfirmDelete = () => {
    onDelete(seminar.id);
    setIsConfirming(false);
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <div className={styles.card}>
      <img src={seminar.photo} alt={seminar.title} />
      <div className={styles.cardContent}>
        <h2>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <p>{seminar.date}</p>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.button} onClick={handleDelete}>
          Удалить
        </button>
        <button
          className={`${styles.button} ${styles.edit}`}
          onClick={() => onEdit(seminar)}
        >
          Редактировать
        </button>
      </div>
      {isConfirming && (
        <ConfirmModal
          message="Вы уверены, что хотите удалить этот семинар?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default SeminarItem;
