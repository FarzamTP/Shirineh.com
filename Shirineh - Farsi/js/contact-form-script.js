$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "لطفا اطلاعات وارده را بررسی و دوباره تلاش کنید");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    var text = "Name: " + name + " with Email: " + email + " posted: " + message;

    $.ajax({
        type: "POST",
        url: "https://www.biblofil.ir/bot/shirineh/send_message/",
        data: {
            'url': "https://api.telegram.org/bot997003144:AAESInEPRqMgMz1DCzuvs71DaSfyqwOjlC4/sendMessage?chat_id=-1001346458402&text=" + text,
        },
        dataType: 'json',
        success: function () {
            formSuccess();
        },
        error: function () {
            formSuccess();
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "پیام شما با موفقیت ثبت شد")
}

function formError(){
    $("#contactForm").removeClass().addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}