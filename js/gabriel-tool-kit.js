/* 工具方法，主要作用于 live2d 娘的菜单功能注入 */

if (!window.gabrielToolKit) {
    const tk = {};
    window.gabrielToolKit = tk;

    function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * 切换白天/夜间模式
     */
    tk.toggleTheme = () => {
        const DARK_THEME = 'dark';
        const LIGHT_THEME = 'light';

        const currentTheme = document.documentElement.dataset.theme;
        const dark = (DARK_THEME === currentTheme);
        const newTheme = dark ? LIGHT_THEME : DARK_THEME;
        document.documentElement.setAttribute('data-theme', newTheme);

        return dark ? '晨光熹微，切换日光模式 ☀️' : '夜幕降临，星光模式启动 ✨';
    }

    /**
     * 切换侧边栏显示/隐藏
     */
    tk.toggleAside = () => {
        const isHidden = document.documentElement.classList.toggle('hide-aside');

        const messages = isHidden ? [
            '嘘~侧廊的小精灵要睡觉了zzz',
            '暂时收起知识的画卷啦',
            '让树洞休息一会儿吧'
        ] : [
            '智慧之树的新枝丫展开啦~',
            '旅行者想看看哪本书呢？',
            '知识回廊已准备就绪✦'
        ];
        return randomItem(messages);
    }

    /**
     * 回到顶部
     */
    tk.goUp = () => {
        // 找到右侧的箭头按钮，点击
        const elem = document.getElementById('go-up')?.click();

        const messages = [
            '草元素电梯启动~咻！',
            '让风带我们回到起点吧',
            '在提瓦特，这叫「四叶印快速移动」哦'
        ];
        return randomItem(messages);
    }

    /**
     * 随机播放音乐
     */
    tk.randomPlayMusic = () => {
        // 获取所有歌曲列表项
        const songs = document.querySelectorAll('.aplayer-list li');
        // 随机歌曲
        const song = randomItem(songs);
        let title = 'Unknown';
        let author = 'Unknown';
        if (song) {
            // 触发点击事件
            song.click();
            // 歌曲信息提取
            title = song.querySelector('.aplayer-list-title')?.innerHTML;
            author = song.querySelector('.aplayer-list-author')?.innerHTML;
        }

        const info = `${title} - ${author}`;
        const messages = [
            `「${info}」的旋律从虚空传来~`,
            `让「${info}」为旅途伴奏吧`,
            `小草神为你选了这首「${info}」哦`,
            `(✧∇✧) 这首「${info}」最好听啦`
        ];
        return randomItem(messages);
    }

    /**
     * 暂停音乐
     */
    tk.pauseMusic = () => {
        document.querySelector('.aplayer-pause')?.click();

        const messages = [
            '音乐精灵睡着啦~zzZ',
            '嘘...让世界安静一会儿',
            '按下暂停键的瞬间，听见了蒲公英的声音',
            '纳西妲把音符都收进小口袋啦'
        ];
        return randomItem(messages);
    }
}