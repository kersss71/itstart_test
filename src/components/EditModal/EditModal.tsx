import React from "react";
import { useState } from "react";
import { ISeminar } from "../../store/SeminarSlice";
import styles from "./EditModal.module.css";

interface IEditModalProps {
  seminar: ISeminar;
  onClose: () => void;
  onSave: (updatedSeminar: ISeminar) => void;
}

export const EditModal: React.FC<IEditModalProps> = ({
  seminar,
  onClose,
  onSave,
}) => {
  const [editedSeminar, setEditedSeminar] = useState<ISeminar>({ ...seminar });
  
  // Обработчик изменения полей формы

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedSeminar({ ...editedSeminar, [e.target.name]: e.target.value });
  };
  
  // Обработчик сохранения изменений

  const handleSave = () => {
    onSave(editedSeminar);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Редактировать семинар</h2>
        <label>
          Название:
          <input
            type="text"
            name="title"
            value={editedSeminar.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Описание:
          <textarea
            name="description"
            value={editedSeminar.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Дата:
          <input
            type="date"
            name="date"
            value={editedSeminar.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Время:
          <input
            type="time"
            name="time"
            value={editedSeminar.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Ссылка на фото:
          <input
            type="text"
            name="photo"
            value={editedSeminar.photo}
            onChange={handleChange}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
