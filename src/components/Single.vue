<template>
    <div v-if="post">
        {{ post.title.rendered }}
        <div v-html="post.content.rendered"></div>
    </div>
</template>
<script>
export default {
  name: 'Single',
  data () {
    return {
      post: null
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts/' + this.$route.params.id).then(
      response => {
        // get body data
        this.post = response.body
      },
      response => {
        // error callback
      }
    )
  }
}
</script>