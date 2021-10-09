$(function() {

    $("#contact_submit").click(function () {
        var company = $.trim($('#company').val());
        var name = $.trim($('#name').val());
        var email = $.trim($('#email').val());
        var tel = $.trim($('#tel').val());
        var content = $.trim($('#content').val());

        if (name == '') {
            swal("이름은 반드시 입력되야 합니다.")
                .then(function () {
                    $('#name').focus().select();
                });
            return false;
        }

        if (email == '') {
            swal("이메일은 반드시 입력되야 합니다.")
                .then(function () {
                    $('#email').focus().select();
                });
            return false;
        }

        if (!validateEmail(email)) {
            swal('이메일 형식이 아닙니다.')
                .then(function () {
                    $('#email').focus().select();
                });
            return false;
        }

        if (tel == '') {
            swal("연락처는 반드시 입력되야 합니다.")
                .then(function () {
                    $('#tel').focus().select();
                });
            return false;
        }
        if (content == '') {
            swal("연락처는 반드시 입력되야 합니다.")
                .then(function () {
                    $('#content').focus().select();
                });
            return false;
        }

        var v = grecaptcha.getResponse();
        if (v.length == 0) {
            swal({
                text: "'로봇이 아닙니다'를 클릭해주세요.",
            }).then(function () {
                $('#captcha').focus().select();
            });
            return false;
        }

        $.ajax({
            type: 'POST',
            url: './act/ajax_contact',
            data: {
                "company": company,
                "name": name,
                "email": email,
                "tel": tel,
                "content": content
            },
            success: function (data) {
                if ($.trim(data) == 'contact_success') {
                    swal("문의사항이 전달되었습니다.")
                        .then(function(){
                            location.replace('/');
                        });
                } else if ($.trim(data) == 'omission') {
                    swal("오류", "필수 항목이 빠졌습니다.", "warning");
                    return false;
                } else if ($.trim(data) == 'contact_fail') {
                    swal("오류", "입력란을 확인해 주세요.", "warning");
                    return false;
                } else {
                    swal(data);
                    return false;
                }
            }
        });    //end ajax

    });

});