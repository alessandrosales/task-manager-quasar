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
    save() {
      localStorage.setItem('tags', JSON.stringify(this.list));
    },
    load() {
      if (localStorage.getItem('tags')) {
        const tags = localStorage.getItem('tags') as string;
        this.list = JSON.parse(tags);
      }
    },
    async findAll(params: { name?: string } = {}) {
      const { data } = await api.get('/tags', { params });
      return data;
    },
  },
});
