<template>
  <Combobox as="div" v-model="part">
    <div class="relative mt-2 flex -space-x-px">
      <div class="w-1/2 min-w-0 flex-1">
        <input type="number" class="relative block w-full rounded-none rounded-l-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" v-model="amount" placeholder="Enter Amount..." />
      </div>
      <div class="min-w-0 flex-grow">
        <ComboboxInput as="input" placeholder="Select Part..." class="relative block w-full rounded-none rounded-r-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 pr-10" @change="query = $event.target.value" @focus="onFocus($event)" @blur="onBlur()" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>

      <ComboboxOptions v-if="filteredParts.length > 0" class="absolute z-10 mt-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="part in filteredParts" :key="part" :value="part" as="template" v-slot="{ active, selected }">
          <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-blue-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ part }}
            </span>

            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-blue-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useVModels } from '@vueuse/core';
  import {
    Combobox,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    ComboboxInput,
  } from '@headlessui/vue';
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
  import type { Part } from '../types';
  import { recipes } from '../recipes';

  const props = defineProps<{ part?: Part, amount?: number }>();
  const emits = defineEmits(['update:part', 'update:amount']);

  const { part, amount } = useVModels(props, emits);

  const parts = recipes
    .reduce((set, x) => set.concat(x.inputs.map(x => x.part)).concat(x.outputs.map(x => x.part)), [] as Part[])
    .filter((x, i, a) => a.indexOf(x) === i);
  const query = ref('');

  const filteredParts = computed(() =>
  query.value === ''
      ? parts
      : parts.filter((part) => part.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, '')))
  );

  const onFocus = (e: FocusEvent) => {
    (e.target as HTMLInputElement).select();
  };

  const onBlur = () => {
    query.value = '';
  }
</script>