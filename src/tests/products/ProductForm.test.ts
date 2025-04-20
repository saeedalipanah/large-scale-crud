import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ProductForm from "@/components/products/ProductForm.vue";
import BaseInput from "@/components/common/BaseComponents/BaseInput.vue";
import BaseSelect from "@/components/common/BaseComponents/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseComponents/BaseTextarea.vue";
import BaseButton from "@/components/common/BaseComponents/BaseButton.vue";
import { CalendarIcon, DollarSign, Star } from "lucide-vue-next";

describe("ProductForm", () => {
  const categoryOptions = [
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" },
  ];

  const sampleProduct = {
    id: 1,
    title: "Test Product",
    category: "electronics",
    price: 99.99,
    stock: 10,
    rating: 4,
    date: "2023-01-01",
    description: "Test description",
  };

  const wrapper: any = mount(ProductForm, {
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
      },
    },
  });

  it("renders all form fields", () => {
    expect(wrapper.find("#product-form-title").exists()).toBe(true);
    expect(wrapper.findComponent(BaseSelect).exists()).toBe(true);
    expect(wrapper.find("#product-form-price").exists()).toBe(true);
    expect(wrapper.find("#product-form-stock").exists()).toBe(true);
    expect(wrapper.find("#product-form-rating").exists()).toBe(true);
    expect(wrapper.find("#product-form-description").exists()).toBe(true);
  });

  it("initializes with empty form when no product prop is provided", () => {
    expect(wrapper.vm.formData.title).toBe(undefined);
    expect(wrapper.vm.formData.category).toBe(undefined);
    expect(wrapper.vm.formData.price).toBe(undefined);
    expect(wrapper.vm.formData.stock).toBe(undefined);
    expect(wrapper.vm.formData.rating).toBe(undefined);
    expect(wrapper.vm.formData.description).toBe("");
  });

  it("initializes with product data when product prop is provided", async () => {
    const wrapperWithProduct: any = mount(ProductForm, {
      props: {
        categoryOptions,
        product: sampleProduct,
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
        },
      },
    });

    expect(wrapperWithProduct.vm.formData.title).toBe(sampleProduct.title);
    expect(wrapperWithProduct.vm.formData.category).toBe(
      sampleProduct.category
    );
    expect(wrapperWithProduct.vm.formData.price).toBe(sampleProduct.price);
    expect(wrapperWithProduct.vm.formData.stock).toBe(sampleProduct.stock);
    expect(wrapperWithProduct.vm.formData.rating).toBe(sampleProduct.rating);
    expect(wrapperWithProduct.vm.formData.description).toBe(
      sampleProduct.description
    );
  });

  it("validates required fields", async () => {
    await wrapper.find("#product-form-title").setValue("");
    await wrapper.find("#product-form-price").setValue();
    await wrapper.findComponent(BaseSelect).vm.$emit("update:model-value", "");
    await wrapper.find("#product-form-stock").setValue();
    await wrapper.find("#product-form-rating").setValue();
    await wrapper
      .findComponent(BaseTextarea)
      .vm.$emit("update:model-value", "");
    const errors = wrapper.vm.errors;
    expect(errors.title).toBe("Field is required");
    expect(errors.category).toBe("Field is required");
    expect(errors.price).toBe("Field is required");
    expect(errors.stock).toBe("Field is required");
    expect(errors.rating).toBe("Field is required");
    expect(errors.description).toBe("Field is required");
  });

  it("updates form data when input values change", async () => {
    await wrapper.find("#product-form-title").setValue("New Product");
    await wrapper.find("#product-form-price").setValue(50);
    await wrapper.find("#product-form-stock").setValue(20);
    await wrapper.find("#product-form-rating").setValue(3);
    await wrapper.find("#product-form-description").setValue("New description");

    expect(wrapper.vm.formData.title).toBe("New Product");
    expect(wrapper.vm.formData.price).toBe(50);
    expect(wrapper.vm.formData.stock).toBe(20);
    expect(wrapper.vm.formData.rating).toBe(3);
    expect(wrapper.vm.formData.description).toBe("New description");
  });

  it("validates numeric fields with min and max values", async () => {
    // Test price validation
    await wrapper.find("#product-form-price").setValue(0);
    expect(wrapper.vm.errors.price).toBe("Field must be greater than 0");

    await wrapper.find("#product-form-price").setValue(1);
    expect(wrapper.vm.errors.price).toBe("");

    // Test rating validation
    await wrapper.find("#product-form-rating").setValue(0);
    expect(wrapper.vm.errors.rating).toBe("Field must be greater than 0");

    await wrapper.find("#product-form-rating").setValue(6);
    expect(wrapper.vm.errors.rating).toBe("Field must be less than 5");

    await wrapper.find("#product-form-rating").setValue(3);
    expect(wrapper.vm.errors.rating).toBe("");
  });

  it("emits submit event with form data when form is valid", async () => {
    const mockSubmit = vi.fn();
    const validWrapper = mount(ProductForm, {
      props: {
        categoryOptions,
        product: sampleProduct,
        onSubmit: mockSubmit,
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
        },
      },
    });

    await validWrapper.vm.handleSubmit();
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith(sampleProduct);
  });

  it("does not emit submit event when form is invalid", async () => {
    const mockSubmit = vi.fn();
    wrapper.vm.handleSubmit = mockSubmit;
    await wrapper.vm.handleSubmit();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("exposes getFormData method", () => {
    expect(wrapper.vm.getFormData).toBeDefined();
    expect(typeof wrapper.vm.getFormData).toBe("function");
  });

  it("returns null from getFormData when form is invalid", () => {
    expect(wrapper.vm.getFormData()).toBeNull();
  });

  it("returns form data from getFormData when form is valid", async () => {
    const validWrapper = mount(ProductForm, {
      props: {
        categoryOptions,
        product: sampleProduct,
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
        },
      },
    });

    expect(validWrapper.vm.getFormData()).toEqual(sampleProduct);
  });
});
