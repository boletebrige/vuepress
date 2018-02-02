<template>
    <div>
      <div v-if="posts">
        <div v-for="post in posts" :key="post.id">
          <div class="single-cover" v-bind:style="{'background-image': 'url(\'' + post._embedded['wp:featuredmedia'][0].source_url + '\')'}">
            <div class="overlay"></div>
            <div class="container">
              <h1>{{ post.title.rendered }}</h1>
              <div class="post-info cf">
                <span class="post-date">
                  {{ filter(post.date, 'D.M.YYYY, HH:MM') }}
                </span>
                <span class="reading-time">
                  {{ post.rT.text }}
                </span>
              </div>
            </div>
          </div>
          <div class="content-container">
            <div v-html="post.content.rendered"></div>
            <hr>
          </div>
        </div>
      </div>
      <div class="loader" v-if="!posts"></div>
    </div>
</template>
<script>
import readingTime from 'reading-time'

export default {
  name: 'Single',
  data () {
    return {
      posts: [],
      rT: null,
      bottom: false,
      lastID: null
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
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        // this.addBeer()
        console.log('at bottom')
        this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed&per_page=14').then(response => {
          let tempPosts = response.body
          // get index of current post
          // console.log(tempPosts.map(e => e.id).indexOf(this.lastID))
          // let next = tempPosts.map(e => e.id).indexOf(this.lastID) + 1
          // console.log(tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1].id)
          if (tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1]) {
            this.lastID = tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1].id
            this.getPost(this.lastID)
          } else {
            console.log('no more posts')
          }
        }, response => {
          // error callback
        })
      }
    }
  },
  created () {
    this.lastID = Number(this.$route.params.id)
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    this.getPost(this.lastID)
  }
}
</script>
