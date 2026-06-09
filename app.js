/**
 * 🩺 糖尿病全方位互動衛教單張 - 互動邏輯 (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 🌟 1. 基礎設定 (主題切換與列印)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const printBtn = document.getElementById('print-btn');
  const printDateSpans = document.querySelectorAll('#print-date');
  
  // 載入當前列印日期
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  printDateSpans.forEach(span => span.textContent = dateString);

  // 主題切換
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggle.querySelector('.icon').textContent = '🌙';
        themeToggle.querySelector('.btn-text').textContent = '深色模式';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.icon').textContent = '☀️';
        themeToggle.querySelector('.btn-text').textContent = '淺色模式';
      }
    });
  }

  // 列印按鈕
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================================================
  // 🧫 2. Beta Cell Nature Aging 曲線互動
  // ==========================================================================
  const timeSlider = document.getElementById('time-slider');
  const betaCurve = document.getElementById('beta-curve');
  const indicatorLine = document.getElementById('indicator-line');
  const indicatorPoint = document.getElementById('indicator-point');
  const betaTitle = document.getElementById('beta-info-title');
  const betaDesc = document.getElementById('beta-info-desc');

  // 不同年分段的衛教內容
  const betaEducationData = [
    {
      range: [-15, -11],
      title: '健康隱匿期 (診斷前 15 至 11 年)',
      desc: '此時您的胰島 β 細胞功能仍在 90% 以上，但體內可能已經開始產生「胰島素阻抗」。身體為了維持血糖正常，胰臟必須加倍努力工作分泌更多胰島素，血糖看似正常但已有隱憂。'
    },
    {
      range: [-10, -6],
      title: '高負荷代償期 (診斷前 10 至 6 年)',
      desc: 'β 細胞功能已衰退至 80% 左右。由於長期過度勞累，部分細胞開始凋亡。此時若進行口服糖耐量測試，可能已出現血糖輕微偏高的跡象，但空腹血糖大多仍正常。'
    },
    {
      range: [-5, -1],
      title: '糖尿病前期 (診斷前 5 至 1 年)',
      desc: 'β 細胞功能降至 70% ~ 60%。胰島素分泌已無法完全代償胰島素阻抗，血糖開始明顯上升，步入「糖尿病前期」（A1C 在 5.7% - 6.4% 之間）。此時積極進行飲食與體重控制，有機會逆轉病程！'
    },
    {
      range: [0, 0],
      title: '診斷確立期 (第 0 年)',
      desc: '在此時間點，因為高血糖症狀或健康檢查，您被正式診斷為第 2 型糖尿病。此時您的胰島 β 細胞功能已經比健康時期衰退了約 50%。需要開始配合醫師處方進行藥物治療。'
    },
    {
      range: [1, 5],
      title: '藥物合併治療期 (診斷後 1 至 5 年)',
      desc: 'β 細胞功能降至 40% 左右。隨時間進展，單一種口服降血糖藥可能逐漸不敷使用，需要加上第二種或第三種不同機轉的口服藥物聯合控制，此時也是保護剩餘β細胞的關鍵期。'
    },
    {
      range: [6, 10],
      title: '胰島素不足警告期 (診斷後 6 至 10 年)',
      desc: 'β 細胞功能衰退至 30% ~ 20%。身體自行分泌胰島素的能力顯著降低，口服藥物的效果可能變差。若糖化血色素持續超標，應與醫師討論及早加入胰島素或 GLP-1 治療，避免胰臟細胞加速衰亡。'
    },
    {
      range: [11, 15],
      title: '晚期衰竭期 (診斷後 11 年以上)',
      desc: 'β 細胞功能剩餘 15% 以下，幾乎無法分泌足夠維持身體代謝的胰島素。此時治療主軸通常需要每日補充足夠的胰島素，以維持血糖穩定，並全力防範全身性併發症的惡化。'
    }
  ];

  function updateBetaCellCurve(year) {
    if (!betaCurve) return;
    
    const totalLength = betaCurve.getTotalLength();
    // 將 slider 的值 [-15, 15] 映射到 [0, 1] 比例
    const percentage = (year - (-15)) / 30;
    
    // 取得在曲線上的座標
    const point = betaCurve.getPointAtLength(percentage * totalLength);
    
    // 更新 SVG 指示器的位置
    if (indicatorLine) {
      indicatorLine.setAttribute('x1', point.x);
      indicatorLine.setAttribute('x2', point.x);
      indicatorLine.setAttribute('opacity', '1');
    }
    if (indicatorPoint) {
      indicatorPoint.setAttribute('cx', point.x);
      indicatorPoint.setAttribute('cy', point.y);
      indicatorPoint.setAttribute('opacity', '1');
    }

    // 尋找對應的衛教文案
    const edu = betaEducationData.find(item => year >= item.range[0] && year <= item.range[1]);
    if (edu) {
      if (betaTitle) betaTitle.textContent = `${edu.title} (第 ${year >= 0 ? '+' : ''}${year} 年)`;
      if (betaDesc) betaDesc.textContent = edu.desc;
    }
  }

  if (timeSlider) {
    timeSlider.addEventListener('input', (e) => {
      updateBetaCellCurve(parseInt(e.target.value));
    });
    // 初始化
    updateBetaCellCurve(0);
  }

  // ==========================================================================
  // 🚦 3. A1C 紅黃綠燈區儀表板
  // ==========================================================================
  const a1cInput = document.getElementById('a1c-input');
  const gaugePointer = document.getElementById('gauge-pointer');
  const a1cValText = document.getElementById('a1c-val-text');
  const a1cCard = document.getElementById('a1c-card');
  const a1cStatusTitle = document.getElementById('a1c-status-title');
  const a1cStatusDesc = document.getElementById('a1c-status-desc');

  function updateA1cGauge(val) {
    const value = parseFloat(val);
    if (isNaN(value) || value < 4 || value > 15) return;

    // 更新文字
    if (a1cValText) a1cValText.textContent = value.toFixed(1);
    if (a1cInput) a1cInput.value = value.toFixed(1);

    // 映射到 pointer 旋轉 (4% -> -90deg, 12% -> 90deg)
    // 比例 = (value - 4) / 8;
    const p = Math.max(0, Math.min(1, (value - 4) / 8));
    const angle = -90 + (p * 180);
    if (gaugePointer) {
      gaugePointer.style.transform = `rotate(${angle}deg)`;
    }

    // 更新狀態燈號與卡片內容
    if (a1cCard) {
      if (value < 7.0) {
        a1cCard.className = 'a1c-status-card alert-green';
        if (a1cStatusTitle) a1cStatusTitle.textContent = '綠燈區：控制良好 (A1C < 7.0%)';
        if (a1cStatusDesc) a1cStatusDesc.textContent = '恭喜！您的血糖控制達到一般成年糖尿病友的理想標準。這能大幅降低未來發生腎臟、眼睛與心血管病變的風險。請繼續保持健康的飲食、規律運動與藥物治療！';
      } else if (value >= 7.0 && value <= 8.0) {
        a1cCard.className = 'a1c-status-card alert-yellow';
        if (a1cStatusTitle) a1cStatusTitle.textContent = '黃燈區：需要注意 (A1C 7.0% - 8.0%)';
        if (a1cStatusDesc) a1cStatusDesc.innerHTML = '您的血糖稍微偏高，這是一個黃色警訊。<strong>此區間特別適合高齡衰弱或施打胰島素的長者（此族群嚴重低血糖年發生率約 11% - 25%，且會使主要心血管事件 MACE 風險增加 2 倍）</strong>。此時控制目標放寬至 8.0% 甚至 8.5% 是符合安全考量的。<br><span style="font-size: 13px; color: var(--text-muted); font-weight: 500;">📖 實證文獻：NEJM 2008 (ACCORD trial / ADVANCE trial)【Level 1b, 大型 RCT】</span>';
      } else {
        a1cCard.className = 'a1c-status-card alert-red';
        if (a1cStatusTitle) a1cStatusTitle.textContent = '紅燈區：危險高危 (A1C > 8.0%)';
        if (a1cStatusDesc) a1cStatusDesc.textContent = '危險！高血糖正在默默損害您全身的血管與神經。長期處於此區間，腎病變、中風、心肌梗塞與視網膜病變的機率將呈倍數攀升。請立即尋求主治醫師協助調整治療方案！';
      }
    }
  }

  // 暴露給全域按鈕調用
  window.setA1c = function(val) {
    updateA1cGauge(val);
  };

  if (a1cInput) {
    a1cInput.addEventListener('input', (e) => {
      updateA1cGauge(e.target.value);
    });
    // 初始化
    updateA1cGauge(6.5);
  }

  // ==========================================================================
  // 🧠 4. DM Complications 併發症互動
  // ==========================================================================
  const hotspots = document.querySelectorAll('.hotspot');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const compIcon = document.getElementById('comp-icon');
  const compTitle = document.getElementById('comp-title');
  const compCause = document.getElementById('comp-cause');
  const compSymptoms = document.getElementById('comp-symptoms');
  const compPrev = document.getElementById('comp-prev');

  const complicationData = {
    brain: {
      icon: '🧠',
      title: '腦血管病變 (腦中風與失智風險)',
      prevalence: '約 7.6% (中風風險高出 1.5 - 2.5 倍)',
      improvement: '中風風險降低 12%',
      evidence: 'ADA Care Guidelines 2026【Level 1a, 權威指引共識】',
      cause: '長期高血糖會引發血管內皮慢性發炎，加速頸動脈與腦血管粥狀硬化。當血管狹窄或血栓脫落阻塞腦血管時，即引發「缺血性腦中風」；若血壓過高使脆弱血管破裂，則引發「出血性腦中風」。',
      symptoms: [
        '臉部表情不對稱、一側嘴角下垂。',
        '單側手腳無力、麻木、或拿不穩東西。',
        '言語不清、說話含糊或聽不懂別人說話。',
        '突發性劇烈頭痛、天旋地轉的頭暈。'
      ],
      prev: [
        '定期監測血壓，目標控制在 130/80 mmHg 以下。',
        '控制低密度膽固醇 (LDL-C < 100 mg/dL，已有心血管病變者 < 70 mg/dL)。',
        '戒菸、少鹽、規律進行有氧運動。',
        '有心房顫動或血管狹窄者，遵醫囑服用抗凝血或抗血小板藥物。'
      ]
    },
    eye: {
      icon: '👁️',
      title: '糖尿病視網膜病變 (視力小偷)',
      prevalence: '全球約 22.3% (罹病超過 20 年後盛行率 60% - 80%，增殖性 PDR 約 6%)',
      improvement: '微血管病變風險降低 37%',
      evidence: 'Ophthalmology 2023; 130 (Global Prevalence)【Level 1a, Meta-analysis】',
      cause: '視網膜充滿了微細血管。長期高血糖會使這些微血管受損、阻塞，導致視網膜缺氧，進而代償性地增生「新生血管」。這些新生血管極為脆弱，容易破裂出血流入玻璃體，或造成黃斑部水腫，是網膜病變致盲的主因。',
      symptoms: [
        '視力逐漸模糊、看東西時線條扭曲變形。',
        '眼前出現黑影、飛蚊症數量突然增加。',
        '視野缺損，或夜間視力顯著變差。',
        '初期通常無任何症狀，等有症狀時往往已是中晚期。'
      ],
      prev: [
        '確診第 2 型糖尿病後，應「立即」安排第一次眼底檢查。',
        '之後每年必須至少接受 1 次散瞳眼底篩檢。',
        '懷孕的糖尿病女性病友，應遵照醫師建議增加篩檢頻率。',
        '嚴格控制血糖 (A1C < 7.0%) 與血壓。'
      ]
    },
    heart: {
      icon: '❤️',
      title: '冠狀動脈心臟病 (心肌梗塞與心衰竭)',
      prevalence: '約 12.7% - 21.9% (心肌梗塞風險高出 2 - 4 倍)',
      improvement: '心肌梗塞風險降低 14%',
      evidence: 'Lancet 2018; 391 (GLOBALTA study)【Level 1a, 系統性回顧】',
      cause: '糖尿病是冠心病的等危症。高血糖與胰島素阻抗會損害心臟冠狀動脈，使其硬化、失去彈性並形成斑塊。當斑塊破裂引發急性血栓時，會導致心肌缺氧壞死（急性心肌梗塞）。此外，長期高血糖還會直接傷害心肌細胞，造成糖尿病心肌病變與心力衰竭。',
      symptoms: [
        '胸口有壓迫感、緊繃感或悶痛（像大石壓胸）。',
        '胸痛延伸至左肩、頸部、下巴或背部（輻射痛）。',
        '活動時容易氣喘吁吁、呼吸困難、異常疲倦。',
        '部分糖尿病友（特別是年長或神經病變者）可能呈現「無痛性心肌梗塞」，僅有冒冷汗、噁心症狀。'
      ],
      prev: [
        '每年評估心血管風險，包括血脂、心電圖。',
        '控制低密度膽固醇 LDL-C 與三酸甘油酯。',
        '遵照醫囑使用對心血管有保護作用的降血糖藥（如 SGLT2 抑制劑或 GLP-1 促效劑）。',
        '維持理想體重，避免腹部肥胖（男性腰圍 < 90cm，女性 < 80cm）。'
      ]
    },
    kidney: {
      icon: '🧼',
      title: '糖尿病腎臟病變 (CKD & 洗腎風險)',
      prevalence: '最終發展為 DKD 約 30% - 40% (台灣洗腎患者中有 45% - 47% 由糖尿病引起)',
      improvement: '微血管病變（腎病）風險降低 37%',
      evidence: 'KDIGO Clinical Practice Guideline 2024【Level 1a, 國際指引】',
      cause: '腎臟的腎絲球是一群微血管濾網。高血糖帶來的過濾壓力與發炎反應會破壞這層濾網，使血液中的蛋白質漏到尿液中（微量白蛋白尿），隨後濾網逐漸纖維化壞死，腎功能（eGFR）逐年下降，最終可能演變為尿毒症，需要依賴透析（洗腎）維持生命。',
      symptoms: [
        '泡：尿液多泡沫，且久久不散（蛋白尿）。',
        '水：下肢水腫，按壓皮膚後凹陷難以回彈。',
        '高：血壓異常升高。',
        '貧：容易疲倦、臉色蒼白（貧血）。',
        '疲：食慾不振、噁心、全身無力。'
      ],
      prev: [
        '每年至少進行 1 次尿液微量白蛋白比值 (UACR) 與腎絲球過濾率 (eGFR) 篩檢。',
        '血壓嚴格控制在 130/80 mmHg 以下。',
        '優先選用已被證實能延緩腎功能惡化的藥物（如 SGLT2 抑制劑、某些 GLP-1 促效劑或 RAS 阻斷劑血壓藥）。',
        '避免使用非類固醇消炎止痛藥 (NSAIDs) 及來源不明的草藥，以防急性腎損傷。'
      ]
    },
    foot: {
      icon: '👣',
      title: '糖尿病足部病變 (神經病變與周邊血管阻塞)',
      prevalence: '神經病變約 50% | 足潰瘍終身累積率 19% - 34% (5年死亡率高達 30%)',
      improvement: '周邊血管/截肢風險降低 43%',
      evidence: 'ADA Diabetes Care 2025【Level 1a】 / Lancet 2020; 396【Level 2a, Cohort Study】',
      cause: '高血糖會破壞神經系統，導致痛覺與溫度覺喪失（感覺鈍化）；同時也會引起下肢動脈狹窄阻塞，使足部缺血。這雙重打擊下，患者腳部受傷（如鞋子磨破、燙傷、剪腳指甲受傷）卻毫無感覺，傷口又因為缺血與細菌感染極難癒合，最終壞疽而必須截肢。',
      symptoms: [
        '雙腳對冷熱、疼痛感覺遲鈍，或常有針刺感、燒灼感、螞蟻爬行感。',
        '下肢皮膚乾燥、變薄、毛髮脫落，或腳溫冰冷。',
        '走路一段距離後小腿酸痛必須停下休息，休息後好轉（間歇性跛行）。',
        '足部傷口超過兩週未癒合、發紅、流膿、發臭。'
      ],
      prev: [
        '「每天」洗澡後仔細檢查雙腳（特別是腳底與趾縫），可用鏡子輔助或請家人幫忙。',
        '絕對不要赤腳走路（室內室外皆然），穿鞋一定要穿襪子. ...',
        '洗腳水溫應先用手肘測試，切忌泡熱水腳以免燙傷。',
        '修剪趾甲應平剪，不要挖兩側指甲肉。選擇包覆性良好、合腳的鞋子。'
      ]
    }
  };

  function switchComplication(target) {
    const data = complicationData[target];
    if (!data) return;

    // 更新 hotspots 的 active 狀態
    hotspots.forEach(hs => {
      if (hs.getAttribute('data-target') === target) {
        hs.classList.add('active');
      } else {
        hs.classList.remove('active');
      }
    });

    // 更新 tabs 的 active 狀態
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-target') === target) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 更新右側面板內容 (帶有淡入效果)
    const panel = document.getElementById('comp-detail-content');
    if (panel) {
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(5px)';
      
      setTimeout(() => {
        if (compIcon) compIcon.textContent = data.icon;
        if (compTitle) compTitle.textContent = data.title;
        if (compCause) compCause.textContent = data.cause;

        // 渲染症狀列表
        if (compSymptoms) {
          compSymptoms.innerHTML = data.symptoms.map(sym => `<li>${sym}</li>`).join('');
        }

        // 渲染預防列表
        if (compPrev) {
          compPrev.innerHTML = data.prev.map(prv => `<li>${prv}</li>`).join('');
        }

        // 渲染統計數據
        const prevalenceEl = document.getElementById('comp-stat-prevalence');
        const improvementEl = document.getElementById('comp-stat-improvement');
        const evidenceEl = document.getElementById('comp-evidence-source');
        if (prevalenceEl) prevalenceEl.innerHTML = data.prevalence;
        if (improvementEl) improvementEl.innerHTML = data.improvement;
        if (evidenceEl) {
          evidenceEl.innerHTML = `📖 實證文獻來源：${data.evidence}`;
        }

        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  // 綁定 hotspots 點擊
  hotspots.forEach(hs => {
    hs.addEventListener('click', () => {
      const target = hs.getAttribute('data-target');
      switchComplication(target);
    });
  });

  // 綁定 tab 按鈕點擊
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchComplication(target);
    });
  });

  // ==========================================================================
  // 🧫 5. KDIGO DM CKD 風險計算機 & 雙表格切換
  // ==========================================================================
  const egfrInput = document.getElementById('egfr-input');
  const uacrInput = document.getElementById('uacr-input');
  const calcBtn = document.getElementById('calc-kdigo-btn');
  const resultPanel = document.getElementById('kdigo-result-panel');
  const resultRiskLevel = document.getElementById('result-risk-level');
  const resultDesc = document.getElementById('result-desc');
  const resultFrequency = document.getElementById('result-frequency');
  const kdigoCells = document.querySelectorAll('.kdigo-cell');

  // 表格切換元素
  const btnKdigoFreq = document.getElementById('btn-kdigo-freq');
  const btnKdigoRisk = document.getElementById('btn-kdigo-risk');
  const tableKdigoFreq = document.getElementById('kdigo-table-freq');
  const tableKdigoRisk = document.getElementById('kdigo-table-risk');

  if (btnKdigoFreq && btnKdigoRisk) {
    btnKdigoFreq.addEventListener('click', () => {
      btnKdigoFreq.classList.add('active');
      btnKdigoRisk.classList.remove('active');
      tableKdigoFreq.style.display = 'table';
      tableKdigoRisk.style.display = 'none';
    });

    btnKdigoRisk.addEventListener('click', () => {
      btnKdigoRisk.classList.add('active');
      btnKdigoFreq.classList.remove('active');
      tableKdigoRisk.style.display = 'table';
      tableKdigoFreq.style.display = 'none';
    });
  }

  function calculateKdigo() {
    if (!egfrInput || !uacrInput) return;
    const egfr = parseFloat(egfrInput.value);
    const uacr = parseFloat(uacrInput.value);

    if (isNaN(egfr) || isNaN(uacr) || egfr <= 0 || uacr < 0) {
      alert('請輸入有效的 eGFR 與 UACR 數值。');
      return;
    }

    // --- A. 判定表格 A (臨床頻率) 對應位置 ---
    let egfrStageA = '';
    if (egfr >= 90) egfrStageA = 'G1';
    else if (egfr >= 60) egfrStageA = 'G2';
    else if (egfr >= 45) egfrStageA = 'G3a';
    else if (egfr >= 30) egfrStageA = 'G3b';
    else if (egfr >= 15) egfrStageA = 'G4';
    else egfrStageA = 'G5';

    let uacrStageA = '';
    if (uacr < 30) uacrStageA = 'A1';
    else if (uacr <= 300) uacrStageA = 'A2';
    else uacrStageA = 'A3';

    // --- B. 判定表格 B (相對風險) 對應位置 ---
    let egfrStageB = '';
    if (egfr >= 105) egfrStageB = 'G1a';
    else if (egfr >= 90) egfrStageB = 'G1b';
    else if (egfr >= 60) egfrStageB = 'G2';
    else if (egfr >= 45) egfrStageB = 'G3a';
    else if (egfr >= 30) egfrStageB = 'G3b';
    else egfrStageB = 'G4'; // 圖片中僅列到 15-29 (G4)

    let uacrStageB = '';
    if (uacr < 10) uacrStageB = 'R1';
    else if (uacr < 30) uacrStageB = 'R2';
    else if (uacr <= 300) uacrStageB = 'R3';
    else if (uacr <= 1000) uacrStageB = 'R4';
    else uacrStageB = 'R5';

    // 清除高亮
    kdigoCells.forEach(cell => {
      cell.classList.remove('highlight-cell');
    });

    // 取得兩張表格各自對應的格子
    const targetCellIdA = `cell-${egfrStageA.toLowerCase()}-${uacrStageA.toLowerCase()}`;
    const targetCellIdB = `cell-${egfrStageB.toLowerCase()}-${uacrStageB.toLowerCase()}`;
    
    const targetCellA = document.getElementById(targetCellIdA);
    const targetCellB = document.getElementById(targetCellIdB);

    if (targetCellA) targetCellA.classList.add('highlight-cell');
    if (targetCellB) targetCellB.classList.add('highlight-cell');

    // 以表格 A 的格子類型為基礎輸出臨床衛教建議
    if (targetCellA) {
      // 網頁滾動優化
      if (window.innerWidth < 900) {
        const activeTable = tableKdigoRisk && tableKdigoRisk.style.display === 'table' ? targetCellB : targetCellA;
        if (activeTable) activeTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      let riskLevelText = '';
      let adviceText = '';
      let frequencyText = '';
      let accentColor = '';

      if (targetCellA.classList.contains('risk-low')) {
        riskLevelText = '🟢 低風險 (Low Risk)';
        adviceText = '您的腎臟過濾功能與尿蛋白水準均在正常範圍。請繼續保持良好的血糖與血壓控制。';
        frequencyText = '每年至少 1 次';
        accentColor = 'var(--success-color)';
      } else if (targetCellA.classList.contains('risk-mod')) {
        riskLevelText = '🟡 中度風險 (Moderately Increased Risk)';
        adviceText = '您的指標已出現早期腎病變跡象（如微量白蛋白尿）。請注意排查是否有高血壓，並檢視目前的降血糖藥物。';
        frequencyText = '每年至少 1 次';
        accentColor = 'var(--warning-color)';
      } else if (targetCellA.classList.contains('risk-high')) {
        riskLevelText = '🟠 高風險 (High Risk)';
        adviceText = '您的腎臟功能已有明顯衰退或尿蛋白顯著增加。需要積極介入治療，使用護腎藥物，並嚴格控制血壓與血脂。';
        frequencyText = '每年至少 2 次';
        accentColor = 'var(--risk-high-text)';
      } else if (targetCellA.classList.contains('risk-vhigh')) {
        riskLevelText = '🔴 極高風險 (Very High Risk)';
        adviceText = '您的腎臟功能嚴重受損或尿蛋白極高。請配合腎臟專科醫師共同照護，積極防範尿毒症與心血管病變。';
        frequencyText = '每年至少 3 至 4 次以上';
        accentColor = 'var(--danger-color)';
      }

      // 取得相對風險的倍數資訊來強化顯示
      let extraRiskInfo = '';
      if (targetCellB) {
        const riskVal = targetCellB.querySelector('.freq-label').textContent;
        extraRiskInfo = `，此狀態下的<strong>末期腎病風險高達原基準值的 ${riskVal}</strong>。`;
      }

      // 更新結果卡片顯示
      if (resultRiskLevel) {
        resultRiskLevel.textContent = `評估結果：${riskLevelText}`;
        resultRiskLevel.style.color = accentColor;
      }
      if (resultDesc) resultDesc.innerHTML = `${adviceText}${extraRiskInfo}`;
      if (resultFrequency) resultFrequency.innerHTML = `📅 建議監測頻率：<strong>${frequencyText}</strong>`;
      if (resultPanel) {
        resultPanel.style.borderLeftColor = accentColor;
        resultPanel.style.display = 'block';
      }
    }
  }

  // 綁定計算按鈕與輸入框即時觸發
  if (calcBtn) calcBtn.addEventListener('click', calculateKdigo);
  if (egfrInput) egfrInput.addEventListener('input', calculateKdigo);
  if (uacrInput) uacrInput.addEventListener('input', calculateKdigo);

  // 表格格子點擊反向更新
  kdigoCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const egfrStage = cell.getAttribute('data-egfr');
      const uacrStage = cell.getAttribute('data-uacr');
      
      // 表格 A 的點擊映射
      if (egfrStage === 'G1') egfrInput.value = 100;
      else if (egfrStage === 'G2') egfrInput.value = 75;
      else if (egfrStage === 'G3a') egfrInput.value = 52;
      else if (egfrStage === 'G3b') egfrInput.value = 37;
      else if (egfrStage === 'G4') egfrInput.value = 22;
      else if (egfrStage === 'G5') egfrInput.value = 10;

      if (uacrStage === 'A1') uacrInput.value = 15;
      else if (uacrStage === 'A2') uacrInput.value = 150;
      else if (uacrStage === 'A3') uacrInput.value = 450;

      // 表格 B 的點擊映射
      if (egfrStage === 'G1a') egfrInput.value = 110;
      else if (egfrStage === 'G1b') egfrInput.value = 95;

      if (uacrStage === 'R1') uacrInput.value = 5;
      else if (uacrStage === 'R2') uacrInput.value = 20;
      else if (uacrStage === 'R3') uacrInput.value = 150;
      else if (uacrStage === 'R4') uacrInput.value = 650;
      else if (uacrStage === 'R5') uacrInput.value = 1200;

      calculateKdigo();
    });
  });

  // 初始化 KDIGO 計算
  calculateKdigo();
  
  // 預設切換至腦血管病變
  switchComplication('brain');
});
