import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeminars,
  deleteSeminar,
  updateSeminar,
} from "../../store/SeminarSlice";
import { RootState, AppDispatch } from "../../store/store";
import { ISeminar } from "../../store/SeminarSlice";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import EditModal from "../EditModal/EditModal";
import SeminarItem from "../SeminarItem/SeminarItem";
import styles from "./SeminarList.module.css";

const SeminarList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { seminars, loading, error } = useSelector(
    (state: RootState) => state.seminars
  );

  const [isEditing, setIsEditing] = useState(false);
  const [currentSeminar, setCurrentSeminar] = useState<ISeminar | null>(null);

  // Функция для сохранения изменений семинара

  const handleSave = (updatedSeminar: ISeminar) => {
    dispatch(updateSeminar(updatedSeminar));
    setIsEditing(false);
    setCurrentSeminar(null);
  };

  // Запрос данных семинаров при монтировании компонента

  useEffect(() => {
    dispatch(fetchSeminars());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className={styles.list}>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDelete={() => dispatch(deleteSeminar(seminar.id))}
          onEdit={(seminar) => {
            setIsEditing(true);
            setCurrentSeminar(seminar);
          }}
        />
      ))}
      {isEditing && currentSeminar && (
        <EditModal
          seminar={currentSeminar}
          onClose={() => {
            setIsEditing(false);
            setCurrentSeminar(null);
          }}
          onSave={handleSave}
        />
      )}
      {seminars.length === 0 && (
        <p className={styles.empty}>Семинары не найдены</p>
      )}
    </div>
  );
};

export default SeminarList;
