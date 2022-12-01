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
import { computed, defineComponent, onMounted } from 'vue';

import DefaultContainer from 'src/components/shared/DefaultContainer.vue';
import TagTable from 'src/components/tags/TagTable.vue';
import TagFilter from 'src/components/tags/TagFilter.vue';

import { useTagsStore } from 'src/stores/tags';
import { useException } from 'src/services/exception';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: { DefaultContainer, TagTable, TagFilter },
  setup() {
    const q = useQuasar();
    const tagsStore = useTagsStore();

    const { handleException } = useException();

    const records = computed(() => tagsStore.list);

    async function filtrate(search = '') {
      q.loading.show();
      try {
        const list = await tagsStore.findAll({ search });
        tagsStore.setList(list);
      } catch (error) {
        handleException('Não foi possível carregar os dados');
      }
      q.loading.hide();
    }

    onMounted(async () => {
      await filtrate();
    });

    return { records, filtrate };
  },
});
</script>
