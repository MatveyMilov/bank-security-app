import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIncidentById, updateIncident } from "../api";
import type { Incident } from "../types";

const IncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getIncidentById(id)
        .then((response) => {
          setIncident(response.data);
        })
        .catch(() => alert("Ошибка загрузки деталей инцидента"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setIncident((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!incident || !id) return;
    // проверка на валидацию
    if (!incident.title.trim()) {
      alert("Заголовок не может быть пустым");
      return;
    }
    if (!incident.type.trim()) {
      alert("Укажите тип угрозы");
      return;
    }
    if (!incident.description.trim()) {
      alert("Описание обязательно для заполнения");
      return;
    }

    // если проверка пройдена то отправляем данные
    try {
      await updateIncident(id, incident);
      alert("Данные успешно сохранены!");
      navigate("/");
    } catch (error) {
      alert("Ошибка при сохранении данных");
    }
  };

  if (isLoading) return <div className="loading-text">Загрузка данных...</div>;
  if (!incident) return <div className="error-text">Инцидент не найден.</div>;

  return (
    <div className="container detail-card">
      <button onClick={() => navigate("/")} className="btn-back">
        ← Назад к списку
      </button>

      <div className="detail-header">
        <h2 className="title">Редактирование инцидента #{incident.id}</h2>
      </div>

      <div className="detail-info">
        {}
        <div className="form-group">
          <label>Заголовок:</label>
          <input
            name="title"
            className="input-field"
            value={incident.title}
            onChange={handleChange}
          />
        </div>

        {}
        <div className="form-group">
          <label>Тип угрозы:</label>
          <input
            name="type"
            className="input-field"
            value={incident.type}
            onChange={handleChange}
          />
        </div>

        {}
        <div className="form-group">
          <label>Критичность:</label>
          <select
            name="severity"
            value={incident.severity}
            onChange={handleChange}
            className="status-select"
          >
            <option value="Низкая">Низкая</option>
            <option value="Средняя">Средняя</option>
            <option value="Высокая">Высокая</option>
          </select>
        </div>

        {}
        <div className="form-group">
          <label>Подробное описание:</label>
          <textarea
            name="description"
            className="textarea-field"
            value={incident.description}
            onChange={handleChange}
            rows={5}
          />
        </div>

        {}
        <div className="form-group">
          <label>Текущий статус:</label>
          <select
            name="status"
            value={incident.status}
            onChange={handleChange}
            className="status-select"
          >
            <option value="На рассмотрении">На рассмотрении</option>
            <option value="В процессе">В процессе</option>
            <option value="Завершен">Завершен</option>
            <option value="Ложное срабатывание">Ложное срабатывание</option>
          </select>
        </div>

        <button onClick={handleSave} className="btn-save">
          Сохранить все изменения
        </button>
      </div>
    </div>
  );
};

export default IncidentDetail;
