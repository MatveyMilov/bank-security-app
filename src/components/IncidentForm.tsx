import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIncident } from '../api';

const IncidentForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<'Низкая' | 'Средняя' | 'Высокая'>('Средняя');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return alert('Заполните все поля');

    try {
      await createIncident({
        title,
        severity,
        description,
        type: 'Взлом', 
        status: 'На рассмотрении',
        date: new Date().toLocaleDateString('ru-RU'),
      });
      navigate('/');
    } catch (err) {
      alert('Ошибка при сохранении');
    }
  };

  return (
    <div className="container">
      <div className="incident-form">
        <h2 className="title">Регистрация нового инцидента</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Заголовок события:</label>
            <input 
              type="text" 
              className="input-field"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Введите заголовок"
            />
          </div>

          <div className="form-group">
            <label>Критичность:</label>
            <select 
              className="status-select"
              value={severity} 
              onChange={(e) => setSeverity(e.target.value as 'Низкая' | 'Средняя' | 'Высокая')}
            >
              <option value="Низкая">Низкая</option>
              <option value="Средняя">Средняя</option>
              <option value="Высокая">Высокая</option>
            </select>
          </div>

          <div className="form-group">
            <label>Описание:</label>
            <textarea 
              className="textarea-field"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Опишите детали инцидента"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Сохранить в базе</button>
            <button type="button" className="btn-back" onClick={() => navigate('/')}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;