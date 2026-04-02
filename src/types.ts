export interface Incident {
  id: string;
  title: string;
  type: string;
  severity: 'Низкая' | 'Средняя' | 'Высокая';
  status: 'На рассмотрении' | 'Завершено' | 'Отклонено';
  date: string;
  description: string;
}