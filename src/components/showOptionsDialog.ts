import { reactive, ref, watch } from 'vue';

export const isDialogShow = ref(false);
export let options = reactive(['']);
export async function showOptionsDialog(opt: string[]) {
  options = opt;
  isDialogShow.value = true;
  return new Promise<void>((resolve) => {
    watch(isDialogShow, () => {
      resolve();
    });
  });
}
