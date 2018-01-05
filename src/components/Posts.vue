<template>
    <div>
      <div  class="post-cover"
            v-for="post in posts" :key="post.id"
            v-if="post._embedded['wp:featuredmedia']"
            v-bind:style="{'background-image': 'url(\'' + post._embedded['wp:featuredmedia'][0].source_url + '\')'}">
            <div class="post-title">
              <router-link :to="{ name: 'Single', params: { id: post.id } }">
                <span>
                  {{ post.title.rendered }}
                </span>
              </router-link>
            </div>
            <div class="overlay"></div>
      </div>
      <!-- <p v-html="post.excerpt.rendered"></p>
      <p>{{ post.date }}</p> -->
    </div>
</template>
<script>
export default {
  name: 'Posts',
  data () {
    return {
      posts: null
    }
  },
  mounted () {
    this.$http.get('http://localhost/wordpress//wp-json/wp/v2/posts?_embed').then(response => {
      console.log(response.body)
      this.posts = response.body
    }, response => {
      // error callback
    })
  }
}
</script>

<style lang="scss">
@function cp($target, $container) {
    @return ($target / $container) * 100%;
}

.post-cover {
  display: block;
  position: relative;
  float: left;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    .overlay {
      visibility: hidden;
      opacity: 0;
    }
  }

  &:first-child, &:nth-child(2) {
    width: 50%;
    height: 540px;
    a{
        font-size: 56px;
        font-weight: 700;
        span {
          padding: 40px 60px;
        }
      }
  }
  // find another solution =D
  &:nth-child(3), &:nth-child(4), &:nth-child(5) {
    width: calc(100% / 3);
    height: 360px;
    a{
        font-size: 42px;
        font-weight: 500;
        span {
          padding: 20px 30px;
        }
      }
  }
  .overlay {
    width: 100%;
    height: 100%;
    visibility: visible;
    opacity: 1;
    -webkit-transition: visibility 0s, opacity 0.5s ease-in-out; /* For Safari 3.1 to 6.0 */
    transition: visibility 0s, opacity 0.5s ease-in-out;

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0+0,0.6+100 */
    background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 ); /* IE6-9 */
  }

  // &:hover {
  //   .overlay {
  //     opacity: 0;
  //   }
  // }

  .post-title {
      position: absolute;
      width: 100%;
      height: 100%;
      a{
        width: 100%;
        height: 100%;
        display: block;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        text-decoration: none;
        span {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
  }

}


</style>


