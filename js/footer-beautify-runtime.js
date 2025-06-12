// 建站时间
const siteStartTime = new Date("06/09/2025 20:00:00");

function createtime() {
    const now = new Date();
    const totalSeconds = (now - siteStartTime) / 1000;

    // 计算时间差
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // 格式化时间单位
    const formatUnit = (unit) => unit.toString().padStart(2, '0');

    // 单行紧凑显示
    const currentTimeHtml = `
        <span class="runtime-text">
        🌟 星轨编织 | 
            ${days} <small>天</small> 
            ${formatUnit(hours)} <small>时</small> 
            ${formatUnit(minutes)} <small>分</small> 
            ${formatUnit(seconds)} <small>秒</small> 
        ✨ 愿这段时光如诗！
        </span>
    `;

    const elem = document.getElementById("workboard");
    if (elem) {
        elem.innerHTML = currentTimeHtml;
    }
}

// 立即执行一次
createtime();
// 每250ms更新一次
setInterval(createtime, 250);