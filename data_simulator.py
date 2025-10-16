import pandas as pd
import numpy as np

# 設置隨機種子以確保結果可重現
np.random.seed(42)

NUM_PATIENTS = 1000

# 1. 靜態和基本生理數據生成
data = {
    'patient_id': [f'P{i:04d}' for i in range(1, NUM_PATIENTS + 1)],
    'age': np.random.randint(50, 95, NUM_PATIENTS),
    'gender': np.random.choice(['M', 'F'], NUM_PATIENTS, p=[0.55, 0.45]),
    # 慢性病史：0=無, 1=有 COPD/糖尿病等
    'comorbidity': np.random.choice([0, 1], NUM_PATIENTS, p=[0.7, 0.3]),
    
    # 過去 24 小時的生理數據 (模擬趨勢)
    'hr_avg': np.random.normal(85, 10, NUM_PATIENTS).astype(int), # 平均心率
    'spo2_min': np.random.normal(95, 2, NUM_PATIENTS).clip(min=80, max=100).astype(int), # 最低血氧
    'temp_max': np.random.normal(37.5, 0.8, NUM_PATIENTS), # 最高體溫
    'bp_systolic_min': np.random.normal(110, 15, NUM_PATIENTS).clip(min=80, max=160).astype(int), # 最低收縮壓
}

df = pd.DataFrame(data)

# 2. 模擬動態趨勢 (例如，心率變化率)
# 數值越高，代表變化越劇烈，風險越高
df['hr_change_rate'] = np.random.uniform(0.1, 1.5, NUM_PATIENTS)
df['spo2_trend'] = np.random.uniform(-0.5, 0.5, NUM_PATIENTS) # 趨勢變化 (負值代表下降)


# 3. 模擬「危急事件發生」的邏輯 (創建 Label)
# 根據特徵計算一個「潛在風險分數」
# 權重：年齡高、有共病、血氧低、體溫高、變化率高 = 風險高

df['risk_score'] = (
    (df['age'] / 100) * 0.2 +
    (df['comorbidity']) * 0.15 +
    (100 - df['spo2_min']) * 0.15 + # 血氧越低，分數越高
    (df['temp_max'] - 36.5) * 0.1 + # 體溫越高，分數越高
    (df['hr_change_rate']) * 0.1 + 
    (df['spo2_trend'] < -0.2) * 0.1 # 血氧下降趨勢，分數越高
)

# 根據風險分數，計算發生危急事件的機率（使用 Sigmoid 函數來限制範圍）
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# 調整訓練集 Label 生成的程式碼
# 降低 Sigmoid 函數中的常數，使 base_probability 普遍降低
df['base_probability'] = sigmoid((df['risk_score'] * 3) - 2.5) # 原 -1.5 -> 調整至 -2.5

# 4. 生成 Label (模擬結果)
# 未來 6 小時危急 (機率較低，高風險群更容易發生)
df['critical_h6'] = (np.random.rand(NUM_PATIENTS) < df['base_probability'] * 0.6).astype(int)

# 降低 H24 危急事件的發生機率
# 讓 H24 的 Label 佔總數的 10% 左右
df['critical_h24'] = (np.random.rand(NUM_PATIENTS) < df['base_probability'] * 0.7).astype(int) 

# 5. 清理和輸出
df = df.drop(columns=['risk_score', 'base_probability'])
print(f"成功生成 {NUM_PATIENTS} 筆病患歷史數據。")
print("\n數據前五行：")
print(df.head())

# 輸出到 CSV 檔案，供模型訓練使用
df.to_csv('patient_historical_data.csv', index=False)
print("\n數據已儲存至 patient_historical_data.csv")