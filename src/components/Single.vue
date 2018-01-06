<template>
    <div v-if="post">
      <div class="single-cover" v-bind:style="{'background-image': 'url(\'' + post._embedded['wp:featuredmedia'][0].source_url + '\')'}">
        <div class="overlay"></div>
        <div class="container">
          <h1>{{ post.title.rendered }}</h1>
        </div>
      </div>
      <div class="content-container">
        <div v-html="post.content.rendered"></div>
      </div>
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
    this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts/' + this.$route.params.id + '?_embed').then(
      response => {
        // get body data
        this.post = response.body
        console.log(this.post)
      },
      response => {
        // error callback
      }
    )
  }
}
</script>

<style lang="scss">
.single-cover {
  position: relative;
  height: 320px;
  background-size: cover;
  background-position: center;
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0+0,0.6+100 */
    background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 ); /* IE6-9 */
  }
  .container {
    position: relative;
    width: 980px;
    height: 100%;
    margin: 0 auto;
    h1 {
      position: absolute;
      bottom: 40px;
      width: 100%;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      font-size: 56px;
      color: #fff;
      text-align: center;
    }
  }
}
.content-container {
  max-width: 980px;
  margin: 40px auto;
  font-size: 24px;
  line-height: 32px;
  font-weight: 100;
  font-family: 'Roboto', sans-serif;
  p {
    margin: 10px 0;
  }
  img {
    max-width: 100%;
  }
}
</style>
