import { ref, watch } from 'vue';

export const isDialogShow = ref(false);
export const imageSource = ref('');
export async function showImageDialog(imgSrc: string) {
  imageSource.value = imgSrc;
  isDialogShow.value = true;
  return new Promise<void>((resolve) => {
    watch(isDialogShow, () => {
      resolve();
    });
  });
}
