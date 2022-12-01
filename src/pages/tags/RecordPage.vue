<template>
  <q-page padding>
    <default-container :title="isNewRecord ? 'Novo Registro' : 'Edição'">
      <tag-form @submit="submit" />
    </default-container>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import DefaultContainer from 'src/components/shared/DefaultContainer.vue';
import TagForm from 'src/components/tags/TagForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { Tag } from 'src/interfaces/tags';
import { useTagsStore } from 'src/stores/tags';
import { useQuasar } from 'quasar';
import { useException } from 'src/services/exception';

export default defineComponent({
  components: { DefaultContainer, TagForm },
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const { handleException } = useException();

    const tagsStore = useTagsStore();

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    async function submit(record: Tag) {
      q.loading.show();
      try {
        if (record.id !== undefined) {
          await tagsStore.update(record);
        } else {
          await tagsStore.save(record);
        }

        router.push({ name: 'tags' });
        q.notify({
          message: 'Operação realizada com sucesso',
          color: 'positive',
          position: 'top-right',
        });
      } catch (error) {
        handleException(error);
      }
      q.loading.hide();
    }

    return { isNewRecord, submit };
  },
});
</script>
