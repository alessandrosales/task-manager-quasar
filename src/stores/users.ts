import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/interfaces/users';

const PATH = 'users';

export const useUsersStore = defineStore('users', {
  state: () => ({
    record: {} as User,
    list: [] as User[],
  }),

  getters: {
    countUsers(state) {
      return state.list.length;
    },
  },

  actions: {
    setRecord(record: User) {
      this.record = record;
    },
    setList(list: User[]) {
      this.list = list;
    },
    async findAll(
      params: { search?: string; status?: string } = {}
    ): Promise<User[]> {
      const { data } = await api.get(`/${PATH}`, { params });
      return data;
    },
    async find(id: number) {
      const { data } = await api.get(`/${PATH}/${id}`);
      return data;
    },
    async save(user: User) {
      const { data } = await api.post(`/${PATH}`, user);
      return data;
    },
    async update(user: User) {
      const { data } = await api.put(`/${PATH}/${user.id}`, user);
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
