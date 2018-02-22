<template>
  <div v-if="comments" class="comments-container cf">
    <!-- <button class="comments-button" @click="displayCommnets(post.id)">Show comments ({{ comments[post.id].length }})</button> -->
      <div class="comment" v-for="(comment, index) in comments.content" :key="index">
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
  mounted () {
    // console.log(this.comments, this.comments.length, this.post.id)
  }
}
</script>

