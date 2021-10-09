<?php
/*
유프리즘의 API를 활용한 사이트입니다.
*/


////유프리즘 비밀키
$root_name = "Livedu (회사)";
$client_key = "3E4C6A8D-B0BC-43F2-A1EC-9EC274344815";
$client_secret = "3ED89324-7414-4834-BA6C-9EA696000536";
$userId = "hsjeon@hyict.kr";
$userId = "nhkim@hyict.kr";

////유프리즘 비밀키 kobic.dev@gmail.com
//$root_name = "전홍식 (개인)";
//$client_key = "DDF40DEA-8A2F-4629-8E32-9D0EE37205B3";
//$client_secret = "41F8F090-B41D-4A2E-A640-925C736E7E6B";
//$userId = "kobic.dev@gmail.com";


// 토큰 가져오기
function get_AccessToken()
{
    global $client_key, $client_secret;

    //토큰 받기 URL
    $token_url = "https://uprism.io:30443/oauth/token";

    $authorization = base64_encode("$client_key:$client_secret");
    $header = array("Authorization: Basic {$authorization}", "Content-Type: application/x-www-form-urlencoded");
    $content = "grant_type=client_credentials";

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $token_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response === false) {
        echo "Failed";
        echo curl_error($curl);
        echo "Failed";
    } elseif (json_decode($response)->error) {
        echo "Error:<br />";
        echo $response;
    }

    return json_decode($response)->access_token;
}


//기능 값 (기본)
function getResource($access_token)
{
    global $userId;
    $uprism_api_url = "https://uprism.io:30443/v1/users";
    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}


/*=== Conference :: 회의 API=====================================================*/

