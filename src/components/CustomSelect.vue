<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
defineProps<{
  selectItems: {
    value: string;
    label: string;
  }[];
  title: string;
}>();

const selected = defineModel<string>("selected");
</script>
<template>
  <Select v-model="selected" v-if="selectItems">
    <SelectTrigger>
      <SelectValue :placeholder="`Select a ${title}`" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem key="empty" :value="'empty'">Any</SelectItem>
        <SelectItem
          v-for="item in selectItems"
          :key="item.value"
          :value="`${item.value}`"
        >
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
