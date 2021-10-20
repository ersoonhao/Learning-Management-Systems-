_SESSION = {
    accountId: "U100001",
    username: "robin",
    isAdmin: true,
    isTrainer: true,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    sessionId: "0q8l8"
}
function getUserSession(){
    return _SESSION
}

function API(path){
    return "/api" + path;
}

function sessionExpired(){
    _SESSION = null;
}


//Templates
Vue.component("lms-head", {
    props:{
        session: { type: Object }
    },
    template: `
        <header>
            <a href="/" class="logo">LMS</a>
            <div class="search">
                <input type="text" placeholder="Search" /> <!--onkeypress="searchQuery(event)"-->
                <i class="fa fa-search"></i>
            </div>
            <ul class="navigation">
                <li v-show="session"><a href="/chat">Chat</a></li>
                <li v-show="session"><a href="/mycourses">My Courses</a></li>
                <li v-show="session && (session.isAdmin || session.isTrainer)"><a href="/manage">Manage</a></li>
                <li v-show="session"><a href="javascript: loadUserProfile();"><i class="fa fa-user"></i></a></li>
                <li v-show="!session"><a href="/login">Login</a></li>
            </ul>
        </header>
    `
});
Vue.component("zingo-hs", {
    props: ['title', 'href'],
    template: `
        <div class="lms-wrapper horizontal-wrapper">
            <div class="clearfix">
                <h6 class="title listing-font-bold" v-text="title"></h6>
                <div class="action float-right d-block"><a :href="href">View all</a></div>
            </div>
            <div class="content">
                <div class="ctnZingoHS">
                    <div class="zingoHS"><slot></slot></div>
                    <div class="zingoHSController d-none d-md-block">
                        <button class="zhscItem zhscItemLeft"><img src="/images/iconArrowLeft.svg"/></button>
                        <button class="zhscItem zhscItemRight"><img src="/images/iconArrowRight.svg"/></button>
                    </div>
                </div>
            </div>
        </div>
    `
});
function setupZingoHS(){
    Array.from(document.getElementsByClassName("ctnZingoHS")).forEach(function(ctnZingoHS){ 
        //Setup Controller
        let hsContent = ctnZingoHS.getElementsByClassName("zingoHS")[0];
        let hsController = ctnZingoHS.getElementsByClassName("zingoHSController")[0]
        let left = hsController.getElementsByClassName("zhscItemLeft")[0];
        let right = hsController.getElementsByClassName("zhscItemRight")[0];
        if(hsContent != null && left != null && right != null){
            left.addEventListener("click", zingoHSControllerPressed.bind(null, event, hsContent, -1));
            right.addEventListener("click", zingoHSControllerPressed.bind(null, event, hsContent, 1));
        }
    })
}
function zingoHSControllerPressed(event, hsContent, direction){
    let hsContentItems = hsContent.children;
    if(hsContentItems.length > 0){
        let hsContentWidth = hsContent.getBoundingClientRect().width;
        let hsItemWidth = hsContent.children[0].getBoundingClientRect().width;
        let multiplier = Math.max(1, Math.floor(hsContentWidth / hsItemWidth)/2);
        let scrollDistance = hsItemWidth * multiplier;
        console.log(hsContentWidth, hsItemWidth, multiplier, scrollDistance);
        let scrollX = hsContent.scrollLeft + scrollDistance * direction;
        $(hsContent).animate({ scrollLeft: scrollX }, 300);
    }
}
Vue.component("hs-course-item", {
    props: {
        "cdata": { type: Object }
    },
    template: `
        <a class="zingoHSItem zingoWidgetLink" :href="'course/' + cdata.courseId">
            <div class="listing-item-wrapper">
                <div class="listing-item-head">
                    <img class="image" :src="cdata.displayPicture">
                    <div v-if="cdata.completed" class="listing-item-tag lms-wrapper">
                        <span class="lms-font-semibold">Completed</span><img src="/images/check.png">
                    </div>
                </div>
                <div class="listing-item-body">
                    <div class="li-location">{{ dateFormat(cdata.classStartDateTime) }} - {{ dateFormat(cdata.classEndDateTime) }}</div>
                    <div class="li-title lms-font-semibold" >{{ cdata.title }}</div>
                    <div class="li-proptype lms-font-semibold">{{ cdata.noOfLessons }} lesson course</div>
                </div>
            </div>
        </a>
    `, methods: {
        dateFormat: (d) => {
            return [(d.getMonth()+1), d.getDate(), d.getFullYear()].join('/')
        }
    }
})

