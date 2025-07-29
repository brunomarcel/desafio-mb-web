export const isFullName = name => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s\-'][A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  return regex.test(name?.trim());
};

export const isEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@\.]{2,}$/;
  return regex.test(email?.trim());
};

export const isCpf = cpf => {
  const regexWithMask = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
  const regexOnlyNumbers = /^[0-9]{11}$/;
  return (
    regexWithMask.test(cpf?.trim()) ||
    regexOnlyNumbers.test(cpf?.trim())
  )
};

export const isDate = dateOfBirth => {
  const today = new Date()
  const date = new Date(dateOfBirth)

  return date < today
}

export const isPhone = phone => {
  const regex = /^[0-9]{11}$/;
  return regex.test(phone?.trim());
};

export const isPassword = password => {
  const regex = /^[0-9a-zA-A]{8,}$/;
  return regex.test(password?.trim());
};

export const isRegisteredName = registeredName => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:(?:[\s\-'][A-Za-zÀ-ÖØ-öø-ÿ]+)+)?$/;
  return regex.test(registeredName?.trim());
};

export const isCnpj = cnpj => {
  const regexWithMask = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
  const regexOnlyNumbers = /^[0-9]{14}$/;
  return (
    regexWithMask.test(cnpj?.trim()) ||
    regexOnlyNumbers.test(cnpj?.trim())
  )
};
