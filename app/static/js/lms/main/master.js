function getUserSession(){
    return {
        accountId: "U100001",
        username: "Robin",
        name: "Robin Chong",
        isAdmin: true,
        isTrainer: true,
        dateCreated: new Date(),
        dateUpdated: new Date()
    }
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
function initMenu(sections, focus_index){
    return {
        sections: sections,
        focus_index: focus_index
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
                <div :id="'section_' + section.id" :class="(i == menu.focus_index)?'accordion-collapse collapse show':'accordion-collapse collapse'" data-bs-parent="#side-menu">
                    <div class="list-group pt-2 pb-2">
                        <a v-for="link in section.links" :href="link.link" class="list-group-item list-group-item-action side-menu-item">
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
                <div class="col-md-9">
                    <slot></slot>
                </div>
            </div>
        </div>
    `
});