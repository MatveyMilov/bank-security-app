import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIncident } from "../api";
import type { Incident } from "../types";
import "../App.css";

const IncidentForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Incident, "id">>({
    title: "",
    type: "Взлом",
    severity: "Средняя",
    status: "На рассмотрении" as any,
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    try {
      const newIncidentData = {
        ...formData,
        status: "На рассмотрении" as any,
        date: new Date().toLocaleDateString(),
      };

      await createIncident(newIncidentData as any);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Ошибка при регистрации инцидента");
    }
  };

  return (
    <div className="container">
      <h2 className="title"> Регистрация нового инцидента</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label>Заголовок события:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Критичность:</label>
          <select
            value={formData.severity}
            onChange={(e) =>
              setFormData({ ...formData, severity: e.target.value as any })
            }
          >
            <option value="Низкая">Низкая</option>
            <option value="Средняя">Средняя</option>
            <option value="Высокая">Высокая</option>
          </select>
        </div>

        <div className="form-group">
          <label>Описание:</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="from-actions">
          <button type="submit" className="btn-submit">
            Сохранить в базе
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-cancel"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;
