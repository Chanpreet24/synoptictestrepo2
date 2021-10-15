window.onload = function(){
    linkCategorytoDB()
};

document.querySelector('#log-out-button').addEventListener('click', () => {
    window.location.href = './loginPage.html';
});


var option = "";


function linkCategorytoDB (){
    var categories = [];
     db.allDocs({
        include_docs: true
      }).then(function (result) {
       var dbList = result.rows;
       dbList.forEach(element => {
           if(!categories.includes(element.doc.quizName))
           {
            categories.push(element.doc.quizName)
           }
       })
            for(var i =0; i< categories.length; i++)
            {
                option += '<option value="' + categories[i] + '">' + categories[i] + "</option>"
            }
                document.getElementById('quizFormControl').innerHTML = option
                
         });
    }


    function getdetails(e){
        e.preventDefault();
        var e = document.getElementById("quizFormControl");
        var quizCategoryName = e.value;
    db.allDocs({
            include_docs: true
          }).then(function (result) {
           var quizName = result.rows;
           $("#quizTable").find("tr:not(:first)").remove();
           quizName.forEach(element => {
            if(element.doc.quizName == quizCategoryName)
            var row = "<tr><td>" + element.doc.quizName + "</td><td>" + element.doc.question + "<td>" + element.doc.answer1 + "</td>"+ "<td>" + element.doc.answer2 + "</td>"+ "<td>" + element.doc.answer3 + "</td>"+ "<td>" + element.doc.answer4 + "</td>" + "<td>" + element.doc.correctanswer;
               $("#quizTable").append(row);
           });
          }).catch(function (err) {
            console.log(err);
          });
    }
    
    $('#quizFormControl').on('change', getdetails);

