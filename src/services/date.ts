import moment from 'moment';

export function useDate() {
  function dateToClient(date: string | null): string | null {
    if (moment(date).isValid()) {
      return moment(date).format('DD/MM/YYYY');
    }
    return null;
  }
  function dateToDatabase(date: string | null): string | null {
    if (moment(date, 'DD/MM/YYYY').isValid()) {
      return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }
    return null;
  }
  return {
    dateToClient,
    dateToDatabase,
  };
}
