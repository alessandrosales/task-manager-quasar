import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Tag } from 'src/interfaces/tags';

const PATH = 'tags';

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
    async findAll(params: { search?: string } = {}): Promise<Tag[]> {
      const { data } = await api.get(`/${PATH}`, { params });
      return data;
    },
    async find(id: number) {
      const { data } = await api.get(`/${PATH}/${id}`);
      return data;
    },
    async save(tag: Tag) {
      const { data } = await api.post(`/${PATH}`, tag);
      return data;
    },
    async update(tag: Tag) {
      const { data } = await api.put(`/${PATH}/${tag.id}`, tag);
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
