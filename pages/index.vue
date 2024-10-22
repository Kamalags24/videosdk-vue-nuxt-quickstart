<script setup lang="ts">
const sessionName = ref('');
/**
 * Navigate to a call page with the given session name
 *
 * @function create
 * @param {string} sessionName
 * @returns {Promise<void>}
 */
const create = async () => {
  const slug = sessionName.value
  if (slug)
    await navigateTo(`/call/${slug}`)
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold text-center my-4">Zoom VideoSDK Vue/Nuxt Quickstart</h1>
    <div class="flex self-center flex-col">
      <input type="text" placeholder="Session Name" v-model="sessionName"
        class="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 w-64 self-center" />
      <br />
      <button @click="create" class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 w-64 self-center">
        Create
      </button>
    </div>
  </div>
</template>
