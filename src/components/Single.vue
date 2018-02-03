<template>
    <div>
      <div v-if="posts">
        <div v-for="(post, index) in posts" :key="post.id" :id="post.id">
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
            <hr style="margin-top:40px">
          </div>
          <div class="comments-container">
            <form class="comment-form cf" @submit.prevent="addComment(post.id, index)" data-vv-scope="commentScope">
              <p class="input-container" :class="{ 'control': true }">
                <input v-model="commentEmail[index]" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('commentScope.email' + index) }" :name="'email' + index" type="text" placeholder="Email">
                <span v-show="errors.has('commentScope.email' + index)" class="help is-danger">{{ errors.first('commentScope.email' + index) && errors.first('commentScope.email' + index).replace(/[0-9]/g, '') }}</span>
              </p>
              <p class="input-container" :class="{ 'control': true }">
                <input v-model="commentName[index]" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('commentScope.name' + index) }" :name="'name' + index" type="text" placeholder="Name">
                <span v-show="errors.has('commentScope.name' + index)" class="help is-danger">{{ errors.first('commentScope.name' + index) && errors.first('commentScope.name' + index).replace(/[0-9]/g, '') }}</span>
              </p>
              <div class="textarea-container" :class="{ 'control': true }">
                <textarea v-model="commentContent[index]" rows="4" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('commentScope.name' + index) }" :name="'comment' + index" type="text" placeholder="Comment"></textarea>
                <span v-show="errors.has('commentScope.comment' + index)" class="help is-danger">{{ errors.first('commentScope.comment' + index) && errors.first('commentScope.comment' + index).replace(/[0-9]/g, '') }}</span>
              </div>
              <button>Reply</button>
            </form>
          </div>
        </div>
      </div>
      <div class="top" v-if="scrollTo" @click="toTop()"><span class="fi flaticon-arrows"></span></div>
      <div class="loader" v-if="!posts.length"></div>
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
      lastID: null,
      scrollTo: false,
      commentEmail: [],
      commentName: [],
      commentContent: []
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
    },
    addComment (id, index) {
      // add post commet
      this.$http.post('http://localhost/wordpress/wp-json/wp/v2/comments?post=' + id + '&author_name=' + this.commentName[index] + '&author_email=' + this.commentEmail[index] + '&content=' + this.commentContent[index]).then(response => {
        // display progress bar
        this.$Progress.start()
        // clear input fields
        const clear = async () => {
          this.commentEmail.pop()
          this.commentName.pop()
          this.commentContent.pop()
        }
        // reset validators
        clear().then(() => {
          this.$validator.reset('commentScope')
        })
      }, response => {
        // error callback
        this.$Progress.fail()
      })
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed&per_page=14').then(response => {
          this.$Progress.start()
          let tempPosts = response.body
          // get id of next post
          if (tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1]) {
            this.lastID = tempPosts[tempPosts.map(e => e.id).indexOf(this.lastID) + 1].id
            this.getPost(this.lastID)
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
    // get comments
    // http://localhost/wordpress/wp-json/wp/v2/comments?post=59&author_name=John&author_email=josip.ravas.broj@gmail.com&content=blabla
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
