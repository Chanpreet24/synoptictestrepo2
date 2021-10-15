function hashPassword(password) {
  var hash = sha256.create();
  hash.update(password);
  return hash.hex();
}

function logInToQuiz(e){
  e.preventDefault();
    var email = $('#formLogin-email').val();
    var password = hashPassword($('#formLogin-password').val());
    db2.find({
        selector: {email, password}                        
         }).then(function(res){
          if(res.docs[0] == null || undefined && (password == null || undefined || email == null || undefined)){
            alert('email or password is incorrect');
            window.location.href = './logInPage.html';
          }
        else{   
            var parseData = JSON.parse(JSON.stringify(res.docs));
            var role = parseData[0].role;
            console.log(role);   
            if(role == 'admin'){
              window.location.href = "./administratorGame.html";
            }else if(role == 'advanced') {
              window.location.href = "./advancedUser.html";
            }else{
              window.location.href = "./standardUser.html";           
            }
         }
     });
   }

    $('#logInButton').on('click',logInToQuiz);



//Below is the logic for a Customer signing up if required//

// function checkEmail() {
//     try{
//         var p = $('#form-email').val();
//         var newemailregexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//         // var regularexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         if (newemailregexp.test(p)){
//             alert("Valid email");
//             return true;
//         }
//         else {
//             alert("Invalid email address");  
//             return false;
//         }
//     } catch (e) {
//        alert(e.message);
//     }                          
// }

// function isPasswordValid() {
//     var pass = $('#form-password').val();
//     if(pass.length == 0 || pass.length < 4 || pass.length > 15) {
//         alert ("Password is too short");
//         return false;
//     } else{
//         return true;
//     }
// }

// function isPlayerOfAge() {
//     var age = $('#ageOfPlayer').val();
//     if(age < 16) {
//         alert ("Player is not eligible to play");  
//         return false;
//     }else {
//         return true;
//     }
// }

// function progressToQuizPage() {
//     var email = checkEmail();
//     var password = isPasswordValid();
//     var player = isPlayerOfAge();
//     var validationError = document.getElementsByClassName('sign-up-form');
 
//      if (email == true && player == true && password == true) {
//         var doc = {
//             _id: $('#form-email').val(),
//             name: $('#form-name').val(),
//             email: $('#form-email').val(),
//             password: $('#form-password').val()
//            // userLevel: userLevel()
//         };

//         db2.put(doc,function(err,res){
//             if(err){
//                 switch(err.message){
//                     case 'Document update conflict':
//                         alert("User already exists, please log in below");
//                         window.location.href = './index.html';
//                         break;
//                     default:
//                         window.location.href = './index.html';
//                         break;
//                 }
//             }else{
//                 alert(JSON.stringify(res));
//             }
//         });

//         window.location.href = './game.html';
//     } else
//     alert ("There is a validation error");
    

// }


// document.querySelector('#UserLevelButton').addEventListener('click', () => {
//     window.location.href = './UserLevel.html';
// });

// const question = document.querySelector('question');
