# 📕 게시판 CRUD API

<br/>
<br/>

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139003985-0bed47eb-fed8-4d78-acaf-75387aca7e84.png"></p>

**Unit Test는 구현하지 못했습니다. 😥**



<br/>
<br/>

서버 실행 방법  
-----------------  

1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.  

```
$ git clone https://github.com/WonDongGyun/board-project.git
```

<br/>
<br/>

2. 패키지를 설치합니다.

```
$ npm install
```

<br/>
<br/>

3. 서버를 실행해 줍니다.

```
$ npm run start
```

<br/>
<br/>

3. 정해진 API에 접근하여 서비스를 이용합니다.

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139004307-5f733db0-1fbf-4dff-8c70-f933c70ee5bd.png"></p>


<br/>
<br/>



ERD
-----------------  

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139003793-d41b9583-b3f1-4d64-9255-e62cede04a40.png"></p>



<br/>
<br/>



API 명세
-----------------  
<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139003175-d4124d61-da3b-49e8-bf25-078f6f2249b5.png"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139003210-283aaf16-2472-4a69-9569-14dbe7eff520.png"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139003249-ea52b9d8-4eba-428c-b2fd-ded2672d06b9.png"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/52685665/139003313-d5e5412f-6108-499a-93b2-4958afefaa84.png"></p>



<br/>
<br/>


구현한 방법 및 이유
-----------------  

**1. Node Js - Nest Js 및 TypeORM를 사용하였습니다.**

다른 Node JS 백엔드 프레임워크보다 컨트롤러, 모듈, 프로바이저 등 각 파일의 역할이 분명하고 구조화된 작업이 수월합니다. 또한 기본적으로 TypeScript를 지원해주기 때문에 Typescript를 따로 설치하거나 설정하지 않아도 됩니다. 그래서 Nest JS를 사용하여 프로젝트를 구현하였습니다. ORM은 Nest Js에서 지원해주는 TypeORM을 사용하였습니다.
 
 
<br/>
<br/>


**2. 공통 응답 반환 클래스를 만들었습니다.**

어떠한 응답을 반환할 때는 모두 같은 형식의 응답을 반환하도록 구현하였습니다. 이렇게 구현함으로서 언제나 통일성 있는 응답을 전달할 수 있으며 프론트엔드와 연계한 작업을 할 때 응답 데이터 혹은 에러를 처리하기 쉬워집니다. 반환 할 때 적절한 http status code와 message를 전달함으로서 어떤 API 응답인지 명확하게 하였습니다.

<br/>
<br/>


**3. 데이터베이스**

[사용자 테이블]  
userId : 사용자 아이디가 서로 겹치지 않도록 PK로 설정하였습니다.  
password: 평문으로 저장되면 보안 이슈가 발생할 수 있기 때문에, bcrypt 암호화가 적용되어 저장됩니다.

[게시판 테이블]  
boardId : 자동으로 1씩 증가되게 하였습니다.  
title 및 contents : 게시판의 제목이나 내용은 아무것도 입력하지 않으면 저장되지 않게 하였습니다.  

<br/>
<br/>

**4. 각 테이블의 관계**

게시판 테이블은 사용자 테이블과 1 : N optional 의 관계를 가진다고 생각하였습니다. 사용자 1명이 게시판 글을 여러개 작성할 수도 있지만, 작성하지 않을 수도 있기 때문입니다. ManyToOne에 Lazy 옵션을 설정하여서, 게시판 글을 읽거나 목록을 가져올 때는 해당 게시글을 올린 사용자의 아이디와 사용자 이름을 가져오도록 하였습니다.

<br/>
<br/>


