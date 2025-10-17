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
SCALING_FACTOR_H6 = 0.55 
SCALING_FACTOR_H24 = 0.7

# --- 核心風險轉換函式 ---

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

@st.cache_resource # 使用 resource 緩存模型物件

def load_models_and_data():
    """載入模型和即時輸入數據"""
    try:
        lgbm_h6 = load(os.path.join(MODEL_PATH, 'lgbm_model_h6.joblib'))
        lgbm_h24 = load(os.path.join(MODEL_PATH, 'lgbm_model_h24.joblib'))
        df_full = pd.read_csv(DATA_FILE) 
        return lgbm_h6, lgbm_h24, df_full
    except Exception as e:
        st.error(f"載入模型或數據失敗：{e}")
        st.stop() 

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
        if details['spo2_min'] < 95: 
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
        
    # 重要：返回一個完整的 JSON 字串
    return json.dumps(patient_data_json) 

# --- Streamlit 儀表板呈現 ---

st.set_page_config(page_title="智慧病房風險監測系統", layout="wide")
st.title("◆ 智慧病房風險監測系統 (LightGBM)")

# 載入模型和數據
lgbm_h6, lgbm_h24, df_full = load_models_and_data()

# 生成最新的預測 JSON (確保執行)
json_data_str = generate_predictions(lgbm_h6, lgbm_h24, df_full)


# --- 讀取所有前端文件 (安全讀取，避免 f-string 解析問題) ---
try:
    with open("index.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    
    with open("styles.css", "r", encoding="utf-8") as f:
        css_content = f.read()
        
    with open("app.js", "r", encoding="utf-8") as f: 
        js_content = f.read() # 讀取原始 JS 內容 (含註解)

except FileNotFoundError as e:
    st.error(f"找不到必要的前端檔案：{e.filename}。請確認 {e.filename} 是否在 app.py 相同的目錄中。")
    st.stop()


# --- 處理 HTML/CSS/JS 整合 ---

# 1. 處理 CSS 內嵌 (使用 <style> 標籤)

css_optimization = """
/* CSS 優化：減少 Streamlit Custom HTML 頂部不必要的空白 */

"""

inline_css_tag = f"<style>\n{css_content}\n{css_optimization}\n</style>"

integrated_html = html_content.replace(
    '<link rel="stylesheet" href="styles.css">', 
    inline_css_tag
)

# 2. 準備 JS 注入區塊
# ⚠️ 確保 JSON 字串安全：轉義單引號，這樣 JSON.parse 才能在 JS 中正確執行
safe_json_str = json_data_str.replace("'", "\\'").replace("\n", "") 

script_injection = f"""
<script>
    // 1. 注入動態生成的 patientData
    const patientDataRaw = '{safe_json_str}'; 
    try {{
        const patientData = JSON.parse(patientDataRaw);
        
        // 2. 將 app.js 的邏輯放在這裡，因為它是從檔案讀取，所以安全地包含註解
        {js_content}
        
    }} catch(e) {{
        console.error("JSON 解析錯誤，無法啟動儀表板渲染:", e);
        console.log("Raw JSON:", patientDataRaw.substring(0, 200) + "...");
    }}
</script>
"""

# 3. 將 JS 注入到 HTML 內容的 </body> 標籤結束之前
final_html = integrated_html.replace(
    '</body>',
    script_injection + '</body>'
)

# 如果 index.html 不包含 <body> 標籤，我們使用簡單連接
if '</body>' not in final_html:
    final_html += script_injection


# 使用 Streamlit 組件渲染完整的 HTML/CSS/JS 儀表板
html(final_html, height=720, scrolling=True)

# 顯示模型資訊和調試 (移至主頁面底部)
st.markdown("---") # 增加分隔線以區分主要內容和資訊
st.header("模型資訊")
st.code(f"H6 Model Loaded: {lgbm_h6.__class__.__name__}")
st.code(f"H24 Model Loaded: {lgbm_h24.__class__.__name__}")
st.markdown(f"**H6 縮放係數:** {SCALING_FACTOR_H6}")
st.markdown(f"**H24 縮放係數:** {SCALING_FACTOR_H24}")
st.text("診斷：檢查前端檔案 (HTML/CSS/JS) 是否已在專案根目錄中。")