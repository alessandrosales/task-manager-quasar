<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Task Manager </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list separator dense>
        <q-item-label header> Menu Principal </q-item-label>
        <q-item :to="{ name: 'dashboard' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar icon="insights" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'tasks' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar icon="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tasks</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'tags' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar icon="label_important" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tags</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Tag } from 'src/interfaces/tags';
import { useTagsStore } from 'src/stores/tags';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    const router = useRouter();

    const tagsStore = useTagsStore();

    function goToPage(name: string) {
      router.push({ name });
    }

    function loadData() {
      const initialTags: Tag[] = [
        { id: 1, name: 'Desenvolvimento', color: 'blue' },
        { id: 2, name: 'Suporte 1', color: 'red' },
        { id: 3, name: 'Suporte 2', color: 'yellow' },
      ];

      tagsStore.setList(initialTags);
    }

    onMounted(() => {
      loadData();
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      goToPage,
    };
  },
});
</script>