// Get Conference List :: 회의 목록 가져오기 API
function get_ConferenceList($access_token) {
    global $userId;
    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/conference";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

//  Create Conference :: 회의 생성 API (test용)
function create_Conference($access_token) {
    global $userId;
    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/conference";

    $timeStamp1 = strtotime("+1 minutes");
    $startDate = date("YmdHis", $timeStamp1);

    $timeStamp2 = strtotime("+11 minutes");
    $endDate = date("YmdHis", $timeStamp2);

    $start_date = $startDate;
    $end_date = $endDate;
    $agenda = "create Conference";
    $title = "test";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'start_date' => $start_date,
        'end_date' => $end_date,
        'agenda' => $agenda,
        'title' => $title
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content

    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Join Conference :: 특정 사용자 회의 입장 URL
function join_Conference($access_token) {
    global $userId, $roomId;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/conference/{$roomId}";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Update Conference :: 특정 사용자 회의 입장 URL
function update_Conference($access_token) {

    global $userId, $roomId;
    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/conference{$roomId}";

    $timeStamp1 = strtotime("+1 minutes");
    $startDate = date("YmdHis", $timeStamp1);

    $timeStamp2 = strtotime("+11 minutes");
    $endDate = date("YmdHis", $timeStamp2);

    $start_date = $startDate;
    $end_date = $endDate;
    $agenda = "Update Conference";
    $title = "test ";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'start_date' => $start_date,
        'end_date' => $end_date,
        'agenda' => $agenda,
        'title' => $title
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "PATCH",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content

    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Delete Conference :: 특정 사용자 회의 입장 URL
function delete_Conference($access_token) {
    global $userId, $roomId;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/conference/{$roomId}";
    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

/*=== Sub User :: 사용자 API =====================================================*/

// Get Sub User List :: 사용자 리스트 조회 API
function get_subUserList($access_token) {
    $uprism_api_url = "https://uprism.io:30443/v1/users";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Create Sub User :: 사용자 등록 API
function create_subUser($access_token) {

    global $user_id, $user_name, $email;

    $uprism_api_url = "https://uprism.io:30443/v1/users";
    $header = array("Authorization: Bearer {$access_token}");

    $content = array(
        'user_id' => $user_id,
        'user_name' => $user_name,
        'email' => $email
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $content
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Update Sub User :: 사용자 등록 API
function update_subUser($access_token) {

    global $user_id, $user_name, $email;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$user_id}";
    $header = array("Authorization: Bearer {$access_token}");

    $content = array(
        'user_id' => $user_id,
        'user_name' => $user_name,
        'email' => $email,
        'userLevel' => 10,
        'DeptId' => "classroom3",
        'DeptName' => "수업3팀"


    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "PATCH",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $content
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Delete Sub User :: 사용자 등록 API
function delete_subUser($access_token){
    global $user_id;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$user_id}";

    $header = array("Authorization: Bearer {$access_token}");


    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}


/*=== Address :: 주소록 API =====================================================*/
// Get Address List :: 주소록 조회 API
function get_AddressList($access_token) {
    global $userId;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}


//  Create Address :: 주소록 등록 API
function create_Address($access_token)
{
    global $userId, $address_user_name, $email, $class_name, $post, $group_name;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'address_user_name' => $address_user_name,
        'email' => $email,
        'class_name' => $class_name,
        'post' => $post,
        'group_name' => $group_name
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content

    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

//  Update Address :: 주소록 수정 API
function update_Address($access_token)
{
    global $userId, $address_user_name, $email, $class_name, $post, $addressIdx;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address/{$addressIdx}";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'address_user_name' => $address_user_name,
        'email' => $email,
        'class_name' => $class_name,
        'post' => $post
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "PATCH",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content

    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}


//  Delete Address :: 주소록 삭제 API
function delete_Address($access_token)
{
    global $userId, $addressIdx;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address/{$addressIdx}";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Get Address Group List :: 주소록 그룹 조회 API
function get_AddressGroupList($access_token) {

    global $userId;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address/group";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

//  Create Address Group :: 주소록 그룹 등록 API
function create_AddressGroup($access_token)
{
    global $userId, $group_name;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address/group";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'group_name' => $group_name
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content

    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

//  Update Address Group :: 주소록 그룹 등록 API
function update_AddressGroup($access_token)
{
    global $userId, $groupName, $group_name;

    $groupName = urlencode($groupName); //한글을 인코딩해준다

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address/group/{$groupName}";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'group_name' => $group_name
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "PATCH",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

//  Delete Address Group :: 주소록 그룹 삭제 API
function delete_AddressGroup($access_token)
{
    global $userId, $groupName;

    $groupName = urlencode($groupName); //한글을 인코딩해준다

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/address/group/{$groupName}";

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

/*=== Send Invite Mail :: 회의 초대 메일 발송 API  =====================================================*/

// Send Invite Mail :: 회의 초대 메일 발송 API
function send_InviteMail($access_token)
{
    global $userId, $roomId, $mail_list;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/invite/conference/{$roomId}";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'mail_list' => $mail_list,
        'local' => "ko"
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

/*=== Get Conference Logs :: 전체 회의 기록 조회 API  =====================================================*/
// Get Conference Logs :: 주소록 그룹 조회 API
function get_ConferenceLog($access_token) {

    global $from, $to;

    $uprism_api_url = "https://uprism.io:30443/v1/conference/logs?from=". $from ."&to=". $to;

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

/*=== Statistics :: 통계 조회 API  =====================================================*/
// Get Conference Statistics :: 회의 사용 통계 API
function get_ConferenceStatistics($access_token) {

    global $from, $to;

    $uprism_api_url = "https://uprism.io:30443/v1/conference/statistics?from=". $from ."&to=". $to;

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

// Get Conference Statistics :: 회의 사용 통계 API
function get_UserConferenceStatistics($access_token) {

    global $userId, $from, $to;


    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/conference/statistics?from=". $from ."&to=". $to;
    echo $uprism_api_url;

    $header = array("Authorization: Bearer {$access_token}");

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

/*=== Post Organization :: 전체 조직도 연동 API =========================================*/
function post_Organization($access_token)
{
    global $userId, $new_array;

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/org";


    //$header = array( "content-type: application/json", "accept-encoding: gzip" );
    $header = array("Authorization: Bearer {$access_token}");

    $content = array(
        'JSONArray' => $new_array,
    );

    $content = json_encode($new_array, JSON_UNESCAPED_UNICODE);

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return json_decode($response, true);
}

/*=== Create Dept :: 소속 등록 API  =====================================================*/
//  Create Dept :: 소속 등록 API
function create_dept($access_token, $dept_id, $dept_name)
{
    global $userId;

//    $dept_id = "classroom4";
//    $dept_name = "수업팀4";

    $uprism_api_url = "https://uprism.io:30443/v1/users/{$userId}/org/dept";

    $header = array("Authorization: Bearer {$access_token}");
    $content = array(
        'deptId' => $dept_id,
        'deptName' => $dept_name
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $uprism_api_url,
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content

    ));
    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}



// 변수 또는 배열의 이름과 값을 얻어냄. print_r() 함수의 변형
function print_r2($var)
{
    ob_start();
    print_r($var);
    $str = ob_get_contents();
    ob_end_clean();
    $str = str_replace(" ", "&nbsp;", $str);
    echo nl2br("<span style='font-family:Tahoma, 굴림; font-size:9pt;'>$str</span>");
}

