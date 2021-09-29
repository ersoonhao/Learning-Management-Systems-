const quiz = {template:`
            <h1>{{Title}}</h1>
            <div id="v-model-multiple-checkboxes">
            <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
            <label for="jack">Jack</label>
            <input type="checkbox" id="john" value="John" v-model="checkedNames" />
            <label for="john">John</label>
            <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
            <label for="mike">Mike</label>
            <br />
            <span>Checked names: {{ checkedNames }}</span>
            </div>`,
    
        data() {
            return {
                checkedNames : [],
                Title : "All Quiz"
            }
        }
        
}
