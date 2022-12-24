# Travelisty

## Intro
한국관광공사의 국내 여행 관련 Open API를 활용하여 국내의 여러 관광지들에 대한 정보를 확인할 수 있는 웹사이트이다.
숙소에서 부터 레포츠까지 다양한 범위의 관광지에 대해 알려주고 있으며, 뿐만 아니라 여행지에 있는 길과 코스들에 대한
정보도 알려주고 있다. 여행을 떠나고 싶어하는 사람들이 많아지고 있는 지금 어디로 가야할 지 그리고 어떻게 정보를 얻어야
할 지에 대한 고민을 줄여주기 위해 이 웹사이트를 만들어보았다.

## 실행 방법
[https://travelisty.web.app](https://travelisty.web.app)

## :wrench: Skills
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" /> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white" /> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white" />
<img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white" /> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
<br />
<br />
<br />
## :computer: Contents
### 구성

- 이 프로젝트는 React의 Functional Component기반으로 만들어졌다.
- CSS 스타일링은 CSS Framework인 Tailwind CSS를 사용하였다.
- 전역 상태 관리는 Redux-Toolkit을 활용하였고 Data Fetching은 React Query 라이브러리를 사용하였다.
- 전반적인 데이터 CRUD 및 Authentication은 Firebase를 활용하였다.
  - Cloud Firestore를 활용해 데이터 CRUD를, Firebase Authentication을 활용해 인증을 구현하였다.
- 한국관광공사의 Open API를 이용하였으며 카카오의 지도 API 및 카카오톡/카카오스토리 공유 API도 사용하였다.
- Vite를 사용하여 웹사이트를 만들었다.
<br />
<br />

![auth-tour](https://user-images.githubusercontent.com/99642719/209422986-13ca1755-eb8b-41dc-9b08-35aa88b8e5f2.gif)
- React Hook Form 라이브러리의 useForm 훅을 사용하여 로그인 및 회원가입 form의 유효성 검사 및 제출을 다루었다.
  - 특정 패턴 및 길이에 맞지 않을 경우 해당 input 아래 에러 메세지가 나타나도록 하였다.
- Firebase Authentication을 활용하여 로그인 및 회원가입을 구현하였다.
- 로그인 및 회원가입 시 받아오는 유저 값은 Redux-Toolkit을 활용하여 데이터를 전역적으로 다루도록 하였다.
  - 일반적인 방법으로 데이터를 다룰 시에 오류가 났다. 이를 해결하기 위해서 configureStore의 middleware 옵션을 활용하였다. middleware 옵션에서
    기본 미들웨어를 적용하기위해 getDefaultMiddleware()을 사용하며 그 중 serializableCheck를 false로 만들어 줬다.
  - serializableCheck는 직렬화 할 수 없는 Promise 등의 객체를 받았을 때 console에 error를 나타내는 미들웨어이다. 
<br />
<br />

![home-tour](https://user-images.githubusercontent.com/99642719/209422995-b681a5c4-0d6f-44cc-bc84-c841a9f3a714.gif)
- 메인 페이지는 "야놀자"를 참고하여 구성하였다.
- 최대 사이즈를 768px로 맞추어 가운데 정렬을 하였고 네비게이션 header 및 footer는 브라우저 전체 크기 속에서 필요 구성 요소를
  최대 사이즈에서 가운데 정렬을 하였다.
<br />
<br />

![chart-tour](https://user-images.githubusercontent.com/99642719/209422992-267b145a-9487-4e97-8da8-4d1df5633d62.gif)
- Chart.js 와 react-chartjs-2 라이브러리를 활용하여 광역지자체의 현지인과 외지인의 월별 방문객 수를 나타내었다.
<br />
<br />

![darkmode-tour](https://user-images.githubusercontent.com/99642719/209422993-f9cd8b9a-63d8-4e09-a411-60fcca985ab0.gif)
- Tailwind CSS를 이용하여 다크모드 시 CSS 스타일링을 해주었다.
- 다크모드 상태를 유지 및 변화 시키기 위한 방법으로 localStorage에 값을 저장하여 구현하였다.
<br />
<br />

![detail-tour](https://user-images.githubusercontent.com/99642719/209422994-bf364303-d0c2-46ae-b41a-b2654360058d.gif)
- 여행 장소의 디테일한 내용이 담긴 Detail 페이지는 추가적인 정보, 지도 API를 통한 위치, 리뷰를 남길 수 있는 리뷰란으로 구성되어있다.
  - 카카오 지도 API와 한국관광공사의 Open API를 활용하여 장소에 대한 위치를 설정해 주었다.
- Cloud Firestore의 기능을 활용하여 리뷰를 작성하고 읽고 삭제할 수 있다.
  - 로그인 시에만 작성할 수 있으며 작성된 리뷰는 나의 리뷰 페이지에 저장된다.
<br />
<br />

![campinginput-tour](https://user-images.githubusercontent.com/99642719/209422988-12414036-eee0-4f43-9505-cfd1a61dfcae.gif)
![infinitescroll-tour](https://user-images.githubusercontent.com/99642719/209426414-3404beed-bd6b-4491-a117-77e334d6c1c0.gif)

- 파라미터 값을 받아들여 React Query로 데이터를 받아와 화면에 보여주었다.
- 받아온 데이터 길이보다 더 많은 데이터가 있을 경우 React Query의 useInfiniteQuery 함수를 활용하여 무한스크롤 방식으로
  데이터를 더 불러 오도록 하였다.
<br />
<br />

![campingmap-tour](https://user-images.githubusercontent.com/99642719/209422991-8adf392c-2495-40a7-8a70-2033d39e75c5.gif)
- 카카오 지도 API와 한국관광고사 Open API를 활용하여 지도 상의 캠핑지를 마커로 표시하고 링크가 달린 내용을 나타내도록 하였다.
  - debounce를 활용하여 지도를 움직일 때마다 렌더링 되고 데이터를 불러오는 현상을 컨트롤하였다.
  - 마커로 표시된 캠핑지의 내용의 링크를 통해 캠핑지의 Detail 페이지로 이동할 수 있다.
<br />
<br />

![imageslider-tour](https://user-images.githubusercontent.com/99642719/209422996-2e67d2d6-6568-405f-9b2a-0fc18b3fc731.gif)
- 캠핑지 Detail 페이지의 포스터를 더블클릭 하면 캠핑지에 관한 이미지들을 확인할 수 있다.
  - createPortal 함수를 활용하여 모달 창을 외부 DOM에서 렌더링 되도록 하였다.
  - Swiper 라이브러리를 활용하여 캠핑지의 이미지들을 모달창에서 슬라이드 형식으로 볼 수 있게 구현하였다.
<br />
<br />

![normalsearch-tour](https://user-images.githubusercontent.com/99642719/209422998-c516c49f-2636-4690-9250-b9d4fff2a836.gif)
- 국내여행 항목과 길 항목의 데이터를 파라미터 값을 받아와 React Query를 활용해 보여준다.
<br />
<br />

![preference-tour](https://user-images.githubusercontent.com/99642719/209423000-9d714d38-96d6-4ca2-94d4-34e956152877.gif)
- Cloud Firestore를 활용하여 '좋아요' 기능을 구현하였다.
  - 로그인 시 하트를 눌렀을 때 기존 데이터가 저장되어 있지 않으면 데이터를 생성해 하트에 빨간색을 유지하도록 하였으며
    저장되어 있으면 데이터를 삭제하여 하트의 색을 없애도록 하였다.
- Firestore에 저장된 값은 로그인 시 나의 선호 페이지에 나타나도록 하였다. 
<br />
<br />

![profile-tour](https://user-images.githubusercontent.com/99642719/209423001-ec08a18a-33e1-456a-860d-e8d05f7df410.gif)
- Cloud Storage를 활용하여 프로필 이미지를 업로드하고 화면에 나타나도록 하였다.
- Cloud Firestore를 활용하여 프로필 상세 내용을 나타내었다.
  - 기존 데이터가 없을 경우 새로 생성을 하였고 기존 데이터가 있을 경우 업데이트 시켜주었다.
<br />
<br />

![share-tour](https://user-images.githubusercontent.com/99642719/209423005-8b9c7ace-45da-4e30-b27f-165778a2d8f7.gif)
- SNS로 공유하기 버튼을 구현하였다.
  - Facebook과 Twitter는 javascript와 공유 url을 활용하여 구현하였다.
  - 카카오의 카카오톡 공유 및 카카오스토리 공유 API를 활용하여 feed 형식으로 해당 페이지의 url로 링크를 공유할 수 있게 만들었다.
<br />
<br />

![responsive1-tour](https://user-images.githubusercontent.com/99642719/209423002-94d7a69d-e9e7-4fcf-a5ce-cc2a0ce721e6.gif) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![responsive2-tour](https://user-images.githubusercontent.com/99642719/209423003-7cc11516-670d-4d03-af21-a0534e19127c.gif)
- 웹 사이즈에 반응하도록 반응형 웹을 구현하였다.
<br />
<br />

---
## :fire: 부족한 점 / 고쳐야할 점
- 새로운 개발 환경 Vite에 대한 활용 및 지식 부족
- OAuth를 통한 로그인 및 회원가입 구현 방식
- React Query의 useInfiniteQuery를 활용하였으나 여전히 미숙함
- 외부 라이브러리(Chart.js, Swiper 등)에 대한 공부 
