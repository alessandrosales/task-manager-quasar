<template>
  <q-page padding>
    <default-container title="Lista de Tags">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <tag-filter @filtrate="filtrate" />
        </div>
        <div class="col-12">
          <tag-table :records="records" />
        </div>
      </div>
    </default-container>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import DefaultContainer from 'src/components/shared/DefaultContainer.vue';
import TagTable from 'src/components/tags/TagTable.vue';
import TagFilter from 'src/components/tags/TagFilter.vue';

export default defineComponent({
  components: { DefaultContainer, TagTable, TagFilter },
  setup() {
    const records = ref([
      { id: 1, name: 'Tag 1', color: 'blue' },
      { id: 2, name: 'Tag 2', color: 'red' },
      { id: 3, name: 'Tag 3', color: 'yellow' },
    ]);

    function filtrate(search: string) {
      console.log(search);
    }

    return { records, filtrate };
  },
});
</script>
