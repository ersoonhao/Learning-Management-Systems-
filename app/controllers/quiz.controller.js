const { Quiz } = require("../models");

//Get Quiz Package
// exports.getQuizPackage = (req, res) => {
//     const id = req.params.id;

//     Quiz.findByPk(id)
//         .then(data => {
//         res.send(data);
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error retrieving Quiz with id=" + id
//         });
//     });
// };

//==== POST: /CreateQuiz
exports.createQuiz = (req,res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init quiz
    const quiz = Quiz.createQuiz(body.quiz, body.courseId, body.sectionId);
    if(quiz == null){
        res.status(400).send({
            message: "Invalid quiz data format"
        })
        return
    }

    //Write to DB
    Quiz.create(quiz).then(data => {
        res.send(data) //change this to render

    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the quiz"
        })
    })

    /* SAMPLE JSON BODY REQUEST
        {
            "quiz": {
                "quizId": null,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 3,
                "active": false
            }, 
            "courseId": 1,
            "sectionId": null
        }
    */
}

//==== POST: /UpdateQuiz
exports.updateQuiz = (req, res) => {
    let body = req.body;
    if(!body){
        res.status(400).send({
            message: "Request body is empty!"
        })
        return
    }
    //Access control
    //TODO: Get permissions
    

    //Init quiz
    const quiz = Quiz.updateQuiz(body.quiz);
    if(quiz == null){
        res.status(400).send({
            message: "Invalid quiz data format"
        })
        return
    }
    console.log(`Updating: ${quiz}`)
    
    //Update DB
    let id = quiz.quizId;

    Quiz.update(req.body, {
        where: { quizId: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Quiz was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Quiz with id=${id}. Maybe Tutorial was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: "Error updating Quiz with id=" + id
        });
    });

    /* SAMPLE JSON BODY REQUEST
        {
            "quiz": {
                "quizId": 1,
                "type": "G",
                "title": "TEST",
                "instructions": null,
                "durationInMins": 10,
                "passScoreRequirement": 3,
                "active": false
            }
        }
    */
}

// exports.findAll = (req, res) => {
//     Quiz.findAll()
//       .then(data => {
//         res.send(data); //change this to render
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving quiz."
//         });
//       });
//   };
