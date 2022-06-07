<script setup>
const { data, pending, error, refresh } = await useFetch(
  "https://api.github.com/users/gruce/repos",
  {
    headers: {
      Authorization: "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",
    },
  }
);
</script>

<template>
  <div>
    <ul v-if="data" class="p-0">
      <li v-for="(item, index) in data" :key="index" class="flex space-x-2 group">
        <span class="flex-shrink-0 w-6 h-6 text-gray-300">{{index+1}}</span>
        <span>
          <Markdown :use="() => item.name" unwrap="li" />
        </span>
        <a class="invisible ml-2 group-hover:visible" :href="item.html_url">
            <Icon name="ph:link-simple-bold" />
        </a>
        <span class="mx-2 text-gray-500"> — {{new Date(item.created_at).toDateString()}}</span>
      </li>
    </ul>
  </div>
</template>

