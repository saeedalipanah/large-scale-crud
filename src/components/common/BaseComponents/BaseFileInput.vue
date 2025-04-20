<template>
  <div
    class="file-input-container relative inline-block cursor-pointer"
    @click="fileInput!.click"
    @dragover.prevent
    @drop.prevent="handleDrop"
    :class="{ 'drag-over': isDragging }"
    @dragenter="isDragging = true"
    @dragleave="isDragging = false"
  >
    <input type="file" ref="fileInput" :accept="accept" @change="handleFileChange" class="hidden" />
    <div
      class="file-input-box w-full h-full border-2 border-dashed border-muted-foreground flex flex-col items-center justify-center text-center p-2 box-border rounded-lg bg-muted"
    >
      <BaseButton variant="outline" class="w-max h-2"> افزودن فایل </BaseButton>
      <div class="text-muted-foreground text-sm mt-2">
        <span>فرمت های مورد قبول :</span>
        <span>{{ acceptTitle }}</span>
      </div>
      <span v-if="fileName">{{ fileName }}</span>
      <div v-if="isDragging" class="text-highlight text-sm mt-2">فایل خود را اینجا رها کنید</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  accept: {
    type: String,
    default: 'image/jpeg, image/png, application/pdf',
  },
  acceptTitle: {
    type: String,
    default: 'JPG, PNG, PDF',
  },
});

const emits = defineEmits<{
  (event: 'on-choose-file', file: File | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string>('');
const isDragging = ref<boolean>(false);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] ?? null;
  if (file) {
    fileName.value = file.name;
  }
  emits('on-choose-file', file);
};

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0] ?? null;
  if (file) {
    fileName.value = file.name;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (fileInput.value) {
      fileInput.value.files = dataTransfer.files;
    }
  }
  isDragging.value = false;
  emits('on-choose-file', file);
};
</script>

<style scoped>
.file-input-container.drag-over .file-input-box {
  border-color: var(--highlight-color);
  background-color: var(--highlight-bg-color);
}
</style>
