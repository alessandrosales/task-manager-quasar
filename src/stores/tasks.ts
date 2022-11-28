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
    async findAll(params: { title?: string; description?: string } = {}) {
      const { data } = await api.get('/tasks', { params });
      return data;
    },
    async save(data: Task = {} as Task) {
      const { data: responseData } = await api.request({
        url: '/tasks',
        method: 'post',
        data,
      });
      return responseData;
    },
  },
});
