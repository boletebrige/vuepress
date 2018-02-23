<template>
    <div class="comments-container">
        <div class="add-comment-title">
            <h3>Write a reply:</h3>
        </div>
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
</template>

<script>
export default {
  name: 'comments-form',
  props: ['post', 'index', 'comments'],
  data () {
    return {
      commentEmail: [],
      commentName: [],
      commentContent: []
    }
  },
  methods: {
    addComment (id, index) {
      // add post commet
      this.$http.post('http://localhost/wordpress/wp-json/wp/v2/comments?post=' + id + '&author_name=' + this.commentName[index] + '&author_email=' + this.commentEmail[index] + '&content=' + this.commentContent[index]).then(response => {
        // display progress bar
        this.$Progress.start()
        // clear input fields
        const clear = async () => {
          this.comments.content.push({author_name: this.commentName[index], content: {rendered: this.commentContent[index]}, date: new Date()})
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
  }
}
</script>

