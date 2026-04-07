import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIncidents, deleteIncident } from '../api';
import type { Incident } from '../types';
import IncidentStats from './IncidentStats';

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchIncidents = () => {
    setIsLoading(true);
    getIncidents()
      .then((response) => setIncidents(response.data))
      .catch(() => alert('Ошибка при загрузке списка'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот инцидент?')) {
      try {
        await deleteIncident(id);
        fetchIncidents();
      } catch (error) {
        alert('Не удалось удалить инцидент');
      }
    }
  };

  if (isLoading) return <div className="loading-text">Загрузка системы мониторинга...</div>;

  return (
    <div className="container">
      
      {}
      <div className="list-header">
        <h2 className="title">Журнал инцидентов безопасности</h2>
        <button onClick={() => navigate('/add')} className="btn-add">+ Регистрация инцидента</button>
      </div>

      {}
      {incidents.length > 0 && <IncidentStats incidents={incidents} />}

      {}
      <div className="table-wrapper">
        <table className="incident-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Тип</th>
              <th>Критичность</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td 
                  className="clickable-title" 
                  onClick={() => navigate(`/incident/${incident.id}`)}
                >
                  {incident.title}
                </td>
                <td>{incident.type}</td>
                <td className={`severity-cell severity-${incident.severity === 'Высокая' ? 'high' : incident.severity === 'Средняя' ? 'medium' : 'low'}`}>
                  {incident.severity}
                </td>
                <td>{incident.status}</td>
                <td>{incident.date}</td>
                <td>
                  <button onClick={() => handleDelete(incident.id)} className="btn-delete">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentList;