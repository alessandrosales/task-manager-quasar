import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Task } from 'src/interfaces/tasks';

const PATH = 'tasks';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    record: {} as Task,
    list: [] as Task[],
  }),

  getters: {
    countTasks(state) {
      return state.list.length;
    },
  },

  actions: {
    setRecord(record: Task) {
      this.record = record;
    },
    setList(list: Task[]) {
      this.list = list;
    },
    async findAll(
      params: { search?: string; status?: string } = {}
    ): Promise<Task[]> {
      const { data } = await api.get(`/${PATH}`, { params });
      return data;
    },
    async find(id: number) {
      const { data } = await api.get(`/${PATH}/${id}`);
      return data;
    },
    async save(task: Task) {
      const { data } = await api.post(`/${PATH}`, task);
      return data;
    },
    async update(task: Task) {
      const { data } = await api.put(`/${PATH}/${task.id}`, task);
      return data;
    },
    async delete(id: number) {
      const { data } = await api.delete(`/${PATH}/${id}`);
      return data;
    },
    async load() {
      const data = await this.findAll();
      this.setList(data);
    },
  },
});
