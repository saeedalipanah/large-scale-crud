import { useToast } from "@/components/ui/toast";
import { ref } from "vue";

export function useApiRequest<T>() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const responseData = ref<any>(null);
  const { toast } = useToast();

  const sendRequest = async (apiRequestPromise: Promise<T>) => {
    isLoading.value = true;
    error.value = null;
    responseData.value = null;
    try {
      const result = await apiRequestPromise;
      responseData.value = result;
    } catch (error: any) {
      error.value = error;
      console.log(error);
      const apiErrorMessage = error.value.message;
      if (apiErrorMessage)
        toast({
          title: "Error",
          description: apiErrorMessage,
          variant: "destructive",
          duration: 4000,
        });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    responseData,
    sendRequest,
  };
}
