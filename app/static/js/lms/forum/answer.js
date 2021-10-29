const Answer = {
  template: `
            <h1>{{formTitle}}</h1>
            <div>
                <input id="Answer" v-model="answer" type="text" placeholder="Answer"/>
            </div>`,

  data () {
    return {
      answer: '',
      formTitle: 'Create an Answer'
    }
  }
}
