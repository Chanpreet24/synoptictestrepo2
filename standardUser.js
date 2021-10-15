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
                document.getElementById('quizFormControlForStandardUsers').innerHTML = option
         });
    }


    function getdetailsForStandardUser(e){
        e.preventDefault();
        var e = document.getElementById("quizFormControlForStandardUsers");
        var quizCategoryName = e.value;
    db.allDocs({
            include_docs: true
          }).then(function (result) {
           var quizName = result.rows;
           $("#quizTable").find("tr:not(:first)").remove(); 
           quizName.forEach(element => {
            if(element.doc.quizName == quizCategoryName)
               var row = "<tr><td>" + element.doc.quizName + "</td><td>" + element.doc.question + "</td>" + "<td>" + element.doc.answer1 + "</td>"+ "<td>" + element.doc.answer2 + "</td>"+ "<td>" + element.doc.answer3 + "</td>"+ "<td>" + element.doc.answer4 + "</td>";
               $("#quizTable").append(row);
           });
          }).catch(function (err) {
            console.log(err);
          });
    }
    
    $('#quizFormControlForStandardUsers').on('change', getdetailsForStandardUser);







//only the questions need to be displayed in a table