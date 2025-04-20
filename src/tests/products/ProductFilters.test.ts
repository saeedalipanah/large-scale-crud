import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { mount } from "@vue/test-utils";
import ProductFilters from "@/components/products/ProductFilters.vue";
import BaseInput from "@/components/common/BaseComponents/BaseInput.vue";
import BaseSelect from "@/components/common/BaseComponents/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseComponents/BaseTextarea.vue";
import BaseButton from "@/components/common/BaseComponents/BaseButton.vue";
import BaseRangeDatePicker from "@/components/common/BaseComponents/BaseRangeDatePicker.vue";
import { CalendarIcon, DollarSign, Star } from "lucide-vue-next";

vi.mock("vue-router", () => ({
  useRoute: () => ({
    query: {},
  }),
}));

describe("ProductFilters", () => {
  const categoryOptions = [
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" },
  ];

  const wrapper = mount(ProductFilters, {
    props: {
      categoryOptions,
    },
    global: {
      components: {
        BaseInput,
        BaseSelect,
        BaseTextarea,
        BaseButton,
        CalendarIcon,
        DollarSign,
        Star,
        BaseRangeDatePicker,
      },
    },
  });

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });
  it("renders all filter fields", () => {
    expect(wrapper.find("#product-filters-search").exists()).toBe(true);
    expect(wrapper.findComponent(BaseSelect).exists()).toBe(true);
    expect(wrapper.find("#product-filters-date").exists()).toBe(true);
    expect(wrapper.find("#product-filters-price").exists()).toBe(true);
  });

  it("should emit on-do-filter event after debounce delay when searching", async () => {
    const searchInput = wrapper.find("#product-filters-search");
    await searchInput.setValue("test search");
    vi.advanceTimersByTime(800);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("on-do-filter")).toBeTruthy();
    expect(wrapper.emitted("on-set-filter-params")).toBeTruthy();
    const emittedEvents = wrapper.emitted("on-set-filter-params");
    if (emittedEvents && emittedEvents[0] && emittedEvents[0][0]) {
      const filterParams = emittedEvents[0][0];
      if (filterParams instanceof URLSearchParams) {
        expect(filterParams.get("title_like")).toBe("test search");
      }
    }
  });

  it("should handle empty search input", async () => {
    const searchInput = wrapper.find("#product-filters-search");
    await searchInput.setValue("");
    await wrapper.vm.$nextTick();

    const searchInputElement = wrapper.find("#product-filters-search")
      .element as HTMLInputElement;
    expect(searchInputElement.value).toBe("");

    expect(wrapper.emitted("on-do-filter")).toBeTruthy();
    expect(wrapper.emitted("on-set-filter-params")).toBeTruthy();
  });

  it("should emit filter event when category is selected", async () => {
    await wrapper
      .findComponent(BaseSelect)
      .vm.$emit("update:model-value", "electronics");

    expect(wrapper.findComponent(BaseSelect).exists()).toBe(true);

    expect(wrapper.emitted("on-do-filter")).toBeTruthy();
    expect(wrapper.emitted("on-set-filter-params")).toBeTruthy();
  });

  it("should handle category deselection", async () => {
    expect(wrapper.findComponent(BaseSelect).exists()).toBe(true);
    await wrapper.findComponent(BaseSelect).vm.$emit("update:model-value", "");
    
    expect(wrapper.emitted("on-do-filter")).toBeTruthy();
    expect(wrapper.emitted("on-set-filter-params")).toBeTruthy();
  });
});
