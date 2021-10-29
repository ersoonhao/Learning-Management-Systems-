const Answer = {
  template: `
            <h1>{{formTitle}}</h1>
            <div>
                <input id="Comment" v-model="comment" type="text" placeholder="Comment"/>
            </div>`,

  data () {
    return {
      comment: '',
      formTitle: 'Create a comment'
    }
  }
}
