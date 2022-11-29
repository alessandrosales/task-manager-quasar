import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Task } from 'src/interfaces/tasks';

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
    append(record: Task) {
      this.list.push(record);
    },
    save() {
      localStorage.setItem('tasks', JSON.stringify(this.list));
    },
    load() {
      if (localStorage.getItem('tasks')) {
        const tasks = localStorage.getItem('tasks') as string;
        this.list = JSON.parse(tasks);
      }
    },
    async findAll(params: { title?: string; description?: string } = {}) {
      const { data } = await api.get('/tasks', { params });
      return data;
    },
  },
});
