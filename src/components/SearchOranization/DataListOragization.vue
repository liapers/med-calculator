<template>
    <option :value="name" />
</template>

<script>
export default {
  name: "ListOrg",
  props: {
   name: { type: String },
  },
}
</script>