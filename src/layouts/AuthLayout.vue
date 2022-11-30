<template>
  <q-layout>
    <q-page-container class="bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.bg {
  background: url('src/assets/bg.png') no-repeat;
  background-size: cover;
}
</style>
