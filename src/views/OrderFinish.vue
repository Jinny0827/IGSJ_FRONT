<template>
    <div class="contents">
        <!--제목-->
        <div class="title">
            <h1>Order / Payment</h1>
        </div>

        <!--결제완료타이틀-->
        <div class="finish">
            <p class="finish_ordernum">주문번호 {{ orderFinishList.orderNum }}</p>
            <p class="finish_title">주문과 결제가 정상적으로 완료되었습니다.</p>
            <p class="finish_info">업체(브랜드)의 주문 확인 후 발송됩니다.</p>

            <button class="btn_orderdetail"><a href="#orderdetail">결제 정보 확인</a></button>
            <button class="btn_home" @click="$router.push('/')">홈으로 가기</button>
        </div>


        <!--결제정보확인-->
        <!--paymentDTO-->
        <div class="orderdetail" id="orderdetail">
            <!--결제정보-->
            <div class="payment_info">
                <p class="payment_info_title">결제 정보</p>
                <ul class="payment_info_box">
                    <li style="border-bottom: 1px solid #e5e5e5;">
                        <span class="payment_item_label">입금 정보</span>
                        <span class="payment_item_area">{{orderFinishList.paySet}}</span>
                    </li>
                    <li>
                        <span class="payment_item_label">결제 금액</span>
                        <span class="payment_item_area" style="color: #0078ff;">{{orderFinishList.payMoney}}</span>
                    </li>
                </ul>
            </div>

            <!--상품정보-->
            <div class="product_info">
                <p class="product_info_title">상품 정보</p>
                <table>
                    <colgroup>
                        <col style="width:10%">
                        <col style="width:60%">
                        <col style="width:10%">
                        <col style="width:20%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>상품 정보</th>
                            <th>수량</th>
                            <th>판매가</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img :src="orderFinishList.storedFileRootName" class="img_block" alt="product_img"></td>
                            <td>{{orderFinishList.product_name}}</td>
                            <td>{{orderFinishList.productCnt}}</td>
                            <td>{{orderFinishList.product_price}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!--배송지정보-->
            <!--orderDTO-->
            <div class="delivery_info">
                <p class="delivery_info_title">배송지 정보</p>
                <ul class="delivery_info_box">
                    <li style="border-bottom: 1px solid #e5e5e5;">
                        <span class="delivery_item_label">수령인</span>
                        <span class="delivery_item_area">{{orderFinishList.recipient}}</span>
                        <span class="delivery_item_label" style="border-left: 1px solid #e5e5e5;">휴대전화</span>
                        <span class="delivery_item_area">{{orderFinishList.recipient_phone}}</span>
                    </li>
                    <li>
                        <span class="delivery_item_label">배송지</span>
                        <span class="delivery_item_area">{{ formattedTotalAddress }}</span>
                        <span class="delivery_item_label" style="border-left: 1px solid #e5e5e5;">전화번호</span>
                        <span class="delivery_item_area">{{orderFinishList.recipient_phone}}</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="finish">
            <button class="btn_orderdetail" @click="$router.push('/orderList')">주문 상세 내역 보기</button>
            <button class="btn_home" @click="$router.push('/')">홈으로 가기</button>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            orderFinishList:{
                orderNum: '',
                recipient: '',
                recipient_phone: '',
                post_address: '',
                detail_address: '',
                detail_address2: '',
                productCnt: '',
                paySet: '',
                payMoney: '',
                pno: '',
                product_name: '',
                product_price: '',
            }
        }
    },
    created() {
        this.orderNum = this.$route.params.orderNum
        this.getOrderFinishList(this.orderNum)
    },
    computed: {
        formattedTotalAddress() {
            const totalAddress = '(' + this.orderFinishList.post_address + ')' + this.orderFinishList.detail_address + this.orderFinishList.detail_address2
            return totalAddress
        }
    },
    methods:{
        getOrderFinishList(orderNum){
            this.$axios.get(this.$serverUrl + "/order/orderFinishPage?orderNum=" + orderNum
            ).then((res) => {
                console.log(res.data)
                this.orderFinishList = res.data
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('주문 정보 조회 불가')
                }
            })
        }
    }
};
</script>

<style>
.finish {
    padding: 80px;
    text-align: center;
}
a{
    text-decoration: none;
    color: black;
}
.title {
    /* padding-bottom: 14px;
    margin-top: 48px; */
    clear: both;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #ddd;
}

.finish_ordernum {
    color: gray;
    margin-bottom: 20px;
}

.finish_title {
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
}

.finish_info {
    font-weight: bold;
}

.finish button {
    margin: 0 10px;
    padding: 10px 0;
    width: 200px;
    margin-top: 20px;
}

.btn_orderdetail {
    border: 1px solid #e5e5e5;
    background-color: white;
    font-weight: bold;
}

.btn_home {
    border: none;
    color: white;
    background-color: black;
    font-weight: bold;
}

/*결제정보확인*/
.orderdetail {
    border-top: 1px solid #e5e5e5;
    padding: 20px;
}

/*결제 정보 */
.payment_info {
    margin-bottom: 50px;
}

.payment_info_title {
    font-weight: bold;
    font-size: 20px;
    margin-top: 150px;
}

ul {
    list-style: none;
}

.payment_info_box {
    padding: 0;
    width: 100%;
    border: 1px solid #e5e5e5;
}

.payment_info_box li {
    display: flex;
    height: 70px;
}

.payment_item_label {
    align-items: center;
    width: 300px;
    display: flex;
    justify-content: center;
    border-right: 1px solid #e5e5e5;
    height: 100%;
    font-weight: bold;
}

.payment_item_area {
    display: flex;
    padding-left: 20px;
    align-items: center;
    background-color: #efefef;
    width: 100%;
    font-weight: bold;
}

/*상품 정보 */
.img_block{
    width: 100%;
}
.product_info {
    margin-bottom: 50px;
}

.product_info_title {
    font-weight: bold;
    font-size: 20px;
}

.product_info table {
    width: 100%;
}

.product_info thead {
    border: 1px solid #e5e5e5;
    height: 60px;
    font-weight: bold;
    text-align: center;
}

.product_info tbody {
    border: 1px solid #e5e5e5;
    text-align: center;
    height: 150px;
    background-color: #efefef;
}

/*배송지 정보 */
.delivery_info {
    margin-bottom: 50px;
}

.delivery_info_title {
    font-weight: bold;
    font-size: 20px;
}

.delivery_info_box {
    width: 100%;
    padding: 0;
    border: 1px solid #e5e5e5;
}

.delivery_info_box li {
    display: flex;
    align-items: center;
}

.delivery_item_label {
    width: 15%;
    height: 70px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-right: 1px solid #e5e5e5;
    font-weight: bold;
}

.delivery_item_area {
    width: 35%;
    height: 70px;
    padding-left: 20px;
    background-color: #EFEFEF;
    display: flex;
    align-items: center;
}</style>