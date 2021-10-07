const MENU_SECTIONS_MANAGE_GENERAL = [
    { 
        id: "T1",
        title: "Tools",
        subtitle: "Management Tools",
        links: [
            { title: "Course", link: "/manage/courses", completed: false }
        ]
    }
]
function generateMenuSections_Course(courseId){
    return [
        { 
            id: "C1",
            title: "Course",
            subtitle: "Manage Course",
            links: [
                { title: "Course Settings", link: `/manage/course?courseId=${courseId}`, completed: false },
                { title: "Classes", link: `/manage/classes?courseId=${courseId}`, completed: false },
                { title: "Graded Quiz", link: `/manage/gquiz?courseId=${courseId}`, completed: false }
            ]
        }
    ]
}
function generateMenuSections_Class(classId){
    return [
        { 
            id: "C1",
            title: "Class",
            subtitle: "Manage Class",
            links: [
                { title: "Class Settings", link: `/manage/class?classId=${classId}`, completed: false },
                { title: "Learners", link: `/manage/learners?classId=${classId}`, completed: false },
                { title: "Sections", link: `/manage/sections?classId=${classId}`, completed: false }
            ]
        }
    ]
}
function generateMenuSections_Section(sectionId){
    return [
        { 
            id: "C1",
            title: "Section",
            subtitle: "Manage Section",
            links: [
                { title: "Section Settings", link: `/manage/section?sectionId=${sectionId}`, completed: false },
                { title: "Learning Materials", link: `/manage/materials?sectionId=${sectionId}`, completed: false },
                { title: "Ungraded Quiz", link: `/manage/ugquiz?sectionId=${sectionId}`, completed: false }
            ]
        }
    ]
}