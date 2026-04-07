import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Incident } from '../types';

interface Props {
  incidents: Incident[];
}

const IncidentStats: React.FC<Props> = ({ incidents }) => {
  // Подготовка данных для графика
  const data = [
    { name: 'Высокая', value: incidents.filter(i => i.severity === 'Высокая').length, color: '#d32f2f' },
    { name: 'Средняя', value: incidents.filter(i => i.severity === 'Средняя').length, color: '#f57c00' },
    { name: 'Низкая', value: incidents.filter(i => i.severity === 'Низкая').length, color: '#388e3c' },
  ].filter(item => item.value > 0);

  return (
    <div className="stats-container">
      <h3>Аналитика угроз по критичности</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentStats;