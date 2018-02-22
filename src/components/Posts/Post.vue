<template>
  <div v-if="posts" class="cf">
      <div  class="post-cover"
        v-for="post in posts" :key="post.id"
        v-if="post._embedded['wp:featuredmedia']"
        v-bind:style="{'background-image': 'url(\'' + post._embedded['wp:featuredmedia'][0].source_url + '\')'}">
        <!-- POST BODY -->
        <div class="post-text-container">
          <router-link :to="{ name: 'Single', params: { id: post.id } }">
            <div class="post-text">
              <div class="post-title">{{ post.title.rendered }}</div>
              <div class="post-info cf">
                <span class="post-date">
                  {{ filter(post.date, 'D.M.YYYY, HH:MM') }}
                </span>
                <span class="reading-time">
                  {{ post.readingTime.text }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="overlay"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['posts']
}
</script>

