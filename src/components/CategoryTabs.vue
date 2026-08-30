<template>
  <div class="tab-bar">
    <div ref="scrollRef" class="tab-bar-scroll" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        role="tab"
        :class="['tab-item', { active: modelValue === tab.value }]"
        :aria-selected="modelValue === tab.value"
        @click="onSelect(tab.value)"
      >{{ tab.label }}</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

function onSelect(value) {
  emit('update:modelValue', value);
}
</script>

<style scoped>
.tab-bar {
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}
.tab-bar-scroll {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.tab-bar-scroll::-webkit-scrollbar {
  display: none;
}
.tab-item {
  flex: none;
  padding: 14px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 15px;
  color: #666;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s;
}
.tab-item:hover {
  color: #1a6dff;
}
.tab-item.active {
  color: #1a6dff;
  font-weight: 600;
  border-bottom-color: #1a6dff;
}
</style>
