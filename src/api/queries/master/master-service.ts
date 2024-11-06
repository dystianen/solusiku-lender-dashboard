import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type { TReqFilter } from '@/types/general'
import type { TReqIdWithFilter } from '@/types/master'
import type { TResCity, TResUserType } from '@/types/user'

const masterServices = {
  async gender() {
    const { data: gender } = await api.get<TResUserType>(`${LENDER_API}/data/gender`)
    return gender?.data ?? []
  },
  async province() {
    const { data: province } = await api.get<TResUserType>(`${LENDER_API}/data/province`, {
      params: {
        length: 50
      }
    })
    return province?.data ?? []
  },
  async city(payload: TReqIdWithFilter) {
    const { data: cities } = await api.get<TResCity>(`${LENDER_API}/data/city/${payload.id}`, {
      params: {
        length: 100
      }
    })
    return cities?.data ?? []
  },
  async district(payload: TReqIdWithFilter) {
    const { data: district } = await api.get<TResCity>(
      `${LENDER_API}/data/district/${payload.id}`,
      {
        params: {
          length: 100
        }
      }
    )
    return district?.data ?? []
  },
  async subDistrict(payload: TReqIdWithFilter) {
    const { data: subDistrict } = await api.get<TResCity>(
      `${LENDER_API}/data/subDistrict/${payload.id}`,
      {
        params: {
          length: 100
        }
      }
    )
    return subDistrict?.data ?? []
  },
  async sourceOfFound() {
    const { data: sourceOfFound } = await api.get<TResCity>(`${LENDER_API}/data/sourceOfFound`, {
      params: {
        length: 10
      }
    })
    return sourceOfFound?.data ?? []
  },
  async monthlyIncome() {
    const { data: monthlyIncome } = await api.get<TResCity>(`${LENDER_API}/data/monthlyIncome`, {
      params: {
        length: 10
      }
    })
    return monthlyIncome?.data ?? []
  },
  async bank(params?: TReqFilter) {
    const { data: bank } = await api.get<TResCity>(`${LENDER_API}/data/dataBank`, {
      params: {
        length: 50,
        ...params
      }
    })
    return bank?.data ?? []
  },
  async legalEntity() {
    const { data: legalEntity } = await api.get<TResCity>(`${LENDER_API}/data/legalEntity`, {
      params: {
        length: 100
      }
    })
    return legalEntity?.data ?? []
  },
  async businessLicense() {
    const { data: businessLicense } = await api.get<TResCity>(
      `${LENDER_API}/data/businessLicence`,
      {
        params: {
          length: 100
        }
      }
    )
    return businessLicense?.data ?? []
  },
  async businessField() {
    const { data: businessField } = await api.get<TResCity>(`${LENDER_API}/data/businessField`, {
      params: {
        length: 100
      }
    })
    return businessField?.data ?? []
  }
}

export default masterServices
