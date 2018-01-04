<template>
    <div>
        <div v-for="post in posts" :key="post.id">
            <div v-if="post._embedded['wp:featuredmedia']">{{ post._embedded['wp:featuredmedia'][0].source_url }}</div>
            <router-link :to="{ name: 'Single', params: { id: post.id } }">{{ post.title.rendered }}</router-link>
            <p v-html="post.excerpt.rendered"></p>
            <p>{{ post.date }}</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Posts',
  data () {
    return {
      posts: null
    }
  },
  mounted () {
    this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed').then(response => {
      console.log(response.body)
      this.posts = response.body
    }, response => {
      // error callback
    })
  }
}
</script>

