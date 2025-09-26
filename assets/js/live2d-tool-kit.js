/* 工具方法，作用于 live2d 人偶的菜单功能注入 */

if (!window.live2dToolKit) {
    const tk = {};
    window.live2dToolKit = tk;


    // --------------------------------------------- 辅助函数 ---------------------------------------------

    function randomIndex(length) {
        return Math.floor(Math.random() * length);
    }

    function randomItem(arr) {
        let idx = randomIndex(arr.length);
        return arr[idx];
    }

    function htmlIsPost() {
        let wrapBody = document.getElementById('body-wrap');
        return wrapBody && wrapBody.className === 'post'
    }


    // ---------------------------------------------- butterfly 功能区 ------------------------------------

    /**
     * 回到顶部
     */
    tk.goUp = () => {
        if (window.btf && typeof window.btf.scrollToDest === 'function') {
            window.btf.scrollToDest(0, 500);

            const successMessages = [
                '草元素电梯启动~咻！',
                '让风带我们回到起点吧',
                '在提瓦特，这叫「四叶印快速移动」哦',
            ];
            return randomItem(successMessages);
        }

        const failureMessages = [
            '唔…今天的风似乎吹不动呢。',
            '诶？通往高处的路径好像消失了。',
            '好像…找不到可以快速移动的四叶印呢。',
        ];
        return randomItem(failureMessages);
    }

    /**
     * 切换白天/夜间模式
     */
    tk.toggleTheme = () => {
        const DARK_THEME = 'dark';
        const LIGHT_THEME = 'light';

        const prevIsDark = (DARK_THEME === document.documentElement.dataset.theme);
        const newTheme = prevIsDark ? LIGHT_THEME : DARK_THEME;
        document.documentElement.setAttribute('data-theme', newTheme);

        const messages = prevIsDark ? [
            '看，知识的种子正在阳光下发芽呢 🌱',
            '让智慧的光芒，洒满世界的每个角落吧。',
            '白天的世界，也藏着不一样的答案哦。',
            '梦境散去，是时候迎接新的知识啦~',
        ] : [
            '月光为墨，星辰为笔，来记录今天的智慧吧 ✨',
            '晚安，旅行者。愿你在梦中与智慧相伴。',
            '嘘~ 让思绪在宁静的星空下沉淀…',
            '知识的树洞里，点亮了梦的灯火。',
        ];
        return randomItem(messages);
    }

    /**
     * 切换侧边栏显示/隐藏
     */
    tk.toggleAside = () => {
        const currIsHidden = document.documentElement.classList.toggle('hide-aside');

        const messages = currIsHidden ? [
            '世界的梦境，暂时只需要一个焦点就够了。',
            '让智慧之树的叶片暂时合上吧，月光会为它们镀上银边。',
            '有些秘密，要藏在看不见的地方才能发酵哦。',
            '断开冗余的连接，让思绪回归到主干上。',
        ] : [
            '智慧的宝库已为你敞开一角，想先从哪枚符文看起呢？',
            '看，知识之树又长出了新的枝条，上面挂满了答案的露珠。',
            '连接世界的梦境网络，新的通路已构建完成✦',
            '旁边的书架上，似乎有你感兴趣的故事呢。',
        ];
        return randomItem(messages);
    }

    /**
     * 将网页进行简繁体转换
     */
    tk.translatePage = () => {
        if (window.translateFn && typeof window.translateFn !== 'function') {
            window.translateFn.translatePage();

            const successMessages = [
                '看，同样的智慧，也可以用不同的符文来书写哦。',
                '文字换上了新装，你发现其中的奥秘了吗？',
                '换个角度看世界，说不定会有新的发现呢✦',
                '这些文字…好像在诉说着一段不一样的历史。',
                '知识的溪流，汇入了另一条分支呢。',
            ];
            return randomItem(successMessages);
        }

        const failureMessages = [
            '唔…解读这些古老符文的石板好像不见了。',
            '这些文字…好像暂时只能保持现在的模样呢。',
            '转换文字形态的力量，今天似乎在沉睡。'
        ];
        return randomItem(failureMessages);
    }

    /**
     * 阅读模式
     */
    tk.readMode = () => {
        const $body = document.body;
        // 判断当前页面，是否为 文章
        if (!htmlIsPost()) {
            const failureMessages = [
                '这里没有可以阅读的卷轴哦~',
                '知识的梦境只在故事之页展开呢。',
                '请先找到一扇知识之门吧✦',
            ];
            return randomItem(failureMessages);
        }
        // 已经是阅读模式
        if ($body.classList.contains('read-mode')) {
            const failureMessages = [
                '嘘~你已身在梦境之中啦。',
                '知识的卷轴早已为你展开✦',
                '好好享受这片刻的宁静吧。',
            ];
            return randomItem(failureMessages);
        }

        // 进入阅读模式
        $body.classList.add('read-mode');

        // 创建退出按钮
        const newEle = document.createElement('button');
        newEle.type = 'button';
        newEle.className = 'fas fa-sign-out-alt exit-readmode';
        const exitReadMode = () => {
            $body.classList.remove('read-mode');
            newEle.remove();
            newEle.removeEventListener('click', exitReadMode);
        }
        newEle.addEventListener('click', exitReadMode);
        $body.appendChild(newEle);

        const successMessages = [
            '✦静谧的阅读之梦，已为你开启✦',
            '已为你展开知识的画卷，静心阅读吧。',
            '欢迎来到知识的树洞，好好休息哦。',
        ];
        return randomItem(successMessages);
    }


    // ---------------------------------------------- aplayer 功能区 ------------------------------------

    // 播放器实例的缓存
    // 在使用了 PJAX 或 Turbolinks 等技术的 Hexo 博客中，页面切换时并不会完全重新加载，而是局部刷新
    // window.aplayers 这个由 APlayer.js 初始化的数组，可能会在页面切换后被清空或重新计算
    // 而播放器实例本身（如果你用的是全局播放器）其实并没有被销毁，还存在于内存中
    tk.aplayer = null;

    function getAPlayer() {
        // 1. 检查缓存是否存在且有效
        // aplayer.container.isConnected 可以判断播放器的DOM元素是否还挂载在页面上
        if (tk.aplayer && tk.aplayer.container && tk.aplayer.container.isConnected) {
            return tk.aplayer;
        }

        // 2. 如果缓存无效或不存在，则尝试从 window.aplayers 寻找新的实例
        if (Array.isArray(window.aplayers) && window.aplayers.length > 0) {
            // 找到第一个看起来正常的实例并缓存它
            const ap = window.aplayers[0];
            if (ap && typeof ap.play === 'function') {
                tk.aplayer = ap; // 写入缓存
                return tk.aplayer;
            }
        }

        // 3. 如果两种方式都找不到，则返回 null
        tk.aplayer = null; // 清理可能存在的无效缓存
        return null;
    }

    // OhMyLive2D 实例的缓存
    tk.oml2d = null;

    function getOml2d() {
        // 1. 检查缓存是否存在且有效
        // oml2d.stage.el.isConnected 可以判断模型的舞台元素是否还挂载在页面上
        if (tk.oml2d && tk.oml2d.stage && tk.oml2d.stage.el && tk.oml2d.stage.el.isConnected) {
            return tk.oml2d;
        }

        // 2. 如果缓存无效或不存在，则尝试从 window 寻找新的实例
        // 通过检查 oml2d 对象和其核心方法 tipsMessage 是否存在，来判断实例是否可用
        if (oml2d && typeof oml2d.tipsMessage === 'function') {
            tk.oml2d = oml2d; // 写入缓存
            return tk.oml2d;
        }

        // 3. 如果两种方式都找不到，则返回 null
        tk.oml2d = null; // 清理可能存在的无效缓存
        return null;
    }

    /**
     * 随机播放音乐
     */
    tk.playRandomMusic = () => {
        // 1. 获取 aplayer 实例
        const ap = getAPlayer();
        if (!ap) {
            return '歌声的精灵好像还没抵达，再呼唤一下试试看？';
        }

        // 2. 从实例的歌曲列表中检查歌曲数量
        let list = ap.list;
        let audios = null;
        if (!list || !(audios = list.audios) || audios.length === 0) {
            const failureMessages = [
                '诶？知识的树洞里现在很安静呢…',
                '唔…今天的歌单好像藏起来了。',
                '旋律还在梦境里飘荡，暂时无法捕捉到呢。',
                '好像…播放列表里还没有可以分享的歌曲哦。',
            ];
            return randomItem(failureMessages);
        }

        // 3. 生成随机索引并切换歌曲
        const songIdx = randomIndex(audios.length);
        // 使用 API 切换到随机歌曲并播放
        list.switch(songIdx);
        ap.play();

        // 4. 从歌曲对象中提取信息
        const songObject = audios[songIdx];
        const title = songObject.name;
        const author = songObject.artist;
        const info = `${title} - ${author}`;

        // 5. 返回随机消息
        const successMessages = [
            `「${info}」的旋律从虚空传来~`,
            `让「${info}」为旅途伴奏吧`,
            `小草神为你选了这首「${info}」哦`,
            `(✧∇✧) 这首「${info}」最好听啦`
        ];
        return randomItem(successMessages);
    }

    /**
     * 暂停音乐
     */
    tk.pauseMusic = () => {
        // 1. 获取 aplayer 实例
        const ap = getAPlayer();
        if (!ap) {
            return '歌声的精灵好像还没抵达，再呼唤一下试试看？';
        }
        // ✨ 新增：判断如果播放器当前是暂停状态，则直接继续播放
        if (ap.audio && ap.audio.paused) {
            ap.play();
            // 获取当前歌曲信息并返回提示
            const currentSong = ap.list.audios[ap.list.index];
            const info = `${currentSong.name} - ${currentSong.artist}`;
            const resumeMessages = [
                `继续为你播放：「${info}」`,
                `让暂停的乐章继续为你奏响：「${info}」`,
                `旋律继续~ 正在播放「${info}」`
            ];
            return randomItem(resumeMessages);
        }
        // 2. 调用 API 停止播放
        ap.pause();
        // 3. 返回随机消息
        const successMessages = [
            '音乐精灵睡着啦~zzZ',
            '嘘...让世界安静一会儿',
            '按下暂停键的瞬间，听见了蒲公英的声音',
            '纳西妲把音符都收进小口袋啦',
        ];
        return randomItem(successMessages);
    }


    // 将所有相关的歌词同步状态都聚合到一个对象中，方便管理
    const lyricSyncState = {
        observer: null,
        lastLyric: '',
        isConnecting: false // 防止用户在连接过程中重复点击
    };

    // 创建一个返回 Promise 的函数来等待依赖加载
    function waitForAPlayerAndOML2D(timeout = 30000) {
        return new Promise((resolve, reject) => {
            let intervalId = null;

            const timeoutId = setTimeout(() => {
                clearInterval(intervalId);
                reject('唔…与梦境和旋律的连接好像中断了，它们藏到更深的地方去了。');
            }, timeout);

            intervalId = setInterval(() => {
                const ap = getAPlayer();
                const oml2d = getOml2d();
                if (ap && oml2d) {
                    clearTimeout(timeoutId);
                    clearInterval(intervalId);
                    resolve({ap, oml2d}); // 成功时，返回两个实例
                }
            }, 500);
        });
    }

    /**
     * 开启歌词同步
     */
    tk.linkAPlayerToLive2D = () => {
        // 防止重复绑定
        if (lyricSyncState.observer) {
            const messages = [
                '旋律与梦境的连接很稳定，无需重复施法哦。',
                '嘘~ 我们已经在聆听这首歌的心跳了。',
                '虚空终端早已同步了这段旋律，静静欣赏吧。',
            ];
            return randomItem(messages);
        }
        // 防止在连接过程中重复点击
        if (lyricSyncState.isConnecting) {
            return '正在努力连接中，请稍等哦~';
        }
        lyricSyncState.isConnecting = true;

        // 使用 Promise 来处理异步等待
        waitForAPlayerAndOML2D()
            .then(({ap, oml2d}) => {
                const observer = () => {
                    // APlayer 当前高亮歌词的 class 是 .aplayer-lrc-current
                    const currentLrcElement = document.querySelector('.aplayer-lrc-current');
                    if (currentLrcElement) {
                        // 当前歌词
                        const currentLyricText = currentLrcElement.innerText + ' ~';
                        // 核心逻辑：只有当歌词文本发生变化时，才触发
                        if (currentLyricText && currentLyricText !== lyricSyncState.lastLyric) {
                            lyricSyncState.lastLyric = currentLyricText;       // 更新“上一句歌词”
                            oml2d.tipsMessage(currentLyricText, 4000, 2);
                        }
                    }
                }
                // 监听 aplayer 的 timeupdate 事件
                ap.on('timeupdate', observer);
                // 缓存 observer 用于解绑
                lyricSyncState.observer = observer;

                const successMessages = [
                    '连接成功！现在，歌词也会在梦境中显现了✦',
                    '虚空已同步旋律，歌中的每个字句都不会错过了。',
                    '我听到啦，这就是这首歌想说的话语。',
                ];
                oml2d.tipsMessage(randomItem(successMessages), 3000, 4);
            })
            .catch(err => {
                const oml2d = getOml2d();
                if (oml2d) {
                    oml2d.tipsMessage(err, 3000, 4);
                } else {
                    console.error(err);
                }
            })
            .finally(() => {
                lyricSyncState.isConnecting = false;
            });

        const attemptMessages = [
            '正在编织旋律与梦境的丝线，请稍等片刻…',
            '请稍候，我正在读取这首歌的记忆。',
            '风正在捎来歌词的低语，侧耳倾听…',
        ];
        return randomItem(attemptMessages);
    }

    /**
     * 关闭歌词同步功能
     */
    tk.unlinkAPlayerToLive2D = () => {
        const ap = getAPlayer();
        if (ap && lyricSyncState.observer) {
            // 从 aplayer 实例上移除事件监听
            // 检查 timeupdate 事件的监听器数组是否存在
            if (Array.isArray(ap.events.events.timeupdate)) {
                // 使用 filter 创建一个新数组，其中不包含我们要移除的 observer 函数
                ap.events.events.timeupdate = ap.events.events.timeupdate.filter(
                    fn => fn !== lyricSyncState.observer
                );
            }

            // 重置状态
            lyricSyncState.observer = null;
            lyricSyncState.lastLyric = '';
            lyricSyncState.isConnecting = false;

            const successMessages = [
                '好的，旋律与梦境的丝线已经轻轻解开。',
                '歌声回归歌声，梦境回归梦境，一切归于宁静。',
                '已从虚空终端断开旋律同步。',
            ];
            return randomItem(successMessages);
        }

        const failureMessages = [
            '诶？我们之间…好像本来就没有连接这条丝线呢。',
            '旋律一直都很安静地在自己歌唱，无需再让它停下哦。',
            '唔…虚空终端里，本来就没有在同步这段旋律呀。',
        ];
        return randomItem(failureMessages);
    }
}

window.live2dToolKit.linkAPlayerToLive2D();