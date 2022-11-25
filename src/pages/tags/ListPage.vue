<template>
  <q-page padding>
    <default-container title="Lista de Tags">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <tag-filter @filtrate="filtrate" />
        </div>
        <div class="col-12">
          <tag-table :records="filteredRecords" />
        </div>
      </div>
    </default-container>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

import DefaultContainer from 'src/components/shared/DefaultContainer.vue';
import TagTable from 'src/components/tags/TagTable.vue';
import TagFilter from 'src/components/tags/TagFilter.vue';

import { useTagsStore } from 'src/stores/tags';
import { Tag } from 'src/interfaces/tags';

export default defineComponent({
  components: { DefaultContainer, TagTable, TagFilter },
  setup() {
    const tagsStore = useTagsStore();
    const countTags = computed(() => tagsStore.countTags);

    const records = computed(() => tagsStore.list);
    const filteredRecords = ref<Tag[]>([]);

    function filtrate(search: string) {
      if (typeof search === 'string') {
        const tags = records.value.filter((r: Tag) => {
          const index = r.name
            ?.toLowerCase()
            .indexOf(search.toLowerCase()) as number;
          return index > -1;
        });

        filteredRecords.value = [...tags];
      } else {
        filteredRecords.value = [...records.value];
      }
    }

    onMounted(() => {
      //devemos consultar no banco de dados
      if (countTags.value == 0) {
        tagsStore.setList([
          { id: 1, name: 'Desenvolvimento', color: 'blue' },
          { id: 2, name: 'Suporte 1', color: 'red' },
          { id: 3, name: 'Suporte 2', color: 'yellow' },
        ]);
      }

      filteredRecords.value = [...records.value];
    });

    watch(records, (newValue) => {
      filteredRecords.value = newValue;
    });

    return { records, filteredRecords, filtrate };
  },
});
</script>
