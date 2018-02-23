<template>
  <div v-if="comments" class="comments-container cf">
    <button class="comments-button" v-if="comments.content.length" @click="displayComments">{{ text }} ({{ comments.content.length }})</button>
      <div class="comment" v-for="(comment, index) in comments.content" :key="index" v-if="commentsVisible">
        <div class="title cf">
          <span>{{ comment.author_name}}</span>
          <span> {{ filter(comment.date, 'D.M.YYYY, HH:MM') }}</span>
        </div>
        <!-- ################### SECURITY ISSUE ################### -->
        <div class="comment-content" v-html="comment.content.rendered"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'comments-list',
  props: ['post', 'comments'],
  data () {
    return {
      commentsVisible: false,
      text: 'Show comments'
    }
  },
  methods: {
    displayComments () {
      this.commentsVisible = !this.commentsVisible
      if (this.commentsVisible) {
        this.text = 'Hide comments'
      } else {
        this.text = 'Show comments'
      }
    }
  }
}
</script>

