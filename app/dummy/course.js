const db = require("../../app/models");
const Course = db.Course;

console.log("Re-populating Course with dummy data");

let dummy_course = [
    {title: 'Physics',description:'This course is about Physics', active:true},
    {title: 'Biology',description:'This course is about Biology', active:true},
    {title: 'Chemistry',description: 'This course is about Chemistry', active: false},
    {title: 'Mathematics',description: 'This course is about Mathematics', active: true}
]

for(let course of dummy_course){ Course.create(course) }