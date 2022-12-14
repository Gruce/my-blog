<script setup>
const { data, pending, error, refresh } = await useFetch(
  "https://api.github.com/users/gruce",
  {
    headers: {
      Authorization: "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",
    },
  }
);
</script>

<template>
  <div class="flex gap-6 rounded-lg" v-if="data">
    <img class="w-24 m-0 rounded-lg sm:w-40" :src="data.avatar_url" alt="Gruce Github">
    <div class="flex flex-col gap-1">
        <div class="mb-1 text-lg sm:text-2xl">
            <span class="font-semibold">{{data.name}}</span>
            <span class="ml-2 text-gray-400">( {{data.login}} )</span>
        </div>
        <div class="text-sm text-gray-500">
            <Icon name="ph:users-fill" class="mr-2" />
            <span>{{data.followers}} followers · {{data.following}} following</span>
        </div>
        <div class="text-sm text-gray-500">
            <Icon name="ri:git-repository-fill" class="mr-2" />
            <span>{{data.public_repos}} public repositories</span>
        </div>
        <!-- <img :src="data.avatar_url" alt=""> -->
    </div>
  </div>
</template>

