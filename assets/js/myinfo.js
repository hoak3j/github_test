$(function() {
    $('.passwd-see i').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye fa-lg")
                .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa fa-eye-slash fa-lg")
                .prev('input').attr('type','password');
        }
    });


    //-- 아이디는 영문숫자만...
    $("input[name=m_id]").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9]/gi, ''));
        }
    });

    //-- 비밀번호는 영문+숫자+특수문자...
    $("input[name=m_pw]").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9!@#$%]/gi, ''));
        }
    });

    // 프로필 수정 Ajax ===============================================================
    $("#myinfo_update").click(function () {
        var RegexId = /^[a-z0-9_-]{8,20}$/; // 유효성 검사 8~20자 사이
        var RegexPw = /^[a-z0-9_!@#$%-]{4,20}$/; //유효성 검사 4~20자 사이
        var RegexTel = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰
        var check_id = $.trim($('#m_id').val());
        var check_pw = $.trim($('#m_pw').val());
        var m_name = $.trim($('#m_name').val());
        var m_nick = $.trim($('#m_nick').val());
        var m_group = $.trim($('#m_group').val());
        var m_position = $.trim($('#m_position').val());
        var m_email = $.trim($('#m_email').val());
        var m_tel = $.trim($('#m_tel').val());


        if (check_id == '') {
            swal("아이디는 반드시 입력되야 합니다.")
                .then(function () {
                    $('#m_id').focus().select();
                });
            return false;
        }
        
        if (check_pw == '') {
            swal("비밀번호는 반드시 입력되야 합니다.")
                .then(function () {
                    $('#m_pw').focus().select();
                });
            return false;
        }

        if (m_name == '') {
            swal("이름은 반드시 입력되야 합니다.")
                .then(function () {
                    $('#m_name').focus().select();
                });
            return false;
        }

        if (m_email == '') {
            swal("이메일은 반드시 입력되야 합니다.")
                .then(function () {
                    $('#m_email').focus().select();
                });
            return false;
        }

        if (m_tel == '') {
            swal("연락처는 반드시 입력되야 합니다.")
                .then(function () {
                    $('#m_tel').focus().select();
                });
            return false;
        }

        if (m_group == '') {
            swal("소속은 반드시 입력되야 합니다.")
                .then(function () {
                    $('#m_group').focus().select();
                });
            return false;
        }

        $.ajax({
            type: 'POST',
            url: './act/ajax_myinfo',
            data: {
                "m_id": check_id,
                "m_pw": check_pw,
                "m_name": m_name,
                "m_nick": m_nick,
                "m_group": m_group,
                "m_position": m_position,
                "m_email": m_email,
                "m_tel": m_tel
            },
            success: function (data) {
                if ($.trim(data) == 'myinfo_success') {
                    swal("프로필 수정이 완료 되었습니다.")
                        .then(function(){
                            location.replace('myinfo');
                        });
                } else if ($.trim(data) == 'omission') {
                    swal("프로필 수정 오류", "필수 항목이 빠졌습니다.", "warning");
                    return false;
                } else if ($.trim(data) == 'myinfo_fail') {
                    swal("프로필 수정 오류", "입력란을 확인해 주세요.", "warning");
                    return false;
                } else {
                    swal(data);
                    return false;
                }
            }
        });    //end ajax
    });
});