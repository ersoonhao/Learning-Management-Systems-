const comment = {
    template: `
            <div>
                <input id="Comment" v-model="comment" type="text" placeholder="Comment"/>
            </div>`,

    data() {
        return {
            comment: ''
        }
    }
}