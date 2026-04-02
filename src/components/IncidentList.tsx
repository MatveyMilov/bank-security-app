import React, { useState, useEffect } from "react";
import { getIncidents, deleteIncident } from "../api";
import type { Incident } from "../types";
import { useNavigate } from "react-router-dom";
import "../App.css";

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await getIncidents();
      setIncidents(response.data);
    } catch (error) {
      console.error("Ошибка API:", error);
      alert("Ошибка доступа к банковскому шлюзу");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Удалить запись об инциденте?")) {
      try {
        await deleteIncident(id);
        setIncidents((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        alert("Не удалось удалить запись");
      }
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "Высокая":
        return "severity-high";
      case "Средняя":
        return "severity-medium";
      case "Низкая":
        return "severity-low";
      default:
        return "";
    }
  };

  if (loading)
    return (
      <div className="loading-text">Загрузка защищенного соединения...</div>
    );
  const filteredIncidents = incidents.filter((incident) => {
    //приводим текст поиска к нижнему регистру чтобы поиск был нечувствителен к регистру
    const lowerSearch = searchTerm.toLowerCase();

    //ищем совпадения в заголовке ID критичности или статусе
    return (
      incident.title.toLowerCase().includes(lowerSearch) ||
      incident.id.toLowerCase().includes(lowerSearch) ||
      incident.severity.toLowerCase().includes(lowerSearch) ||
      incident.status.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="container">
      <div className="list-header">
        <h2 className="title">Панель мониторинга безопасности</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск по событию, ID или статусу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // обновляем состояние при вводе
            className="search-input"
          />
        </div>
        <button onClick={() => navigate("/add")} className="btn-add">
          + Регистрация инцидента
        </button>
      </div>
      <table className="incident-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Событие</th>
            <th>Критичность</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td
                className="clickable-title"
                onClick={() => navigate(`/incident/${incident.id}`)}
              >
                {incident.title}
              </td>
              <td className={getSeverityClass(incident.severity)}>
                {incident.severity}
              </td>
              <td>{incident.status}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(incident.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredIncidents.length === 0 && !loading && (
        <div className="no-results">
          Инцидентов с таким названием или статусом не найдено.
        </div>
      )}
    </div>
  );
};

export default IncidentList;
