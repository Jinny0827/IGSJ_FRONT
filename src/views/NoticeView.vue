<template>
  <div class="board-box">
    <div class="cs-center-tap">
      <h2 class="title-pg">CS center</h2>
      <hr>
      <ul>
        <li>
          <span class="tap-title">Tel. 1515 - 0000</span>
          <span class="tap-t">평일 9:00 ~ 18:00</span>
        </li>
        <li class="cs-tap">
          <router-link to="/InquireWrite" class="button">
            <span class="tap-title">1:1 Q&A</span>
            <span class="tap-t">문의하러가기</span>
          </router-link>
        </li>
        <li class="cs-tap">
          <router-link to="/InquireList" class="button">
            <span class="tap-title">My Question</span>
            <span class="tap-t">내 문의내역</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="board-contents">
      <h2 class="title-t">Notice</h2>
      <div class="notice-contents">
        <h3>개인정보처리 방침 안내 (03/28~)</h3>
        <span>2023.03.25</span>
        <div class="box-contents">
          <p>
            울릉도 동남쪽 뱃길 따라 이백 리 외로운 섬 하나 새들의 고향
            <br>
            그 누가 아무리 자기네 땅이라고 우겨도 독도는 우리 땅 
            <br>
            경상북도 울릉군 도동산 63 동경 132 북위 37 평균기온 12도 강수량은 1300 독도는 우리 땅
            <br>
            오징어 꼴뚜기 대구 명태 거북이 연어 알 물새 알 해녀대합실 십칠만
            평방미터 우물하나 분화구 독도는 우리 땅 
            <br>지증왕 13년 섬나라 우산국
            세종실록지리지 50페이지 셋째 줄 하와이는 미국땅 대마도는 일본 땅
            독도는 우리땅 
            <br>
            러일전쟁 직후에 임자 없는 땅이라고 억지로 우기면 정말
            곤란해 신라장군 이사부 지하에서 웃는다. 독도는 우리 땅 
            <br>
            울릉도 동남쪽 뱃길 따라 이백 리 외로운 섬 하나 새들의 고향 그 누가 아무리 자기네
            땅이라고 우겨도 독도는 우리 땅 독도는 우리 땅~ 우리 땅!
          </p>
          <br>
        </div>
      </div>
      <router-link to="/NoticeList">
        <button class="n-btn">목록으로</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.notice-contents {
    padding-top: 30px;
    line-height: 20px;
}
.notice-contents h3 {
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 15px;
  font-weight: bold;
}
.board-contents .n-btn {
  display: inline-block;
  min-width: 100px;
  height: 40px;
  color: #ffffff;
  background-color: #000;
  box-sizing: border-box;
  padding: 2px 8px 0 8px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  border: none;
}
.board-contents .n-btn:hover {
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}
</style>