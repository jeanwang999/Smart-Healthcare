// =========================================================
// 步驟 3: 模擬數據 (鍵值已調整為 RoomXXX 格式)
// =========================================================
const patientData = {
    "Room601": {
        "name": "病患-1",
        "roomNumber": "601",
        "age": 60,
        "admissionDays": 15,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.31148812322617114
            },
            "h6": {
                "level": 4,
                "probability": 0.6229762464523423
            },
            "h24": {
                "level": 4,
                "probability": 0.5720155555703168
            }
        },
        "vitals": {
            "hr": 69,
            "bp": "127/92",
            "spo2": 98,
            "temp": 36.9
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room602": {
        "name": "病患-2",
        "roomNumber": "602",
        "age": 48,
        "admissionDays": 15,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.2692469841998286
            },
            "h6": {
                "level": 4,
                "probability": 0.5384939683996572
            },
            "h24": {
                "level": 5,
                "probability": 0.7951693584481807
            }
        },
        "vitals": {
            "hr": 75,
            "bp": "130/95",
            "spo2": 97,
            "temp": 36.9
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room603": {
        "name": "病患-3",
        "roomNumber": "603",
        "age": 60,
        "admissionDays": 6,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.2955443542008166
            },
            "h6": {
                "level": 4,
                "probability": 0.5910887084016332
            },
            "h24": {
                "level": 4,
                "probability": 0.659171287504746
            }
        },
        "vitals": {
            "hr": 77,
            "bp": "143/108",
            "spo2": 96,
            "temp": 36.6
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room604": {
        "name": "病患-4",
        "roomNumber": "604",
        "age": 42,
        "admissionDays": 13,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.2261705830643913
            },
            "h6": {
                "level": 4,
                "probability": 0.4523411661287826
            },
            "h24": {
                "level": 2,
                "probability": 0.22742928571614085
            }
        },
        "vitals": {
            "hr": 73,
            "bp": "138/103",
            "spo2": 95,
            "temp": 36.7
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room605": {
        "name": "病患-5",
        "roomNumber": "605",
        "age": 33,
        "admissionDays": 4,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.334820749744289
            },
            "h6": {
                "level": 4,
                "probability": 0.669641499488578
            },
            "h24": {
                "level": 4,
                "probability": 0.6450376402267941
            }
        },
        "vitals": {
            "hr": 68,
            "bp": "126/91",
            "spo2": 95,
            "temp": 37.2
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room606": {
        "name": "病患-6",
        "roomNumber": "606",
        "age": 49,
        "admissionDays": 5,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.1521232701903091
            },
            "h6": {
                "level": 3,
                "probability": 0.3042465403806182
            },
            "h24": {
                "level": 2,
                "probability": 0.11126148063574023
            }
        },
        "vitals": {
            "hr": 76,
            "bp": "136/101",
            "spo2": 96,
            "temp": 36.5
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room607": {
        "name": "病患-7",
        "roomNumber": "607",
        "age": 42,
        "admissionDays": 3,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.17523528254686035
            },
            "h6": {
                "level": 3,
                "probability": 0.3504705650937207
            },
            "h24": {
                "level": 4,
                "probability": 0.6486971447479216
            }
        },
        "vitals": {
            "hr": 68,
            "bp": "123/88",
            "spo2": 96,
            "temp": 36.8
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room608": {
        "name": "病患-8",
        "roomNumber": "608",
        "age": 62,
        "admissionDays": 13,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.2567087494121496
            },
            "h6": {
                "level": 4,
                "probability": 0.5134174988242992
            },
            "h24": {
                "level": 4,
                "probability": 0.5917895222754345
            }
        },
        "vitals": {
            "hr": 75,
            "bp": "136/101",
            "spo2": 96,
            "temp": 36.3
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room609": {
        "name": "病患-9",
        "roomNumber": "609",
        "age": 52,
        "admissionDays": 3,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.30228008632035186
            },
            "h6": {
                "level": 4,
                "probability": 0.6045601726407037
            },
            "h24": {
                "level": 5,
                "probability": 0.7510274980038576
            }
        },
        "vitals": {
            "hr": 76,
            "bp": "143/108",
            "spo2": 97,
            "temp": 37.2
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room610": {
        "name": "病患-10",
        "roomNumber": "610",
        "age": 67,
        "admissionDays": 8,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.27212960146975423
            },
            "h6": {
                "level": 4,
                "probability": 0.5442592029395085
            },
            "h24": {
                "level": 3,
                "probability": 0.2823519295676967
            }
        },
        "vitals": {
            "hr": 73,
            "bp": "148/113",
            "spo2": 96,
            "temp": 37.2
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room611": {
        "name": "病患-11",
        "roomNumber": "611",
        "age": 40,
        "admissionDays": 3,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.32894246932288135
            },
            "h6": {
                "level": 4,
                "probability": 0.6578849386457627
            },
            "h24": {
                "level": 5,
                "probability": 0.7761884057057088
            }
        },
        "vitals": {
            "hr": 72,
            "bp": "129/94",
            "spo2": 96,
            "temp": 36.7
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room612": {
        "name": "病患-12",
        "roomNumber": "612",
        "age": 44,
        "admissionDays": 7,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.4350641441698873
            },
            "h6": {
                "level": 5,
                "probability": 0.8701282883397746
            },
            "h24": {
                "level": 4,
                "probability": 0.5916219065370324
            }
        },
        "vitals": {
            "hr": 81,
            "bp": "134/99",
            "spo2": 94,
            "temp": 37.6
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room613": {
        "name": "病患-13",
        "roomNumber": "613",
        "age": 63,
        "admissionDays": 3,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.18472597226169046
            },
            "h6": {
                "level": 3,
                "probability": 0.3694519445233809
            },
            "h24": {
                "level": 4,
                "probability": 0.6487449469691263
            }
        },
        "vitals": {
            "hr": 71,
            "bp": "141/106",
            "spo2": 96,
            "temp": 36.8
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room614": {
        "name": "病患-14",
        "roomNumber": "614",
        "age": 70,
        "admissionDays": 4,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.1936952522312897
            },
            "h6": {
                "level": 3,
                "probability": 0.3873905044625794
            },
            "h24": {
                "level": 4,
                "probability": 0.6490087427719812
            }
        },
        "vitals": {
            "hr": 73,
            "bp": "125/90",
            "spo2": 96,
            "temp": 37.0
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room615": {
        "name": "病患-15",
        "roomNumber": "615",
        "age": 67,
        "admissionDays": 4,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.4241666345348017
            },
            "h6": {
                "level": 5,
                "probability": 0.8483332690696034
            },
            "h24": {
                "level": 4,
                "probability": 0.48968269048828844
            }
        },
        "vitals": {
            "hr": 68,
            "bp": "131/96",
            "spo2": 98,
            "temp": 36.8
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room616": {
        "name": "病患-16",
        "roomNumber": "616",
        "age": 53,
        "admissionDays": 2,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.42879999935037616
            },
            "h6": {
                "level": 5,
                "probability": 0.8575999987007523
            },
            "h24": {
                "level": 5,
                "probability": 0.7539813490098054
            }
        },
        "vitals": {
            "hr": 78,
            "bp": "128/93",
            "spo2": 97,
            "temp": 36.5
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room617": {
        "name": "病患-17",
        "roomNumber": "617",
        "age": 67,
        "admissionDays": 5,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.12647756366957982
            },
            "h6": {
                "level": 3,
                "probability": 0.25295512733915965
            },
            "h24": {
                "level": 4,
                "probability": 0.5998983353319545
            }
        },
        "vitals": {
            "hr": 69,
            "bp": "138/103",
            "spo2": 97,
            "temp": 37.1
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room618": {
        "name": "病患-18",
        "roomNumber": "618",
        "age": 77,
        "admissionDays": 15,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.23686467435919517
            },
            "h6": {
                "level": 4,
                "probability": 0.47372934871839034
            },
            "h24": {
                "level": 3,
                "probability": 0.3348194920051784
            }
        },
        "vitals": {
            "hr": 82,
            "bp": "127/92",
            "spo2": 96,
            "temp": 36.3
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room619": {
        "name": "病患-19",
        "roomNumber": "619",
        "age": 50,
        "admissionDays": 15,
        "risk": {
            "current": {
                "level": 1,
                "probability": 0.07909194183029465
            },
            "h6": {
                "level": 2,
                "probability": 0.1581838836605893
            },
            "h24": {
                "level": 4,
                "probability": 0.5800427518077169
            }
        },
        "vitals": {
            "hr": 79,
            "bp": "126/91",
            "spo2": 96,
            "temp": 37.3
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room620": {
        "name": "病患-20",
        "roomNumber": "620",
        "age": 46,
        "admissionDays": 4,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.10359598347044911
            },
            "h6": {
                "level": 2,
                "probability": 0.20719196694089823
            },
            "h24": {
                "level": 4,
                "probability": 0.5975999296742721
            }
        },
        "vitals": {
            "hr": 72,
            "bp": "151/116",
            "spo2": 97,
            "temp": 37.2
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room621": {
        "name": "病患-21",
        "roomNumber": "621",
        "age": 30,
        "admissionDays": 6,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.3096906030670361
            },
            "h6": {
                "level": 4,
                "probability": 0.6193812061340722
            },
            "h24": {
                "level": 5,
                "probability": 0.7406241859022012
            }
        },
        "vitals": {
            "hr": 74,
            "bp": "132/97",
            "spo2": 95,
            "temp": 37.0
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room622": {
        "name": "病患-22",
        "roomNumber": "622",
        "age": 33,
        "admissionDays": 10,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.27800809073648947
            },
            "h6": {
                "level": 4,
                "probability": 0.5560161814729789
            },
            "h24": {
                "level": 4,
                "probability": 0.6852507019348228
            }
        },
        "vitals": {
            "hr": 64,
            "bp": "132/97",
            "spo2": 96,
            "temp": 36.6
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room623": {
        "name": "病患-23",
        "roomNumber": "623",
        "age": 66,
        "admissionDays": 6,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.2969006567998851
            },
            "h6": {
                "level": 4,
                "probability": 0.5938013135997702
            },
            "h24": {
                "level": 5,
                "probability": 0.8487381420710685
            }
        },
        "vitals": {
            "hr": 74,
            "bp": "144/109",
            "spo2": 96,
            "temp": 37.0
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room624": {
        "name": "病患-24",
        "roomNumber": "624",
        "age": 55,
        "admissionDays": 11,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.3137958829083895
            },
            "h6": {
                "level": 4,
                "probability": 0.627591765816779
            },
            "h24": {
                "level": 5,
                "probability": 0.7254353741214894
            }
        },
        "vitals": {
            "hr": 81,
            "bp": "129/94",
            "spo2": 98,
            "temp": 37.0
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room625": {
        "name": "病患-25",
        "roomNumber": "625",
        "age": 47,
        "admissionDays": 9,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.2519963561298518
            },
            "h6": {
                "level": 4,
                "probability": 0.5039927122597035
            },
            "h24": {
                "level": 4,
                "probability": 0.6965195096710984
            }
        },
        "vitals": {
            "hr": 75,
            "bp": "146/111",
            "spo2": 96,
            "temp": 36.8
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room626": {
        "name": "病患-26",
        "roomNumber": "626",
        "age": 46,
        "admissionDays": 7,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.17657207334974698
            },
            "h6": {
                "level": 3,
                "probability": 0.35314414669949395
            },
            "h24": {
                "level": 5,
                "probability": 0.7713639343813014
            }
        },
        "vitals": {
            "hr": 66,
            "bp": "131/96",
            "spo2": 97,
            "temp": 36.8
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room627": {
        "name": "病患-27",
        "roomNumber": "627",
        "age": 41,
        "admissionDays": 8,
        "risk": {
            "current": {
                "level": 3,
                "probability": 0.39922807533892707
            },
            "h6": {
                "level": 5,
                "probability": 0.7984561506778541
            },
            "h24": {
                "level": 4,
                "probability": 0.561710875287646
            }
        },
        "vitals": {
            "hr": 68,
            "bp": "152/117",
            "spo2": 96,
            "temp": 36.9
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room628": {
        "name": "病患-28",
        "roomNumber": "628",
        "age": 75,
        "admissionDays": 4,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.1422631006857851
            },
            "h6": {
                "level": 3,
                "probability": 0.2845262013715702
            },
            "h24": {
                "level": 4,
                "probability": 0.5207905067707113
            }
        },
        "vitals": {
            "hr": 67,
            "bp": "136/101",
            "spo2": 96,
            "temp": 36.8
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    },
    "Room629": {
        "name": "病患-29",
        "roomNumber": "629",
        "age": 30,
        "admissionDays": 14,
        "risk": {
            "current": {
                "level": 2,
                "probability": 0.1986820557450923
            },
            "h6": {
                "level": 3,
                "probability": 0.3973641114901846
            },
            "h24": {
                "level": 3,
                "probability": 0.37045796195458763
            }
        },
        "vitals": {
            "hr": 83,
            "bp": "140/105",
            "spo2": 97,
            "temp": 36.3
        },
        "explanation": {
            "h6": [
                {
                    "feature": "模型穩定",
                    "impact": "+0.00",
                    "trend": "無異常"
                }
            ],
            "h24": []
        },
        "manualOverride": null
    }
};


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