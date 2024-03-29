// src/components/OrderSummary.js
import React from 'react';
//import './OrderSummary.css'; // 해당 컴포넌트의 스타일 시트

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <h2>내가 한 주문 확인</h2>
      <div className="order-details">
        <div className="order-row">
          <span>주문</span>
          <span>매수</span>
          <span>매도</span>
        </div>
        <div className="order-row">
          <span>시장가</span>
          {/* 시장가 정보 */}
        </div>
        <div className="order-row">
          <span>지정가</span>
          {/* 지정가 정보 */}
        </div>
        {/* ... 기타 주문 정보들 */}
      </div>
      <button className="order-button">주문</button>
    </div>
  );
};

export default OrderSummary;
