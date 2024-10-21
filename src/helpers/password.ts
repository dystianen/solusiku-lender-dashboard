const validatorPassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('Password harus diisi'))
  }
  if (value.length < 6 || value.length > 20) {
    return callback(new Error('Password harus terdiri dari 6-20 karakter'))
  }
  if (!/[A-Z]/.test(value) || !/\d/.test(value)) {
    return callback(new Error('Password harus mengandung 1 huruf besar dan 1 angka'))
  }
  return callback()
}

export default validatorPassword
