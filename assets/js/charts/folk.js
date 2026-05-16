// assets/js/charts/folk.js
// 功能：渲染【民俗信息卡】—— 显示节气民俗 + 南北地域差异

// assets/js/charts/folk.js
window.updateFolk = (raw) => {
  const container = document.getElementById('folk-chart');
  if (!container) return;

  const tc = window.textColor ? window.textColor() : '#333';
  const termName = raw.name || '未知节气';
  const color = raw.color || '#d6a928';
  const northDesc = raw.north || '北方物候特征暂无描述';
  const southDesc = raw.south || '南方物候特征暂无描述';
  const folkList = raw.folk || [];

  // 生成民俗项目 HTML（兼容字符串 / 对象）
  const folkItems = folkList.map(item => {
    // 如果是字符串（旧格式）
    if (typeof item === 'string') {
      return `
        <div style="padding: 10px 12px; background: rgba(0,0,0,0.03); border-radius: 8px; border-left: 3px solid ${color};">
          <div style="font-weight: 700; font-size: 15px; color: ${color}; margin-bottom: 4px;">${item}</div>
        </div>
      `;
    }
    // 对象格式（新格式）
    return `
      <div style="padding: 10px 12px; background: rgba(0,0,0,0.03); border-radius: 8px; border-left: 3px solid ${color};">
        <div style="font-weight: 700; font-size: 15px; color: ${color}; margin-bottom: 4px;">${item.name}</div>
        ${item.desc ? `<div style="font-size: 12px; line-height: 1.5; opacity: 0.8;">${item.desc}</div>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="padding: 16px 14px; height: 100%; display: flex; flex-direction: column; color: ${tc}; font-family: 'Noto Sans SC', sans-serif; overflow-y: auto;">
      <div style="font-size: 20px; font-weight: 900; text-align: center; margin-bottom: 14px; letter-spacing: 0.08em;">
        ${termName}·民俗
      </div>
      <div style="margin-bottom: 14px;">
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 10px; color: ${color};">📜 主要民俗</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${folkItems}
        </div>
      </div>
      <div style="background: rgba(0,0,0,0.04); border-radius: 10px; padding: 12px; margin-top: auto;">
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: ${color};">🗺️ 地域差异</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <span style="display: inline-block; background: #87CEEB; color: #fff; border-radius: 4px; padding: 1px 8px; font-size: 11px; font-weight: bold; flex-shrink: 0;">北方</span>
            <span style="font-size: 12px; line-height: 1.5;">${northDesc}</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <span style="display: inline-block; background: #FFB6C1; color: #fff; border-radius: 4px; padding: 1px 8px; font-size: 11px; font-weight: bold; flex-shrink: 0;">南方</span>
            <span style="font-size: 12px; line-height: 1.5;">${southDesc}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};