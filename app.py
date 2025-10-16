# app.py - Streamlit 主應用程式

import streamlit as st
import pandas as pd
from joblib import load
import json
import random
import os
from streamlit.components.v1 import html

# --- 配置 ---
MODEL_PATH = "." # 假設模型檔案都在當前目錄
DATA_FILE = 'current_ward_full_data.csv'
# 確保這些係數與您最終測試出的最佳視覺化效果一致
SCALING_FACTOR_H6 = 0.25 
SCALING_FACTOR_H24 = 0.50

# --- 核心風險轉換函式 (從 prediction_to_json.py 搬過來) ---

def probability_to_risk_level(prob):
    # 使用您最終確定的閾值
    if prob < 0.10:
        return 1
    elif prob < 0.25:
        return 2
    elif prob < 0.45:
        return 3
    elif prob < 0.70:
        return 4
    else:
        return 5

@st.cache_data
def load_models_and_data():
    """載入模型和即時輸入數據"""
    lgbm_h6 = load(os.path.join(MODEL_PATH, 'lgbm_model_h6.joblib'))
    lgbm_h24 = load(os.path.join(MODEL_PATH, 'lgbm_model_h24.joblib'))
    df_full = pd.read_csv(DATA_FILE) 
    return lgbm_h6, lgbm_h24, df_full

def generate_predictions(lgbm_h6, lgbm_h24, df_full):
    """執行預測並生成 JSON 數據"""
    
    df_model = df_full.copy()
    
    # 準備模型輸入
    MODEL_FEATURES = [col for col in df_full.columns if col not in ['room_id', 'name', 'vitals_hr', 'vitals_spo2', 'vitals_temp', 'patient_id']]
    X_predict = df_model[MODEL_FEATURES].copy()
    
    # 預處理：gender 轉換
    X_predict['gender'] = X_predict['gender'].map({'M': 0, 'F': 1})
    
    # 預測
    probabilities_h6 = lgbm_h6.predict_proba(X_predict)[:, 1]
    probabilities_h24 = lgbm_h24.predict_proba(X_predict)[:, 1]

    patient_data_json = {}
    
    for i, details in df_full.iterrows():
        room_id = details['room_id']
        prob_h6 = probabilities_h6[i]
        prob_h24 = probabilities_h24[i]

        # 應用縮放係數
        scaled_prob_h6 = prob_h6 * SCALING_FACTOR_H6
        scaled_prob_h24 = prob_h24 * SCALING_FACTOR_H24
        
        # 模擬 SHAP 解釋 (簡化)
        explanation_h6 = []
        if details['spo2_min'] < 95: # 降低閾值以增加解釋
            explanation_h6.append({"feature": "血氧偏低", "impact": f"+{round(scaled_prob_h6 * 0.3, 3)}", "trend": "低於 95%"})
        if details['hr_avg'] > 95:
             explanation_h6.append({"feature": "心率偏高", "impact": f"+{round(scaled_prob_h6 * 0.2, 3)}", "trend": "平均心率 > 95"})

        # 構造 JSON 結構
        patient_data_json[room_id] = {
            "name": details['name'],
            "roomNumber": room_id.replace('Room', ''),
            "age": int(details['age']),
            "admissionDays": random.randint(1, 15),
            "risk": {
                "current": {"level": probability_to_risk_level(scaled_prob_h6 * 0.5), "probability": scaled_prob_h6 * 0.5 },
                "h6": {"level": probability_to_risk_level(scaled_prob_h6), "probability": scaled_prob_h6 },
                "h24": {"level": probability_to_risk_level(scaled_prob_h24), "probability": scaled_prob_h24 }
            },
            "vitals": {
                "hr": int(details['vitals_hr']), 
                "bp": f"{int(details['bp_systolic_min'] + 15)}/{int(details['bp_systolic_min'] - 20)}", 
                "spo2": int(details['vitals_spo2']), 
                "temp": round(details['vitals_temp'], 1) 
            },
            "explanation": {"h6": explanation_h6 if explanation_h6 else [{"feature": "模型穩定", "impact": "+0.00", "trend": "無異常"}], "h24": explanation_h6},
            "manualOverride": None
        }
        
    return json.dumps(patient_data_json) # 返回 JSON 字串

# --- Streamlit 儀表板呈現 ---

st.set_page_config(layout="wide")
st.title("🏥 智慧病房風險監測系統 (LightGBM)")

# 載入模型和數據
lgbm_h6, lgbm_h24, df_full = load_models_and_data()

# 生成最新的預測 JSON
json_data_str = generate_predictions(lgbm_h6, lgbm_h24, df_full)

# 讀取前端文件
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()
    
with open("styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# ⚠️ 注入數據和 CSS
# 將 JSON 數據和 CSS 樣式動態注入到 HTML 內容中
# 假設您的 index.html/app.js 結構允許您注入 <script> 或 <style> 標籤
final_html = f"""
<style>{css_content}</style>
{html_content}
<script>
    // 注入動態生成的 patientData
    const patientData = JSON.parse('{json_data_str}');
    
    // 確保 app.js 中的 renderMap 可以在這裡被呼叫
    // 如果 app.js 裡的邏輯是封裝在 DOMContentLoaded 裡，需要確保它能執行
    // 這裡只是演示注入，實際運行可能需要將 app.js 邏輯也整合到 <script> 標籤中
    
    // 理想情況下，app.js 邏輯應該緊跟在 patientData 定義之後
    // 您需要將 app.js 的內容複製貼到這裡的 <script> 標籤內
    // 為了簡潔，這裡只演示數據注入
    
    // === 這裡應該放置您的 app.js 內容，並確保它使用了上面的 patientData 變數 ===
    // 為了演示，假設您的 app.js 邏輯已經被手動合併或外部引入
    // ...
</script>
"""

# 使用 Streamlit 組件渲染完整的 HTML/CSS/JS 儀表板
html(final_html, height=800, scrolling=True)

# 顯示模型資訊和調試
st.sidebar.header("模型資訊")
st.sidebar.code(f"H6 AUC: (需要重新計算)") # 建議在這裡顯示模型訓練時的 AUC
st.sidebar.code(f"H24 AUC: (需要重新計算)")
st.sidebar.markdown(f"**H6 縮放係數:** {SCALING_FACTOR_H6}")
st.sidebar.markdown(f"**H24 縮放係數:** {SCALING_FACTOR_H24}")