<template>
    <div>
      <div  class="post-cover"
            v-for="post in posts" :key="post.id"
            v-if="post._embedded['wp:featuredmedia']"
            v-bind:style="{'background-image': 'url(\'' + post._embedded['wp:featuredmedia'][0].source_url + '\')'}">
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
import readingTime from 'reading-time'
import moment from 'moment'

export default {
  name: 'Posts',
  data () {
    return {
      posts: null
    }
  },
  mounted () {
    this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed&per_page=14').then(response => {
      this.posts = response.body
      // inserting post reading time
      this.posts.forEach(el => {
        el.readingTime = readingTime(el.content.rendered)
      })
    }, response => {
      // error callback
    })
  },
  methods: {
    filter (date, format) {
      return moment(date).format(format)
    }
  }
}
</script>

