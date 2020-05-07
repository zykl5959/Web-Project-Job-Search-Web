
$(document).ready(function() {
  
  $("form #email").after("<span style='display:none'  class='info'>Please enter your email</span>");
  $("form #password").after("<span style='display:none'class='info'>At least 6 numbers or characters</span>");
  $("form #password2").after("<span style='display:none'class='info'>At least 6 numbers or characters</span>");
  $("form #FirstName").after("<span style='display:none' class='info'>Please fill this part</span>");
  $("form #LastName").after("<span style='display:none'class='info'>Please fill this part</span>");

$("form #loginemail").after("<span style='display:none' class='info'>Please enter your email</span>");
$("form #loginpassword").after("<span style='display:none'  class='info'>Please enter your email</span>");




$("#loginpassword").focusin(function(){
        // $(this).next().addClass("info");
        $(this).next().css("display","block");
  });

    $( "#loginpassword" ).keyup(function() {

       var pw=$(this);
       pw.next().css("display","block");
       if(pw.val().length==0){
        pw.next().text("At least 6 numbers or characters");
         pw.next().removeClass("ok");
         pw.next().removeClass("error");
         pw.next().addClass("info");
       }
       else if(pw.val().length>=6){
           pw.next().text("OK")
           pw.next().removeClass("error");
           pw.next().removeClass("info");
           pw.next().addClass("ok");
        }
       else{
         pw.next().text("At least 6 numbers or characters");
         pw.next().removeClass("ok");
         pw.next().removeClass("info");
         pw.next().addClass("error");
       }
  });
    

  $( "#loginemail" ).focusin(function() {
        $(this).next().css("display","block");
  });

  $("#loginemail").keyup(function(event) {

      var Email=$(this);
      var sEmail=$(this).val();
      console.log(sEmail);
      if($.trim(sEmail).length == 0){
        $(this).next().text("Please enter your email")
        $(this).next().removeClass("ok");
         $(this).next().removeClass("error");
         $(this).next().addClass("info");

      }
      else if(!validateEmail(sEmail)){
         $(this).next().removeClass("ok");
         $(this).next().removeClass("info");
         $(this).next().addClass("error");
         $(this).next().text("The Email is not Valid!")
      }
      else{
              Email.next().text("OK")
              Email.next().addClass("ok");
              Email.next().removeClass("error");
              Email.next().removeClass("info");
      }
  })

  $("#password,#password2").focusin(function(){
        // $(this).next().addClass("info");
        $(this).next().css("display","block");
  });

    $( "#password,#password2" ).keyup(function() {

       var pw=$(this);
       pw.next().css("display","block");
       if(pw.val().length==0){
        pw.next().text("At least 6 numbers or characters");
         pw.next().removeClass("ok");
         pw.next().removeClass("error");
         pw.next().addClass("info");
       }
       else if(pw.val().length>=6){
           pw.next().text("OK")
           pw.next().removeClass("error");
           pw.next().removeClass("info");
           pw.next().addClass("ok");
        }
       else{
         pw.next().text("At least 6 numbers or characters");
         pw.next().removeClass("ok");
         pw.next().removeClass("info");
         pw.next().addClass("error");
       }
  });

$( "#password2" ).keyup(function() {
         var p1 =$("#password").val();
         var p2 =$("#password2").val();
         if(p1!=p2){
                $(this).next().text("Password Not Match");
                $(this).next().removeClass("ok");
                $(this).next().removeClass("info");
                $(this).next().addClass("error");
         }

})

  // $( "#password,#password2" ).focusin(function() {

 //       var pw=$(this);
 //       pw.next().addClass("info");
 //       pw.next().css("display","block");
 //       if(pw.val().length==0){
 //         pw.next().removeClass("ok");
 //         pw.next().removeClass("error");
 //       }
 //       else if(pw.val().length>=6){
 //         pw.next().text("OK")
 //         pw.next().removeClass("error");
 //         pw.next().addClass("ok");
 //       }
  //    else{
  //      pw.next().text("Error");
  //      pw.next().removeClass("ok");
  //      pw.next().addClass("error");
  //    }
  // });

  // $( "#password,#password2" ).focusout(function() {

 //       var pw=$(this);
 //       pw.next().addClass("info");
 //       pw.next().css("display","block");
 //       if(pw.val().length==0){
 //         pw.next().removeClass("ok");
 //         pw.next().removeClass("error");
 //         pw.next().css("display","none");
 //       }
 //       else if(pw.val().length>=6){
 //         pw.next().text("OK")
 //         pw.next().removeClass("error");
 //         pw.next().addClass("ok");
 //       }
  //    else{
  //      pw.next().text("Error");
  //      pw.next().removeClass("ok");
  //      pw.next().addClass("error");
  //    }
  // });


  $("#FirstName").focusin(function(){
        // $(this).next().addClass("info");
        $(this).next().css("display","block");
  });

  $( "#FirstName" ).keyup(function() {

        var str=$(this).val();
        // $(this).next().addClass("info");
        $(this).next().css("display","block");


        if(str.length==0){
          $(this).next().removeClass("ok");
          $(this).next().removeClass("error");
          $(this).next().addClass("info");
          $(this).next().text("Please fill this part")
          return;
        }
        $(this).next().text("OK")
        $(this).next().removeClass("error");
        $(this).next().removeClass("info");
        $(this).next().addClass("ok"); 
  });

 

  $("#LastName").focusin(function(){
        $(this).next().css("display","block");
  });

  $( "#LastName" ).keyup(function() {

        var str=$(this).val();
        $(this).next().addClass("info");
        $(this).next().css("display","block");


        if(str.length==0){
          $(this).next().removeClass("ok");
          $(this).next().removeClass("error");
          $(this).next().addClass("info");
          $(this).next().text("Please fill this part")
          return;
        }
        $(this).next().text("OK")
        $(this).next().removeClass("error");
        $(this).next().removeClass("info");
        $(this).next().addClass("ok"); 
  });

  // $( "#email" ).focusout(function() {

  //       $(this).next().css("display","none");
  // });
    $( "#email" ).focusin(function() {
        $(this).next().css("display","block");
  });

  $("#email").keyup(function(event) {

      var Email=$(this);
      var sEmail=$(this).val();
      console.log(sEmail);
      if($.trim(sEmail).length == 0){
        $(this).next().text("Please enter your email")
        $(this).next().removeClass("ok");
         $(this).next().removeClass("error");
         $(this).next().addClass("info");

      }
      else if(!validateEmail(sEmail)){
         $(this).next().removeClass("ok");
         $(this).next().removeClass("info");
         $(this).next().addClass("error");
         $(this).next().text("The Email is not Valid!")
      }
      else{
        $.ajax({
          url: "http://localhost:3000/ajaxcall",
          method:"POST",
          data: {
              'email' : $(this).val()
          },
         success: function(data) {
            if(data=="true"){
              console.log(data);
              Email.next().text("OK")
              Email.next().addClass("ok");
              Email.next().removeClass("error");
              Email.next().removeClass("info");
            }else{
              console.log(data);
              Email.next().text("Email has been used!")
              Email.next().removeClass("ok");
              Email.next().removeClass("info");
              Email.next().addClass("error");
            }

         },
         error: function() { alert("error loading file"); }
         });
      }
  })


  function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

});




