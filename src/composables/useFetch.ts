import { ref, onMounted } from "vue";

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const loading = ref(true);
  const error = ref("");
  const data = ref<T>();

  onMounted(() => {
    fetchFn()
      .then((res) => {
        data.value = res;
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
        loading.value = false;
      });
  });

  return { loading, error, data };
}
