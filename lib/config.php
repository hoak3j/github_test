<?php
//개발 오픈일
define('COUNT_DATE', '2021-08-12');

// 사이트명
define('BASIC_NAME', '라이브에듀');

// 도메인
define('BASIC_DOMAIN', 'testweb.pe.kr');


// 도메인 적용 (프로토콜)
if ( (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') | $_SERVER['SERVER_PORT'] == 443)  {
    define('BASIC_URL', 'https://'.BASIC_DOMAIN);
} else {
    define('BASIC_URL', 'http://'.BASIC_DOMAIN);
}





