function deleteQuestion(e){
    e.preventDefault();
    var questionToBeDeleted = $('#deleteQuestion').val();
    db.get(questionToBeDeleted).then(function(doc){
        console.log(JSON.stringify(doc));
        return db.remove(doc);
    });
    {
       return window.location.href = './editQuiz.html';
    };
}

function deleteQuiz(e){
  e.preventDefault();
  var quizToBeDeleted = $('#deleteQuiz').val();
  db.get(quizToBeDeleted).then(function(doc){
      console.log(JSON.stringify(doc));
      return db.remove(doc);
  });
  {
     return window.location.href = './editQuiz.html';
  };
}

function addQuestion(e){
  e.preventDefault();
  var doc = {
    _id: $('#quizQuestion').val(),
    quizName: $('#add-quiz-name').val(),
    question: $('#quizQuestion').val(),
    answer1:  $('#answer1').val(),
    answer2:  $('#answer2').val(),
    answer3:  $('#answer3').val(),
    answer4:  $('#answer4').val(),
    correctanswer: $('#correctAnswer').val()
  };
  db.put(doc,function(err,res){
    if(err){
        switch(err.message){
            case 'Document update conflict':
                alert("Question already exists");
                window.location.href = './editQuiz.html';
                break;
            default:
                window.location.href = './editQuiz.html';
                break;
        }
    }else{
        alert(JSON.stringify(res));
    }
  });

  window.location.href = './editQuiz.html';
}


$('#addQuizButton').on('click', addQuestion);

$('#deleteQuestionBtn').on('click', deleteQuestion);

$('#deleteQuizBtn').on('click', deleteQuiz);






$(document).ready(function(){
loadQuestionsIntoTable();
});


function loadQuestionsIntoTable(){
db.allDocs({
  include_docs: true
}).then(function (result) {
 var questions = result.rows;
 questions.forEach(element => {
  if(element.doc.correctanswer == 20)
     var row = "<tr><td>" + element.id + "</td><td>" + element.doc.correctanswer + "</td><td>" + "</td><td>" + "<button>Edit Question</button>" + "</td><td>" + "<button>Delete Question</button>" + "</td></tr>";
     $("#quizTable").append(row);
 });
}).catch(function (err) {
  console.log(err);
});
}

document.querySelector('#editQuiz-back-button').addEventListener('click', () => {
  window.location.href = './administratorGame.html';
});



