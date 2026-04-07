import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncidentById, updateIncident } from '../api';
import type { Incident } from '../types';



const IncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id) {
      getIncidentById(id)
        .then((res) => setIncident(res.data))
        .catch(() => alert('Ошибка загрузки'))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIncident(prev => prev ? { ...prev, [name]: value } : null);
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSave = async () => {
    if (!incident || !id) return;

    const newErrors: Record<string, string> = {};
    if (!incident.title.trim()) newErrors.title = 'Заголовок не может быть пустым';
    if (!incident.type.trim()) newErrors.type = 'Укажите тип угрозы';
    if (!incident.description.trim()) newErrors.description = 'Описание обязательно';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
    const { id: _, ...updateData } = incident; 
    await updateIncident(id, updateData); 
    navigate('/');
    } catch (err) {
    setError('Ошибка при сохранении на сервере. Проверьте консоль (F12)');
    console.error(err);
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (!incident) return <div>Не найдено</div>;

  return (
    <div className="container detail-card">
      <button onClick={() => navigate('/')} className="btn-back">← Назад</button>
      <div className="detail-info">
        <div className="form-group">
          <label>Заголовок:</label>
          <input name="title" className={`input-field ${errors.title ? 'input-error' : ''}`} value={incident.title} onChange={handleChange} />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Тип угрозы:</label>
          <input name="type" className={`input-field ${errors.type ? 'input-error' : ''}`} value={incident.type} onChange={handleChange} />
          {errors.type && <span className="field-error">{errors.type}</span>}
        </div>

        <div className="form-group">
          <label>Описание:</label>
          <textarea name="description" className={`textarea-field ${errors.description ? 'input-error' : ''}`} value={incident.description} onChange={handleChange} />
          {errors.description && <span className="field-error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Статус:</label>
          <select name="status" value={incident.status} onChange={handleChange} className="status-select">
            <option value="На рассмотрении">На рассмотрении</option>
            <option value="В процессе">В процессе</option>
            <option value="Завершен">Завершен</option>
          </select>
        </div>

        <button onClick={handleSave} className="btn-save">Сохранить изменения</button>
      </div>
    </div>
  );
};

export default IncidentDetail;