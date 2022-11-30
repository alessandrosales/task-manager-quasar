import { Tag } from './tags';
import { User } from './users';

export interface Task {
  id?: number;
  title: string | null;
  description: string | null;
  priority: 'PRIORIDADE_1' | 'PRIORIDADE_2' | 'PRIORIDADE_3';
  status: 'PENDENTE' | 'INICIADA' | 'PAUSADA' | 'FINALIZADA';
  level: number;
  tags?: Tag[];
  user_id?: number | null;
  user?: User | null;
}
