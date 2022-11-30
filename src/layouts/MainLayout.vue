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

        <div>
          <q-btn
            :icon="q.dark.isActive ? 'brightness_7' : 'brightness_4'"
            @click="toggleDark"
            round
          />
        </div>
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
import { useQuasar } from 'quasar';
import { Tag } from 'src/interfaces/tags';
import { useTagsStore } from 'src/stores/tags';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const q = useQuasar();
    const leftDrawerOpen = ref(false);

    const router = useRouter();

    const tagsStore = useTagsStore();

    function goToPage(name: string) {
      router.push({ name });
    }

    function loadData() {
      tagsStore.load();
    }

    function toggleDark() {
      q.dark.toggle();
      localStorage.setItem('dark', `${q.dark.isActive}`);
    }

    onMounted(() => {
      loadData();

      if (localStorage.getItem('dark')) {
        const isActive = localStorage.getItem('dark') === 'true';
        q.dark.set(isActive);
      }
    });

    return {
      q,
      toggleDark,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      goToPage,
    };
  },
});
</script>
