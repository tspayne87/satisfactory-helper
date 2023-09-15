<script setup lang="ts">
import type { Part } from './types';

import { ref, computed } from 'vue';
import { findPartRecipe } from './utils';

import PartSelector from './components/PartSelector.vue';
import PartCard from './components/PartsCard.vue';
import RecipeMachineCard from './components/RecipeMachineCard.vue';
import MachineCard from './components/MachineCard.vue';
import InputCard from './components/InputCard.vue';

const part = ref<Part>();
const amount = ref<number>();

const recipe = computed(() => part.value !== undefined ? findPartRecipe(part.value) : undefined);
</script>

<template>
  <div class="bg-gray-800 pb-32">
    <header class="py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Satisfactory Helper</h1>
      </div>
    </header>
  </div>

  <main class="-mt-32">
    <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        <PartSelector v-model:amount="amount" v-model:part="part" />

        <li role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4 xl:gap-x-8 mt-8">
          <PartCard :recipe="recipe" :amount="amount" />
          <RecipeMachineCard :recipe="recipe" :amount="amount" />
          <MachineCard :recipe="recipe" :amount="amount" />
          <InputCard :recipe="recipe" :amount="amount" />
        </li>
      </div>
    </div>
  </main>
</template>
