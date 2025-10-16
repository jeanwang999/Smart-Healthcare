# 腳本名稱：current_ward_data_simulator.py (最終修正版)
import pandas as pd
import numpy as np
import random

# 確保生成一個全新的、偏低風險的數據集
np.random.seed(2025) 

NUM_CURRENT_WARDS = 29
ROOM_NUMBERS = [f'Room{600 + i}' for i in range(1, NUM_CURRENT_WARDS + 1)]

# 1. 靜態和基本生理數據生成 (大幅偏向低風險)
current_data = {
    # 讓年齡更年輕，更分散
    'age': np.random.randint(30, 80, NUM_CURRENT_WARDS), 
    'gender': np.random.choice(['M', 'F'], NUM_CURRENT_WARDS, p=[0.5, 0.5]),
    # 確保絕大多數人沒有共病
    'comorbidity': np.random.choice([0, 1], NUM_CURRENT_WARDS, p=[0.95, 0.05]), # 95% 無共病
    
    # 讓生理數據更接近正常值
    'hr_avg': np.random.normal(75, 5, NUM_CURRENT_WARDS).astype(int), # 平均心率降至 75 (更穩定)
    'spo2_min': np.random.normal(97, 1, NUM_CURRENT_WARDS).clip(min=94, max=100).astype(int), # 平均血氧升至 97 (下限提高到 94)
    'temp_max': np.random.normal(36.8, 0.3, NUM_CURRENT_WARDS), # 平均體溫降至 36.8
    'bp_systolic_min': np.random.normal(120, 8, NUM_CURRENT_WARDS).clip(min=100, max=140).astype(int), # 平均血壓更穩定
}

df_current = pd.DataFrame(current_data)

# 2. 模擬動態趨勢
# 讓趨勢變化極小
df_current['hr_change_rate'] = np.random.uniform(0.05, 0.5, NUM_CURRENT_WARDS) # 變化率上限降至 0.5
df_current['spo2_trend'] = np.random.uniform(-0.1, 0.1, NUM_CURRENT_WARDS) # 血氧趨勢幾乎不變


# 3. 加入前端需要的資訊 (模擬即時數據)
df_current['room_id'] = ROOM_NUMBERS
df_current['name'] = [f'病患-{i}' for i in range(1, NUM_CURRENT_WARDS + 1)]
df_current['vitals_hr'] = df_current['hr_avg'] + np.random.randint(-3, 3, NUM_CURRENT_WARDS)
df_current['vitals_spo2'] = df_current['spo2_min'] + np.random.randint(0, 1, NUM_CURRENT_WARDS)
df_current['vitals_temp'] = df_current['temp_max'] + np.random.uniform(-0.3, 0.3, NUM_CURRENT_WARDS)


# 輸出完整的 df_current
FULL_DATA_FILE = 'current_ward_full_data.csv' 
df_current.to_csv(FULL_DATA_FILE, index=False)
print(f"✅ 成功生成極低風險的 29 筆數據。已儲存至 {FULL_DATA_FILE}")