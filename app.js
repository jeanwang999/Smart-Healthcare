// =========================================================
// 步驟 3: 模擬數據 (鍵值已調整為 RoomXXX 格式)
// =========================================================



// 全域變數，記錄當前顯示的時間層次，預設為 'current'
let currentRiskTime = 'current';

// =========================================================
// 步驟 4a: 渲染病房顏色
// =========================================================
function renderMap() {
    // 遍歷所有病患數據，roomID 現在是 "Room601" 格式
    for (const roomID in patientData) {
        const data = patientData[roomID];
        // 直接透過 ID 查找 SVG 中的 <g> 元素
        const roomElement = document.getElementById(roomID); 
        
        if (!roomElement) continue; 

        // 1. 確保所有病房元素都有通用 class 和 room-number
        roomElement.classList.add('room-shape');
        roomElement.setAttribute('data-room-number', data.roomNumber);

        let riskLevel;
        let isManualOverride = false;

        // 2. 判斷是否使用醫師手動覆蓋
        if (data.manualOverride && data.manualOverride.time === currentRiskTime) {
            riskLevel = data.manualOverride.level;
            isManualOverride = true;
        } else {
            // 使用 AI 預測的風險等級
            riskLevel = data.risk[currentRiskTime].level;
        }

        // 3. 移除舊的風險等級 class，包括手動覆蓋的 class
        const classList = roomElement.className.baseVal.split(' ').filter(c => 
            !c.startsWith('risk-level-') && c !== 'risk-manual'
        );
        roomElement.className.baseVal = classList.join(' ');


        // 4. 添加新的風險等級 class
        roomElement.classList.add(`risk-level-${riskLevel}`);

        // 5. 處理手動覆蓋的樣式
        if (isManualOverride) {
            roomElement.classList.add('risk-manual');
        }
    }
}

// =========================================================
// 步驟 4b: 時間層次切換
// =========================================================
document.querySelectorAll('.time-btn').forEach(button => {
    button.addEventListener('click', function() {
        // 移除所有按鈕的 active 狀態
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('active'));
        
        // 設置當前按鈕為 active
        this.classList.add('active');
        
        // 更新全域變數
        currentRiskTime = this.getAttribute('data-time');
        
        // 重新渲染地圖顏色
        renderMap();
        
        // 清空詳細面板並顯示預設資訊
        const defaultInfo = document.querySelector('#detail-panel #patient-info hr').parentNode.innerHTML;
        document.getElementById('patient-info').innerHTML = defaultInfo;
    });
});


// =========================================================
// 步驟 4c: 點擊病房顯示詳細資料 (包含 SHAP/LIME 解釋)
// =========================================================
function setupRoomClick() {
    // 選取所有具有 'room-shape' class 的元素 (也就是所有的 <g id="RoomXXX">)
    document.querySelectorAll('.room-shape').forEach(roomElement => {
        roomElement.addEventListener('click', function() {
            const roomNumber = this.getAttribute('data-room-number'); // 獲取 "601"
            const dataKey = `Room${roomNumber}`; // 構造 "Room601"
            const data = patientData[dataKey]; // 查找數據

            if (!data) {
                // 如果點擊的是沒有數據的病房，顯示空資訊
                document.getElementById('patient-info').innerHTML = `<h3>病房 ${roomNumber}</h3><p>此病房目前無病患或無 AI 監測數據。</p>`;
                return;
            }

            const currentRisk = data.risk[currentRiskTime];
            const riskExplanation = data.explanation[currentRiskTime] || [];
            
            // --- 處理風險狀態的顯示 (包括手動覆蓋) ---
            let riskStatusHTML = `<span class="risk-level-${currentRisk.level}">AI 預測等級 ${currentRisk.level}</span>`;
            let vitalsHtml = `
                HR: ${data.vitals.hr} | 
                BP: ${data.vitals.bp} | 
                SpO2: ${data.vitals.spo2}% | 
                Temp: ${data.vitals.temp}°C
            `;
            let manualReason = '';

            if (data.manualOverride && data.manualOverride.time === currentRiskTime) {
                 riskStatusHTML = `
                    <span class="risk-manual">醫師手動覆蓋：等級 ${data.manualOverride.level}</span> 
                 `;
                 manualReason = `<p style="margin-top: 5px; color: #9C27B0;">**手動原因:** ${data.manualOverride.reason}</p>`;
            }

            // --- 格式化 SHAP/LIME 解釋 ---
            let explanationHTML = riskExplanation.length > 0 ? 
                riskExplanation.map(item => `
                    <li>
                        <strong>${item.feature}</strong>: 
                        <span style="color: #c0392b; font-weight: bold;">+${(item.impact * 100).toFixed(1)}%</span> (機率影響)
                        <span style="color: gray; font-size: 0.9em;">(${item.trend})</span>
                    </li>
                `).join('') : 
                '<li>此時層次風險因素穩定，無顯著特徵推動風險。</li>';

            // --- 渲染詳細面板內容 ---
            document.getElementById('patient-info').innerHTML = `
                <h3>病房號碼: ${roomNumber} - ${data.name}</h3>
                <p><strong>年齡 / 住院天數:</strong> ${data.age}歲 / ${data.admissionDays}天</p>
                <p><strong>即時生理數據:</strong> ${vitalsHtml}</p>
                ${manualReason}
                <hr>
                
                <h4>當前 AI 風險預測 (${currentRiskTime === 'current' ? '現在' : '未來 ' + roomNumber.slice(1) + ' 小時'}):</h4>
                <p><strong>危急機率:</strong> <strong style="font-size: 1.2em;">${Math.round(currentRisk.probability * 1000) / 10}%</strong></p>
                <p><strong>風險標示:</strong> ${riskStatusHTML}</p>
                
                <hr>
                <h4>AI 特徵解釋 (SHAP/LIME):</h4>
                <p style="font-size: 0.9em; color: #555;">模型判斷推高風險的主要因素:</p>
                <ul style="list-style: disc; padding-left: 20px;">
                    ${explanationHTML}
                </ul>
                
                <hr>
                <h4>輔助決策：醫師調整風險</h4>
                <button onclick="simulateManualOverride('${roomNumber}')">模擬手動調整為 (等級 2)</button>
                <p style="font-size: 0.8em; color: #777; margin-top: 5px;">此操作將覆蓋AI預測，並在地圖上顯示紫色標記。</p>
            `;
        });
    });
}

// =========================================================
// 模擬醫師手動調整的函數 (人機協作演示)
// =========================================================
window.simulateManualOverride = function(roomNumber) {
    const dataKey = `Room${roomNumber}`;
    // 實際應用中，這會是一個表單提交的過程
    patientData[dataKey].manualOverride = { 
        time: currentRiskTime, 
        level: 2, // 假設醫師將風險手動降至 2
        reason: '已調整呼吸器參數，病況改善，預計風險降低。'
    };
    
    // 1. 重新渲染地圖 (更新顏色)
    renderMap();
    
    // 2. 重新觸發點擊事件，更新詳細面板的顯示
    const roomElement = document.getElementById(dataKey);
    if (roomElement) {
        roomElement.click();
    }
    
    alert(`病房 ${roomNumber} 在 ${currentRiskTime} 的風險已由醫師手動調整為 等級 2 (紫色)！`);
}

// =========================================================
// 初始化：首次載入時運行
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 執行一次渲染，顯示初始的 'current' 風險
    renderMap(); 
    
    // 設置所有病房的點擊事件
    setupRoomClick();
});