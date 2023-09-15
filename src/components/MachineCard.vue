<template>
  <li class="overflow-hidden rounded-xl border border-gray-200" v-if="recipe !== undefined">
    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
      <div class="text-sm font-medium leading-6 text-gray-900">Machines</div>
    </div>
    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
      <div v-for="item in machines" class="flex justify-between gap-x-4 py-3">
        <dt class="text-gray-500">{{ item.machine }}</dt>
        <dd class="text-gray-700">
          {{ formatNumber(item.amount, 0) }}
        </dd>
      </div>
    </dl>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { calculateMachines, mergeMachines, formatNumber } from '../utils';

  import type { Recipe } from '../types';

  const props = defineProps<{ recipe?: Recipe, amount?: number }>();

  const machines = computed(() => props.recipe !== undefined ? mergeMachines(calculateMachines(props.recipe, props.amount ?? props.recipe.outputs[0].amountPerMinute)) : []);
</script>