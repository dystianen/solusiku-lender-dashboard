export type TReqRegisterIndividual = {
  idCardNumber: string
  taxNumber: string
  genderId: string
  birthPlace: string
  birthDate: string
  sourceOfFoundId: string
  monthlyIncomeId: string
  bankId: string
  bankAccountNumber: string
  provinceId: string
  cityId: string
  districtId: string
  subDistrictId: string
  address: string
  postalCode: string
  idCardNumberFile?: string
  selfiePhotoFile?: string
  taxNumberFile?: string
  proofOfIncomeFile?: string
}

export type TReqRegisterInstitution = {
  companyName: string
  legalEntityId: string
  businessFieldId: string
  businessLicenseId: string
  businessLicenseNumber: string
  deedNumber: string
  idCardNumber: string
  taxNumber: string
  birthPlace: string
  birthDate: string
  sourceOfFoundId: string
  monthlyIncomeId: string
  bankId: string
  bankAccountNumber: string
  provinceId: string
  cityId: string
  districtId: string
  subDistrictId: string
  address: string
  postalCode: string
}
