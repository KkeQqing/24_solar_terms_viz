// assets/js/charts/folk.js
// 功能：渲染【民俗信息卡】—— 显示节气民俗 + 南北地域差异

window.updateFolk = (raw) => {
  const container = document.getElementById('folk-chart');
  if (!container) return;

  // 获取主题文字颜色（适配深色/浅色）
  const tc = window.textColor ? window.textColor() : '#333';

  // 节气名
  const termName = raw.name;

  // 民俗活动列表（直接使用 raw.folk 数组）
  const folkList = raw.folk || [];

  // 地域差异描述（使用已有字段，若无则占位）
  const northDesc = raw.north || '北方物候特征暂无描述';
  const southDesc = raw.south || '南方物候特征暂无描述';

  // 构建信息卡片 HTML
  container.innerHTML = `
    <div style="
      padding: 20px 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: ${tc};
      font-family: 'Noto Sans SC', sans-serif;
      overflow-y: auto;
    ">
      <!-- 节气标题 -->
      <div style="
        font-size: 22px;
        font-weight: 900;
        text-align: center;
        margin-bottom: 16px;
        letter-spacing: 0.08em;
      ">
        ${termName}·民俗
      </div>

      <!-- 民俗活动列表 -->
      <div style="margin-bottom: 16px;">
        <div style="
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          color: ${raw.color};
        ">📜 主要民俗</div>
        <ul style="
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        ">
          ${folkList.map(f => `
            <li style="
              display: flex;
              align-items: baseline;
              gap: 8px;
              font-size: 14px;
              line-height: 1.6;
            ">
              <span style="color: ${raw.color}; font-size: 16px;">•</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- 南北地域差异 -->
      <div style="
        background: rgba(0,0,0,0.04);
        border-radius: 10px;
        padding: 12px;
        margin-top: auto;
      ">
        <div style="
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          color: ${raw.color};
        ">🗺️ 地域差异</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <span style="
              display: inline-block;
              background: #87CEEB;
              color: #fff;
              border-radius: 4px;
              padding: 1px 8px;
              font-size: 12px;
              font-weight: bold;
              flex-shrink: 0;
            ">北方</span>
            <span style="font-size: 13px; line-height: 1.5;">${northDesc}</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <span style="
              display: inline-block;
              background: #FFB6C1;
              color: #fff;
              border-radius: 4px;
              padding: 1px 8px;
              font-size: 12px;
              font-weight: bold;
              flex-shrink: 0;
            ">南方</span>
            <span style="font-size: 13px; line-height: 1.5;">${southDesc}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};