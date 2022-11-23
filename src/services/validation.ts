export function useValidation() {
  function required(val: string) {
    if (val === '' || val === null) {
      return 'Campo obrigatório';
    }

    return true;
  }

  function min6(val: string) {
    if (typeof val === 'string' && val.length < 6) {
      return 'No mínimo 6 caracteres';
    }

    return true;
  }

  function isValidEmail(val: string) {
    if (val === '' || val === null) {
      return true;
    }

    if (val.search('@') == -1) {
      return 'E-mail inválido';
    }
    return true;
  }

  return {
    required,
    min6,
    isValidEmail,
  };
}
