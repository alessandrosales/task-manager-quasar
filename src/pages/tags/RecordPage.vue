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
import { useRoute } from 'vue-router';
import { Tag } from 'src/interfaces/tags';

export default defineComponent({
  components: { DefaultContainer, TagForm },
  setup() {
    const route = useRoute();

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    function submit(record: Tag) {
      console.log(record);
    }

    return { isNewRecord, submit };
  },
});
</script>
