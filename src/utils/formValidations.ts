export default class FormValidations {
  static validateEmail(email: string, callback: (error: string) => void): boolean {
    if (!isEmail(email)) {
      callback('correo electrónico no válido')
      return false
    }
    return true
  }

  static validateFullName(fullName: string, callback: (error: string) => void): boolean {
    if (fullName.length < 3) {
      callback('nombre demasiado corto')
      return false
    }
    return true
  }

  static validatePhone(phone: string, callback: (error: string) => void): boolean {
    if (!isPhoneNumber(phone)) {
      callback('número de teléfono no válido')
      return false
    }
    return true
  }

  static validateEmailPhone(emailPhone: string, callback: (error: string) => void): boolean {
    if (isOnlyNumbers(emailPhone)) { // phone number
      if (!isPhoneNumber(emailPhone)) {
        callback('número de teléfono no válido')
        return false
      }
    } else { // email
      if (!emailPhone.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        callback('correo electrónico no válido')
        return false
      }
    }
    return true
  }

  static validatePassword(password: string, callback: (error: string) => void): boolean {
    if (password.length < 8) {
      callback('contraseña demasiado corta')
      return false
    }
    return true
  }

  static validateCreatePassword(password: string, callback: (error: string) => void): boolean {
    if (password.length < 8) {
      callback('contraseña demasiado corta')
      return false
    }
    if (!isStrongPassword(password)) {
      callback('Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
      return false
    }
    return true
  }
}


const isOnlyNumbers = (value: string) => {
  return value.match(/^\d+$/)
}

const isPhoneNumber = (phoneNumber: string) => {
  const regex = /^\(\d{3}\) \d{3}-\d{4}$/
  return regex.test(phoneNumber)
}

const isEmail = (email: string) => {
  return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
}

const isStrongPassword = (password: string) => {
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/
  return regex.test(password)
}
