<template>
  <q-card>
    <q-card-section :class="!q.dark.isActive && 'bg-grey-3'">
      <div class="text-h6 h6">{{ title }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['title'],
  setup() {
    const q = useQuasar();

    return { q };
  },
});
</script>
