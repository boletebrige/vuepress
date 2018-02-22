<template>
    <div>
      <div v-if="posts">
        <div v-for="(post, index) in posts" :key="post.id" :id="post.id">
          <single-post :post="post"></single-post>
          <comments-list :post="post" :comments="comments[index]"></comments-list>
          <comment-form :post="post" :index="index" :comments="comments[index]"></comment-form>
        </div>
      </div>
      <div class="top" v-if="scrollTo" @click="toTop()"><span class="fi flaticon-arrows"></span></div>
      <div class="loader" v-if="!posts.length"></div>
    </div>
</template>
<script>

import SinglePost from './Single/SinglePost.vue'
import CommentsList from './Single/CommentsList.vue'
import CommentForm from './Single/CommentForm.vue'
import readingTime from 'reading-time'

export default {
  name: 'Single',
  components: {
    SinglePost,
    CommentsList,
    CommentForm
  },
  data () {
    return {
      posts: [],
      rT: null,
      bottom: false,
      lastID: null,
      scrollTo: false,
      comments: [],
      commentsShow: []
    }
  },
  methods: {
    getPost (postId) {
      // get post by id this.$route.params.id
      this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts/' + postId + '?_embed').then(
        response => {
          // get body data
          response.body.rT = readingTime(response.body.content.rendered)
          this.posts.push(response.body)
        },
        response => {
          // error callback
        }
      )
    },
    getPostComments (postId) {
      // get comments by psot id
      this.$http.get('http://localhost/wordpress/wp-json/wp/v2/comments?post=' + postId).then(
        response => {
          // get body data
          response.body.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date)
          })
          this.comments.push({ id: postId, content: response.body })
        },
        response => {
          // error callback
        }
      )
    },
    bottomVisible () {
      // check if bootom of page
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    toTop () {
      // scroll to the top of current post
      var postIds = this.posts.map(e => document.getElementById(e.id).getBoundingClientRect().y)
      var el = postIds.filter(el => {
        if (el < 0) {
          return el
        }
      })
      window.scrollBy(0, (Math.max(...el)))
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        // load next post when user rach bottom of post
        this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed&per_page=14').then(response => {
          this.$Progress.start()
          let tempPosts = response.body
          // get id of next post
          if (tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1]) {
            this.lastID = tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1].id
            // get post
            this.getPost(this.lastID)
            // get post comments
            this.getPostComments(this.lastID)
            this.$Progress.finish()
          } else {
            console.log('no more posts')
          }
        }, response => {
          // error callback
          this.$Progress.fail()
        })
      }
    }
  },
  created () {
    // get post by id and store id as last loaded post
    this.lastID = Number(this.$route.params.id)
    this.getPost(this.lastID)
    // get post comments
    this.getPostComments(this.lastID)
    // check if user scrolled to bottom of post to load next post
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
      if (window.scrollY > 300) {
        this.scrollTo = true
      } else {
        this.scrollTo = false
      }
    })
  }
}
</script>
