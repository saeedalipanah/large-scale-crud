<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <div class="flex items-center gap-2">
          <BaseButton
            variant="outline"
            :class="
              cn(
                'w-full justify-start text-left font-normal overflow-hidden',
                !selectedRange && 'text-muted-foreground'
              )
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            <div
              v-if="selectedRange.end && selectedRange.start"
              class="w-[70%] truncate"
            >
              {{ df.format(selectedRange.start.toDate(getLocalTimeZone())) }}
              -
              {{ df.format(selectedRange.end.toDate(getLocalTimeZone())) }}
            </div>
            <div v-else class="text-muted-foreground">{{ placeholder }}</div>
          </BaseButton>
          <BaseButton
            v-if="selectedRange.start || selectedRange.end"
            class="-ms-14"
            variant="text"
            @click.capture="clearDates"
          >
            <X class="h-4 w-4" />
          </BaseButton>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <RangeCalendar
          v-model="selectedRange"
          initial-focus
          :number-of-months="2"
        />
      </PopoverContent>
    </Popover>
          
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import { Calendar as CalendarIcon, X } from "lucide-vue-next";
import { type PropType, ref, watch } from "vue";
import {  } from "@internationalized/date";
const props = defineProps({
  startDate: {
    type: Date as PropType<any>,
    default: new CalendarDate(2023, 1, 1),
  },
  endDate: {
    type: Date as PropType<any>,
    default: new CalendarDate(2023, 1, 1).add({ days: 20 }),
  },
  placeholder: {
    type: String,
    default: "Pick a date",
  },
});

const emit = defineEmits(["update:startDate", "update:endDate"]);

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const selectedRange = ref({
  start: props.startDate,
  end: props.endDate,
});

watch(
  selectedRange,
  (newValue) => {
    emit("update:startDate", newValue.start);
    emit("update:endDate", newValue.end);
  },
  { deep: true }
);

watch(
  () => props.startDate,
  (newStartDate) => {
    if (newStartDate) {
      selectedRange.value = { ...selectedRange.value, start: newStartDate };
    }
  }
);

watch(
  () => props.endDate,
  (newEndDate) => {
    if (newEndDate) {
      selectedRange.value = { ...selectedRange.value, end: newEndDate };
    }
  }
);

const clearDates = () => {
  selectedRange.value = {
    start: null,
    end: null,
  };
};
</script>
