$(function(){

    // 아이디 저장 하기
    var saveId = getCookie("save_id");
    if(saveId) {
        $("#save_id").attr("checked", true);
        $("#m_id").val(saveId);
    }

    $('#m_pw').on('keypress', function(e){
        if(e.keyCode == '13'){
            $('#login_ok').click();
        }
    });

    // $('#m_email').on('keypress', function(e){
    //     if(e.keyCode == '13'){
    //         $('#find_id_prc').click();
    //     }
    // });

    // $('#m_id_pw').on('keypress', function(e){
    //     if(e.keyCode == '13'){
    //         $('#find_pw_prc').click();
    //     }
    // });

    //로그인 Ajax ===============================================================
    $("#login_ok").click(function() {
        var RegexId = /^[a-z0-9_-]{8,20}$/; //아이디 유효성 검사 4~20자 사이
        var RegexPw = /^[a-z0-9_!@#$%-]{4,20}$/; //아이디 유효성 검사 4~20자 사이
        var check_id = $.trim($('#m_id').val());
        var check_pw = $.trim($('#m_pw').val());

        if(check_id == ''){
            swal("아이디를 입력하셔야 합니다.")
                .then(function(){
                    $('#m_id').focus().select();
                });
            return false;
        }

        if(check_pw == ''){
            swal("비밀번호를 입력하셔야 합니다.")
                .then(function(){
                    $('#m_pw').focus().select();
                });
            return false;
        }

        if(!RegexId.test(check_id)){
            swal("로그인 오류","입력정보를 다시 확인해주세요.","info")
                .then(function(){
                    $('#m_id').focus().select();
                });
            return false;
        }

        if (!isNaN($.trim(check_id).substring(0,1)))
        {
            swal("아이디는 숫자로 시작할 수 없습니다!")
                .then(function(){
                    $('#m_id').focus().select();
                });
            return false;
        }

        if(!RegexPw.test(check_pw)){
            swal("로그인 오류","입력정보를 다시 확인해주세요.","info")
                .then(function(){
                    $('#m_pw').focus().select();
                });
            return false;
        }

        $.ajax({
            type: 'POST',
            url: './act/ajax_login',
            data: {
                "m_id" : check_id,
                "m_pw" : check_pw,
            },
            success: function(data){
                if($.trim(data) == 'login_success'){

                    if ($('input:checkbox[id="save_id"]').is(":checked")){
                        setCookie("save_id", $("#m_id").val(), 365);
                    } else {
                        deleteCookie("save_id");
                    }

                    location.replace('/');
                }
                else if ($.trim(data) == 'login_fail'){
                    swal("로그인 에러", "아이디와 비밀번호를 확인해 주세요.", "warning");
                    return false;
                }
                else{
                    swal(data);
                    return false;
                }
            }
        });    //end ajax
    });    //end on



    //로그인 모달
    $("#login_proc").click(function() {
        $(".find_id_result_area").hide();
        $(".login_area").show();
    });

    //아이디 찾기 모달
    $("#find_id").click(function() {
        $(".login_area").hide();
        $(".find_id_area").show();
        $(".find_pw_area").hide();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
        return false;
    });

    //아이디 찾기 Ajax ===============================================================
    $("#find_id_prc").click(function() {
        var sEmail = $('#m_email').val();
        if ($.trim(sEmail).length == 0) {
            swal('이메일을 입력해 주세요.');
            return false;
        }
        if (validateEmail(sEmail)) {
            //swal('올바른 이메일입니다');

            $.ajax({
                type: 'POST',
                url: './act/ajax_find_id',
                data: {
                    "m_email" : sEmail,
                },
                success: function(data){
                    var strArry = $.trim(data).split('|');
                    var find_result = strArry[0];
                    var find_id = strArry[1];

                    if( find_result == 'id_success'){
                        //성공했을 때
                        $(".login_area").hide();
                        $(".find_id_area").hide();
                        $(".find_pw_area").hide();
                        $(".find_id_result_area").show();
                        $(".find_pw_result_area").hide();
                        
                        $(".find_id_success").show();
                        $(".find_id_fail").hide();
                        $("#result-id h3").html(find_id);
                    }
                    else if (find_result  == 'id_fail'){
                        //실패했을때
                        $(".login_area").hide();
                        $(".find_id_area").hide();
                        $(".find_pw_area").hide();
                        $("#m_email").focus().select();
                        $(".find_id_result_area").show();
                        $(".find_pw_result_area").hide();
                        $(".find_id_success").hide();
                        $(".find_id_fail").show();
                    }
                    else{
                        swal(data);
                        return false;
                    }
                }
            });    //end ajax
        }
        else {
            swal('이메일 형식이 아닙니다.');
            return false;
        }
    }); //아이디 찾기 Ajax END ==//

    //아이디 찾기 닫기
    $("#find_id_close").click(function() {
        $(".login_area").show();
        $(".find_id_area").hide();
        $(".find_pw_area").hide();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();

        $("#loginModal .close").click()
    });

    //아이디 다시 찾기
    $("#find_id_retry").click(function() {
        $(".login_area").hide();
        $(".find_id_area").show();
        $(".find_pw_area").hide();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
    });



    //비밀번호 찾기 모달
    $("#find_pw").click(function() {
        $(".login_area").hide();
        $(".find_id_area").hide();
        $(".find_pw_area").show();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
        return false;
    });

    //비밀번호 찾기 닫기
    $("#find_pw_close").click(function() {
        $(".login_area").show();
        $(".find_id_area").hide();
        $(".find_pw_area").hide();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
        $("#loginModal .close").click()
    });

    //비밀번호 다시 찾기
    $("#find_pw_retry").click(function() {
        $('#m_email_pw').val('');
        $('#m_id_pw').val('');
        $(".login_area").hide();
        $(".find_id_area").hide();
        $(".find_pw_area").show();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
    });

    //비밀번호 찾기 Ajax ===============================================================
    $("#find_pw_prc").click(function() {
        var RegexId = /^[a-z0-9_-]{8,20}$/; //아이디 유효성 검사 4~20자 사이
        var check_id = $.trim($('#m_id_pw').val());

        var sEmail = $('#m_email_pw').val();
        if ($.trim(sEmail).length == 0) {
            swal('이메일을 입력해 주세요.');
            return false;
        }
        if (!validateEmail(sEmail)) {
            swal('이메일 형식이 아닙니다.');
            return false;
        }

        if(check_id == ''){
            swal("아이디를 입력하셔야 합니다.")
                .then(function(){
                    $('#m_id_pw').focus().select();
                });
            return false;
        }

        if(!RegexId.test(check_id)){
            swal("아이디는 영문소문자, 숫자만 가능하며,\n 8~20자 이내로 입력 가능합니다!")
                .then(function(){
                    $('#m_id_pw').focus().select();
                });
            return false;
        }

        if (!isNaN($.trim(check_id).substring(0,1)))
        {
            swal("아이디는 숫자로 시작할 수 없습니다!")
                .then(function(){
                    $('#m_id_pw').focus().select();
                });
            return false;
        }

        $.ajax({
            type: 'POST',
            url: './act/ajax_find_pw',
            data: {
                "m_email" : sEmail,
                "m_id" : check_id,
            },
            success: function(data){
                var strArry = $.trim(data).split('|');
                var find_result = strArry[0];
                var find_pw = strArry[1];

                if( find_result == 'pw_success'){
                    //성공했을 때
                    $(".login_area").hide();
                    $(".find_id_area").hide();
                    $(".find_pw_area").hide();
                    $(".find_id_result_area").hide();
                    $(".find_pw_result_area").show();
                    $(".find_pw_success").show();
                    $(".find_pw_fail").hide();
                    $("#result-pw").html(find_pw);
                }
                else if (find_result  == 'pw_fail'){
                    //실패했을때
                    $(".login_area").hide();
                    $(".find_id_area").hide();
                    $(".find_pw_area").hide();
                    $(".find_id_result_area").hide();
                    $(".find_pw_result_area").show();
                    $(".find_pw_success").hide();
                    $(".find_pw_fail").show();
                }
                else{
                    swal(data);
                    return false;
                }
            }
        });    //end ajax
    });


    //다시 로그인
    $("#id_login_retry").click(function() {
        $(".login_area").show();
        $(".find_id_area").hide();
        $(".find_pw_area").hide();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
        return false;
    });


    //다시 로그인
    $("#pw_login_retry").click(function() {
        $(".login_area").show();
        $(".find_id_area").hide();
        $(".find_pw_area").hide();
        $(".find_id_result_area").hide();
        $(".find_pw_result_area").hide();
        return false;
    });


    //아이디 메인화면으로
    $("#id_main_proc").click(function() {
        location.replace('/');
    });
    //비밀번호 메인화면으로
    $("#pw_main_proc").click(function() {
        location.replace('/');
    });

    $("#main_proc").click(function() {
        location.replace('/');
    });



});