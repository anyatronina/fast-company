export function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return "Неправильный логин и/или пароль";
    case "INVALID_PASSWORD":
      return "Неправильный логин и/или пароль";
    case "EMAIL_EXISTS":
      return "Пользователь с таким email уже существует";
    default:
      return "Слишком много попыток входа, попробуйте позднее";
  }
}
