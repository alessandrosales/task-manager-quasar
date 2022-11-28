import { Tag } from './tags';
import { User } from './users';

export interface Task {
  id?: number;
  title: string | null;
  description: string | null;
  priority: string;
  tags?: Tag[];
  user?: User | null;
}
