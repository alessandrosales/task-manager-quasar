import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Tag } from 'src/interfaces/tags';

export const useTagsStore = defineStore('tags', {
  state: () => ({
    record: { name: 'nome da tag', color: 'grey' } as Tag,
    list: [] as Tag[],
  }),

  getters: {
    countTags(state) {
      return state.list.length;
    },
  },

  actions: {
    setRecord(record: Tag) {
      this.record = record;
    },
    setList(list: Tag[]) {
      this.list = list;
    },
    append(record: Tag) {
      this.list.push(record);
    },
    async findAll(params: { name?: string } = {}) {
      const { data } = await api.get('/tags', { params });
      return data;
    },
    async save(data: Tag = {} as Tag) {
      const { data: responseData } = await api.request({
        url: '/tags',
        method: 'post',
        data,
      });
      return responseData;
    },
  },
});
