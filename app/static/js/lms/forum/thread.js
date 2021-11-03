const Thread = {
  template: `
            <h1>{{formTitle}}</h1>
            <div>
                <input id="Title" v-model="title" type="text" placeholder="Title"/>
                <input id="Question" v-model="question" type="text" placeholder="Question"/>
            </div>`,

  data () {
    return {
      title: '',
      question: '',
      formTitle: 'Create a Thread'
    }
  }
}
