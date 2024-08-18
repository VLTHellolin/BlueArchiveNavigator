import { db } from './db';
import { type AronaResponse } from './types';
import axios from 'axios';
import { useToast } from 'vue-fomantic-ui';
import { useI18n } from 'vue-i18n';
import { showImageDialog } from '@/components/ImageDialog.vue';
import { showOptionsDialog } from '@/components/OptionsDialog.vue';

const AronaAPI = 'https://arona.diyigemt.com/api/v2/image';
const AronaImg = 'https://arona.cdn.diyigemt.com/image';

const { toast } = useToast();
const { t } = useI18n();

export const getImageFromArona = async function (name: string) {
  try {
    const response = await axios.get<AronaResponse>(AronaAPI, {
      params: { name },
    });
    toast({
      message: t('lib.query.processing'),
    });

    if (response.status === 200) {
      // Exactly match
      const hash = response.data.data[0].hash;
      const filePath = response.data.data[0].content;
      let localImg = await db.get(name);

      if (localImg === undefined || localImg.hash !== hash) {
        // No local cache / Remote data changed, load from server
        const imgResponse = await axios.get<Blob>(AronaImg + filePath, {
          responseType: 'blob',
        });
        if (imgResponse.data.size === 0) {
          throw 'API returned an unexpected value.';
        }

        if (localImg === undefined) {
          // Add a new item
          localImg = {
            name,
            hash,
            img: imgResponse.data,
          };
          db.add(localImg);
        } else {
          // Update the item
          localImg.hash = hash;
          localImg.img = imgResponse.data;
          db.update(name, { hash, img: imgResponse.data });
        }
      }

      toast({
        message: t('lib.query.ok'),
      });
      // Show the image
      const imgSource = window.URL.createObjectURL(localImg.img);
      await showImageDialog(imgSource);
      window.URL.revokeObjectURL(imgSource);
    } else if (response.status === 101) {
      // Fuzzy match

      toast({
        message: t('lib.query.ok'),
      });
      // Show the dialog
      const options = response.data.data.map((e) => {
        return e.name;
      });
      await showOptionsDialog(options);
    } else {
      throw 'API returned an unexpected value.';
    }
  } catch (err) {
    toast({
      message: t('lib.query.error', [err]),
      type: 'error',
    });
    console.error(err);
  }
};
