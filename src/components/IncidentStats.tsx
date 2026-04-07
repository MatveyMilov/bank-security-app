import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Incident } from '../types';

interface Props {
  incidents: Incident[];
}

const IncidentStats: React.FC<Props> = ({ incidents }) => {
  // Подсчитываем количество по уровням критичности
  const data = [
    { name: 'Высокая', value: incidents.filter(i => i.severity === 'Высокая').length, color: '#d32f2f' },
    { name: 'Средняя', value: incidents.filter(i => i.severity === 'Средняя').length, color: '#f57c00' },
    { name: 'Низкая', value: incidents.filter(i => i.severity === 'Низкая').length, color: '#388e3c' },
  ].filter(item => item.value > 0);

  return (
    <div style={{ 
      background: '#fff', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
      marginBottom: '30px',
      height: '350px' 
    }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Аналитика угроз</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncidentStats;