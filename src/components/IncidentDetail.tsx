import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncidentById, updateIncident } from '../api';
import type { Incident } from '../types';

const IncidentDetail: React.FC = () => {
  // Получаем ID из URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Состояние для хранения данных инцидента
  const [incident, setIncident] = useState<Incident | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем данные при первом рендере
  useEffect(() => {
    if (id) {
      getIncidentById(id)
        .then((response) => {
          setIncident(response.data);
          setNewStatus(response.data.status); 
        })
        .catch(() => alert('Ошибка загрузки деталей инцидента'))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  // Функция сохранения обновленного статуса
  const handleSave = async () => {
    if (!incident || !id) return;
    try {
      await updateIncident(id, { status: newStatus as any });
      alert('Статус успешно обновлен!');
      navigate('/'); // Возвращаемся на главную
    } catch (error) {
      alert('Не удалось обновить статус');
    }
  };

  if (isLoading) return <div className="loading-text">Загрузка данных...</div>;
  if (!incident) return <div className="error-text">Инцидент не найден.</div>;

  return (
    <div className="container detail-card">
      <button onClick={() => navigate('/')} className="btn-back">← Назад к списку</button>
      
      <div className="detail-header">
        <h2 className="title">Инцидент #{incident.id}</h2>
        <span className={`severity-badge severity-${
          incident.severity === 'Высокая' ? 'high' : incident.severity === 'Средняя' ? 'medium' : 'low'
        }`}>
          {incident.severity}
        </span>
      </div>

      <div className="detail-info">
        <p><strong>Заголовок:</strong> {incident.title}</p>
        <p><strong>Тип:</strong> {incident.type}</p>
        <p><strong>Дата регистрации:</strong> {incident.date}</p>
        
        <div className="description-box">
          <strong>Описание:</strong>
          <p>{incident.description}</p>
        </div>
        <div className="status-editor">
          <label>Текущий статус:</label>
          <select 
            value={newStatus} 
            onChange={(e) => setNewStatus(e.target.value)}
            className="status-select"
          >
            <option value="На рассмотрении">На рассмотрении</option>
            <option value="В процессе">В процессе</option>
            <option value="Завершен">Завершен</option>
            <option value="Ложное срабатывание">Ложное срабатывание</option>
          </select>
          <button onClick={handleSave} className="btn-save">Сохранить изменения</button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;