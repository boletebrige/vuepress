<template>
    <div>
      <div v-if="post">
        <div class="single-cover" v-bind:style="{'background-image': 'url(\'' + post._embedded['wp:featuredmedia'][0].source_url + '\')'}">
          <div class="overlay"></div>
          <div class="container">
            <h1>{{ post.title.rendered }}</h1>
            <div class="post-info cf">
              <span class="post-date">
                {{ filter(post.date, 'D.M.YYYY, HH:MM') }}
              </span>
              <span class="reading-time">
                {{ rT.text }}
              </span>
            </div>
          </div>
        </div>
        <div class="content-container">
          <div v-html="post.content.rendered"></div>
          <hr>
          <!-- <div class="comment" v-for="comment in comments" :key="comment.id">
            <p>{{ comment.author_name }}</p>
            <p>{{ comment.date }}</p>
            <p>{{ comment.content.rendered }}</p>
            <hr>
            <br>
          </div> -->
        </div>
      </div>
      <div class="loader" v-if="!post"></div>
    </div>
</template>
<script>
import readingTime from 'reading-time'

export default {
  name: 'Single',
  data () {
    return {
      post: null,
      comments: null,
      rT: null
    }
  },
  methods: {
    getPost (postId) {
      // get post by id this.$route.params.id
      this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts/' + postId + '?_embed').then(
        response => {
          // get body data
          this.post = response.body
          this.rT = readingTime(this.post.content.rendered)
        },
        response => {
          // error callback
        }
      )
      // get comments by post id
      this.$http.get('http://localhost/wordpress/wp-json/wp/v2/comments?post=' + postId).then(
        response => {
          // get body data
          this.comments = response.body
        },
        response => {
          // error callback
        }
      )
    }
  },
  mounted () {
    this.getPost(this.$route.params.id)
  }
}
</script>
