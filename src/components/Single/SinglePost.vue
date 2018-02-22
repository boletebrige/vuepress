<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'single-post',
  props: ['post']
}
</script>