//Menu
function initMenu(sections, focus_section_index, focus_link_index){
    return {
        sections: sections,
        focus_section_index: focus_section_index,
        focus_link_index: focus_link_index
    }
    /* SAMPLE INIT
    let section = [{ 
        id: "C1",
        title: "Course",
        subtitle: "LMS Courses",
        links: [
            { title: "Manage Courses", link: "/manage/courses", completed: false }
        ]
    }]
    initMenu(sections, 0)
    */
}
Vue.component("side-menu", {
    props: {
        menu: { type: Object }
    },
    template: `
        <div class="accordion accordion-flush" id="side-menu">
            <div class="side-menu-group accordion-item" v-for="(section, i) in menu.sections">
                <div class="accordion-header">
                    <button class="side-menu-button accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#section_' + section.id">
                        <div class="lms-font-semibold" v-text="section.title"></div>
                        <small v-text="section.subtitle"></small>
                    </button>
                </div>
                <div :id="'section_' + section.id" :class="(i == menu.focus_section_index)?'accordion-collapse collapse show':'accordion-collapse collapse'" data-bs-parent="#side-menu">
                    <div class="list-group pt-2 pb-2">
                        <a v-for="(link, l_i) in section.links" :href="link.link" :class="(l_i == menu.focus_link_index)?'list-group-item list-group-item-action side-menu-item active':'list-group-item list-group-item-action side-menu-item'">
                            <span v-text="link.title"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
})
Vue.component("m-div", {
    //Menu div
    props: {
        menu: { type: Object },
        title: { type: String },
        subtitle: { type: String },
    },
    template: `
        <div>
            <h4 class="lms-font-bold" v-text="title"></h4>
            <h6 class="mb-5" v-text="subtitle"></h6>
            <div class="row">
                <div class="col-md-3">
                    <side-menu :menu="menu"></side-menu>
                </div>
                <div class="col-md-9 px-5">
                    <slot></slot>
                </div>
            </div>
        </div>
    `
});
function getParams(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const QUESTION_TYPES_MCQ = 'MCQ';

Vue.component("q-input-field", {
    props: {
        qn: {
            type: Object
        }
    },
    template:  `
        <div>
            <input v-if="qn._type == 'text' || qn._type == 'number'" :id="inputId" v-model="qn.value" :type="qn._type" :placeholder="qn.placeholder" :min="qn.min != null ? qn.min : ''" :max="qn.max != null ? qn.max : ''" :step="qn.step != null ? qn.step : ''"/>
            <textarea v-else-if="qn._type == 'textbox'" id="form-description" v-model="qn.value" :placeholder="qn.placeholder"></textarea>
            <div v-else-if="qn._type == 'radio' || qn._type == 'checkbox'">
                <ul class="list-unstyled">
                    <li v-for="(o, i) in qn.questionOptions">
                        <table style="vertical-align: middle; max-width: 100%">
                            <tr style="max-width: 100%">
                                <td v-show="o.editing == false" :class="generateQONoEdit(i)">
                                    <button class="btn" style="opacity: 0.9" @click="editToggle(qn, o, i, false)"><i class="fa fa-pencil"></i></button>
                                </td>
                                <td v-show="o.editing == false" :class="generateQONoEdit(i)" style="padding-right: 5px; border-right: 2px solid #ECECEC;">
                                    <button class="btn" style="opacity: 0.9" @click="deleteOption(qn, o, false)"><i class="fa fa-trash"></i></button>
                                </td>
                                <td v-show="o.editing == true" :class="generateQOEdit(i)">
                                    <button class="btn" style="opacity: 0.9" @click="editSave(qn, o, i)"><i class="fa fa-save"></i></button>
                                </td>
                                <td v-show="o.editing == true" :class="generateQOEdit(i)" style="padding-right: 5px; border-right: 2px solid #ECECEC;">
                                    <button class="btn" style="opacity: 0.9" @click="editToggle(qn, o, i, false)"><i :class="o.questionOptionId?'fa fa-undo':'fa fa-times-circle'"></i></button>
                                </td>
                                <td v-show="o.editing != null" style="width: 20px;">
                                </td>
                                <td>
                                    <div v-show="o.editing == null || o.editing == false" :class="generateQONoEdit(i)"><input :id="generateQOId(i)" :type="qn._type" :name="inputId" :value="o.questionOptionId" v-model="qn.value" style="margin-top: 10px; margin-bottom: 10px;"/><label :for="generateQOId(i)" v-text="o.optionText"></label></div>
                                    <input v-show="o.editing == true" :id="generateQOEditId(i)" :class="generateQOEdit(i)" type="text" v-model="o.editOptionText" style="width: 200px"/>
                                </td>
                            </tr>
                        </table>    
                    </li>
                </ul>
                <button v-show="qn.editor != null" class="btn text-highlight" @click="addOption(qn)">Add option</button>
            </div>
        </div>
    `,
    methods: {
        addOption: function(qn){
            //Add option template
            qn.questionOptions.push({ 
                tempQuestionOptionId: (Math.random() + 1).toString(36).substring(7), 
                questionOptionId: null, optionText: "", isCorrect: false, isSelected: false, questionId: qn.questionId, editing: true
            })
        },
        editToggle: function(qn, o, i, force){
            console.log(o);
            o.editOptionText = o.optionText;
            document.getElementById(this.generateQOEditId(i)).value = o.editOptionText;

            let noEdits = document.getElementsByClassName(this.generateQONoEdit(i))
            let edits = document.getElementsByClassName(this.generateQOEdit(i))
            if(!o.editing){
                //Edit
                for(let edit of edits){
                    edit.style.display = "";
                }
                for(let noEdit of noEdits){
                    noEdit.style.display = "none";
                }
                o.editing = !o.editing;
            }else{
                //Cancel edit
                if(force || confirm("Do you wish to cancel your edit?")){
                    if(o.questionOptionId != null){
                        for(let edit of edits){
                            edit.style.display = "none";
                        }
                        for(let noEdit of noEdits){
                            noEdit.style.display = "";
                        }
                    }else{
                        this.deleteOption(qn, o, true)
                    }
                    o.editing = !o.editing;
                }
            }
        },
        editSave: function(qn, o, i){
            if(o.optionText == o.editOptionText){
                this.editToggle(qn, o, i, true) //Update UI
                o.editOptionText = "" //Reset
                return;
            }
            if(confirm("Do you want to save?")){
                o.optionText = o.editOptionText
                //TODO: Save
                let questionOptionId = o.questionOptionId;
                let data = { 
                    questionOption: o,
                    session: getUserSession()
                };
                var xhr = new XMLHttpRequest();
                xhr.vue = this;
                let update = questionOptionId != null;
                if(update){
                    xhr.open("POST", API("/quiz/updateQuestionOption"), true);
                }else{
                    xhr.open("POST", API("/quiz/addQuestionOption"), true);
                    data.questionId = qn.questionId;
                }
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        if (xhr.status == 200) {
                            alert("Successfully saved");
                            if(!update){
                                let dataJSON = JSON.parse(xhr.responseText);
                                console.log(dataJSON);
                                o.questionOptionId = dataJSON.questionOption.questionOptionId;
                            }
                            this.vue.editToggle(qn, o, i, true) //Update UI
                            o.editOptionText = "" //Reset
                            
                        }else if(xhr.status == 401){
                            sessionExpired();
                            return;
                        } else {
                            alert("An error has occured - " + xhr.status);
                            console.log(xhr.responseText);
                            return;
                        }
                    }
                };
                xhr.send(JSON.stringify(data));
                console.log(data);
            }
        },
        deleteOption: function(qn, o, force){
            if(o.questionOptionId == null){
                if(o.tempQuestionOptionId == null){
                    alert("Error: Unable to identify question option.")
                    return
                }
                qn.questionOptions = qn.questionOptions.filter(function(_o) { return _o.tempQuestionOptionId != o.tempQuestionOptionId; });
                return
            }
            if(force || confirm("Do you want to delete?")){
                let data = { 
                    questionOptionId: o.questionOptionId,
                    session: getUserSession(),
                };
                var xhr = new XMLHttpRequest();
                xhr.open("POST", API("/quiz/deleteQuestionOption"), true);
                xhr.setRequestHeader("Content-Type", "application/json");
                
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        if (xhr.status == 200) {
                            //Update UI
                            qn.questionOptions = qn.questionOptions.filter(function(_o) { return _o.questionOptionId != o.questionOptionId; });
                        }else if(xhr.status == 401){
                            sessionExpired();
                            return;
                        } else {
                            alert("An error has occured - " + xhr.status);
                            console.log(xhr.responseText);
                            return;
                        }
                    }
                };
                xhr.send(JSON.stringify(data));
                console.log(data);
            }
        },
        generateQOId: function(i){
            return `${this.inputId}-QO-${i}`
        },
        generateQOEditId: function(i){
            return `${this.inputId}-QONEI-${i}`
        },
        generateQONoEdit: function(i){
            return `${this.inputId}-QONE-${i}`
        },
        generateQOEdit: function(i){
            return `${this.inputId}-QOE-${i}`
        }
    },
    computed: {
        inputId: function(){
            return `QN-${this.qn.questionId}`
        },
    }, data(){
        return {
            editOptionText: ""
        }
    }
});

Vue.component("q-input", {
    props: {
        qn: {
            type: Object
        }
    },
    template:  `
        <div>
            <div :id="ctnInputId" class="lms-input">
                <label class="lms-input-label" v-text="qn.title"></label><span class="mandatory" v-show="qn.required">*</span> <i class="icon-alert fa fa-exclamation-circle" v-show="qn.failedValidation"></i>
                <q-input-field :qn="qn"/>
            </div>
        </div>
    `,
    methods: {
        generateSV: function(data){
            if(data != null){
                if(typeof data === "string"){
                    return data.split(";").map(v => { return { v: v.trim(), d: v.trim() } });
                }else if(Array.isArray(data)){
                    let sv = []
                    for(d of data){
                        sv.push({ v: d.questionId, d: d.optionText })
                    }
                    console.log(sv);
                    return sv;
                }
            }
            return [];
        },
        generateQOId: function(i){
            return `${this.inputId}-SV-${i}`
        }
    },
    computed: {
        ctnInputId: function(){
            return `CTN-${this.qn.questionId}`
        }
    }
});
Vue.component("edit-q-input", {
    props: {
        qn: {
            type: Object
        }
    },
    template: `
        <div :id="qn.questionId" class="ctn-question clearfix">
            <ul class="ctn-question-action list-inline">
                <li class="list-inline-item"><button class="btn" @click="$emit('edit', qn)"><i class="fa fa-edit"></i></button></li>
                <li class="list-inline-item"><button class="btn" @click="$emit('remove', qn)"><i class="fa fa-trash"></i></button></li>
            </ul>
            <div class="ctn-question-body">
                <div :id="ctnInputId" class="lms-input">
                    <label class="lms-input-label" v-text="qn.title"></label><span class="mandatory" v-show="qn.required">*</span> <i class="icon-alert fa fa-exclamation-circle" v-show="qn.failedValidation"></i>
                </div>
            </div>
            <hr style="clear: both;"/>
            <div class="lms-input" style="padding-top: 0;">
                <q-input-field :qn="qn"/>
            </div>
        </div>
    `,
    computed: {
        ctnInputId: function(){
            return `CTN-${this.qn.questionId}`
        }
    }
})