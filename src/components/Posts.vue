<template>
    <div>
      <post :posts="posts"></post>
      <div class="loader" v-if="!posts"></div>
    </div>
</template>
<script>
import Post from './Posts//Post.vue'
import readingTime from 'reading-time'

export default {
  name: 'Posts',
  components: {
    Post
  },
  data () {
    return {
      posts: null
    }
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed&per_page=14').then(response => {
        this.posts = response.body
        // inserting post reading time
        this.posts.forEach(el => {
          el.readingTime = readingTime(el.content.rendered)
        })
      }, response => {
        // error callback
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

