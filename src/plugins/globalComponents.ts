import type { App } from 'vue';

import BaseButton from '@/components/common/BaseComponents/BaseButton.vue';
import BaseInput from '@/components/common/BaseComponents/BaseInput.vue';
import BaseTextarea from '@/components/common/BaseComponents/BaseTextarea.vue';
import BaseSelect from '@/components/common/BaseComponents/BaseSelect.vue';
import BaseCard from '@/components/common/BaseComponents/BaseCard.vue';
import BaseSwitch from '@/components/common/BaseComponents/BaseSwitch.vue';
import BaseCheckbox from '@/components/common/BaseComponents/BaseCheckbox.vue';
import BaseDialog from '@/components/common/BaseComponents/BaseDialog.vue';
import BasePagination from '@/components/common/BaseComponents/BasePagination.vue';
import BaseRadioGroup from '@/components/common/BaseComponents/BaseRadioGroup.vue';
import BaseFileInput from '@/components/common/BaseComponents/BaseFileInput.vue';
import BaseConfirmationDialog from '@/components/common/BaseComponents/BaseConfirmationDialog.vue';
import { Skeleton } from '@/components/ui/skeleton';

export function registerGlobalComponents(app: App) {
  app.component('BaseButton', BaseButton);
  app.component('BaseInput', BaseInput);
  app.component('BaseTextarea', BaseTextarea);
  app.component('BaseSelect', BaseSelect);
  app.component('BaseCard', BaseCard);
  app.component('BaseSwitch', BaseSwitch);
  app.component('BaseCheckbox', BaseCheckbox);
  app.component('BaseDialog', BaseDialog);
  app.component('BasePagination', BasePagination);
  app.component('BaseRadioGroup', BaseRadioGroup);
  app.component('BaseFileInput', BaseFileInput);
  app.component('BaseConfirmationDialog', BaseConfirmationDialog);
  app.component('BaseSkeleton', Skeleton);
}
