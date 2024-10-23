<template>
  <el-config-provider namespace="ep">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </el-config-provider>
</template>
