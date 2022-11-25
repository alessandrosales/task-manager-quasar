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

export default defineComponent({
  components: { DefaultContainer, TagForm },
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    const tagsStore = useTagsStore();
    const countTags = computed(() => tagsStore.countTags);
    const tagList = computed(() => tagsStore.list);

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    function submit(record: Tag) {
      if (record.id !== undefined) {
        const newList = tagList.value.map((tag) => {
          if (tag.id === record.id) {
            return {
              ...tag,
              ...record,
            };
          }
          return tag;
        });
        tagsStore.setList(newList);
      } else {
        const id = countTags.value + 1;
        tagsStore.append({ ...record, id });
      }

      router.push({ name: 'tags' });
      q.notify({
        message: 'Operação realizada com sucesso',
        color: 'positive',
        position: 'top-right',
      });
    }

    return { isNewRecord, submit };
  },
});
</script>
