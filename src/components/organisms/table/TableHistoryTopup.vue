<script lang="ts" setup>
import InputField from '@/components/atoms/input/InputField.vue'

const tableData = [
  {
    address_name: 'Home',
    street_name: 'Sunset Boulevard',
    city: 'Los Angeles',
    district: 'West District',
    village: 'Beverly Hills',
    postal_code: '90210',
    country: 'USA',
    detail_address: '1234 Sunset Blvd, Apt 101',
    longitude: '-118.4912'
  },
  {
    address_name: 'Office',
    street_name: 'Wall Street',
    city: 'New York',
    district: 'Financial District',
    village: 'Lower Manhattan',
    postal_code: '10005',
    country: 'USA',
    detail_address: '10 Wall St, Suite 500',
    longitude: '-74.0060'
  },
  {
    address_name: 'Vacation House',
    street_name: 'Rue de Rivoli',
    city: 'Paris',
    district: '1st Arrondissement',
    village: 'Louvre',
    postal_code: '75001',
    country: 'France',
    detail_address: '15 Rue de Rivoli',
    longitude: '2.3499'
  },
  {
    address_name: 'Warehouse',
    street_name: 'Shibuya Crossing',
    city: 'Tokyo',
    district: 'Shibuya',
    village: 'Shibuya',
    postal_code: '150-0002',
    country: 'Japan',
    detail_address: '7-2 Shibuya 2-Chome',
    longitude: '139.7013'
  },
  {
    address_name: "Friend's House",
    street_name: 'Queen Street',
    city: 'Auckland',
    district: 'Central',
    village: 'Auckland CBD',
    postal_code: '1010',
    country: 'New Zealand',
    detail_address: '45 Queen Street, Unit 8',
    longitude: '174.7633'
  }
]
</script>

<template>
  <div>
    <div class="tw-my-2 tw-flex tw-items-center tw-justify-between">
      <el-button size="large">EXPORT</el-button>

      <div>
        <InputField placeholder="Search" />
      </div>
    </div>
    <el-table :data="tableData">
      <el-table-column type="selection" :width="55" />
      <el-table-column property="address_name" label="ADDRESS NAME" :width="175" />
      <el-table-column property="street_name" label="STREET NAME" :width="175" />
      <el-table-column property="city" label="CITY" :width="175" />
      <el-table-column property="district" label="DISTRICT" :width="175" />
      <el-table-column property="village" label="VILLAGE" :width="175" />
      <el-table-column property="postal_code" label="POSTAL CODE" :width="175" />
      <el-table-column property="country" label="COUNTRY" :width="175" />
      <el-table-column property="detail_address" label="DETAIL ADDRESS" :width="175" />
      <el-table-column property="longitude" label="LONGITUDE" :width="175" />
    </el-table>
  </div>
</template>
