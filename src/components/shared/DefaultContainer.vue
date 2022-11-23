<template>
  <q-card>
    <q-card-section class="bg-grey-3">
      <div class="text-h6 h6">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['title'],
});
</script>
