import { Notify } from 'quasar';
import { has, get, isString } from 'lodash';

export function useException() {
  function handleException(error: any) {
    if (isString(error)) {
      Notify.create({
        message: error,
        position: 'top-right',
        color: 'negative',
      });
      return;
    }

    if (has(error, 'response.data.message')) {
      const message = get(error, 'response.data.message');
      Notify.create({
        message,
        position: 'top-right',
        color: 'negative',
      });
    } else {
      Notify.create({
        message: error.message,
        position: 'top-right',
        color: 'negative',
      });
    }
  }

  return { handleException };
}
