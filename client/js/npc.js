define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
            "你好",
            "你就是我们所寻找的那个人",
            "来吧年轻人，和我来吧..."
        ],

        "king": [
            "我就是这里的王",
            "这里是我的领土",
            "看见我的皇冠了",
            "哈哈，我就这里的王！"
        ],

        "villagegirl": [
            "欢迎 勇士的到来!",

        ],

        "villager": [
            "少年，你喜欢诗歌吗?",
            "枯藤老树昏鸦，",
            "小桥流水人家，",
            "古道西风瘦马。",
            "夕阳西下，",
            "断肠人在天涯。 ",
            "冒险去吧 少年～"
        ],

        "agent": [
            "想折弯一把剑？",
            "这是不可能的。",
            "哈哈 但是你发现事实了吗？",
            "根本就没有剑"
        ],

        "rick": [
            "你是我天边最美的云彩",
            "让我用心把你留下来",
            "悠悠的唱着最炫的民族风",
            "让爱卷走所有的尘埃~",
            "让爱卷走所有的尘埃~~",
            "让爱卷走所有的尘埃~~~",
            "让爱卷走所有的尘埃~~~~",
            "让爱卷走所有的尘埃~~~~~~"
        ],

        "scientist": [{
                "text": [ //default
                    "你好.",
                    "我是个发明家，发明了两种药水",
                    "红药水可以恢复你的体力...",
                    "黄色药水能让你变成无敌状态...",
                    "但是只能维持一小会.",
                    "还好利用他们吧!"
                ]
            }, {
                "condition": function(game) {
                    return (game.player.invincible);
                },
                "text": [
                    "你忘记我说什么了吗?!!",
                    "黄色药水效果只能维持一会",
                    "赶快去做点有意义的事情吧~"
                ]
            }, {
                "condition": function(game) {
                    return ((game.player.getSpriteName() == "firefox") && !(game.player.invincible));
                },
                "text": [
                    "Ha ha ha, *name*",
                    "并不是所有的星星都会闪耀…",
                    "-哎-",
                    "你觉得你能逃过我法眼吗?",
                    "即使你换了马甲，我也知道是你",
                    "野外的那些怪物也会发现你，小心啊 年轻人。"
                ]
            }

        ],

        "nyan": [
            "啦 啦 啦 啦 啦",
            "啦 啦 啦 啦 啦 啦 啦 啦 啦 啦",
            "啦 啦 啦 啦 啦",
            "啦 啦 啦 啦 啦"
        ],

        "beachnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "forestnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "desertnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "lavanpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "priest": [
            "年轻人，你好",
            "智慧能战胜一切, 所以我有些话要告诉你.",
            "在这个世界里面, 你能去任何地方",
            "但是要小心那些躲在暗处的敌人.",
            "同样消灭那些敌人你能得到更好的武器.",
            "越强的敌人, 掉落的宝物会越高级.",
            "作为勇者你不断的冒险就会完成各种各样的成就",
            "点击右下方的奖杯，看看有多少成就需要你完成.",
            "去世界的深处去探寻和冒险吧",
            "再见了，年轻人"
        ],

        "sorcerer": [
            "恩... 我已经预见到你会来找的",
            "我的新道具如何",
            "很酷吧",
            "哪里能够搞到？",
            "看到这么好的东西,谁都会眼红的.",
            "其实这个是我自己造的，牛吧",
            "但是我也告诉你...",
            "在这个世界里面.",
            "有很多的道具.",
            "不断的探索是发现他们的唯一途径.",
            "祝你好运年轻人"
        ],

        "octocat": [
            "欢迎来到勇者的世界!",
            "想看看世界的背后吗?",
            "哈哈哈~ 这些只有码农能知道~"
        ],

        "coder": [
            "我在写代码 写代码 写代码...",
            "我是一个苦逼码农..."
        ],

        "beachnpc": [
            "别打扰我，亲. 我正在休假呢",
            "但是那些螃蟹实在是太烦人了",
            "你能帮我干掉他们吗？"
        ],

        "desertnpc": [
            "进入山区的时候一定要小心啊...",
            "一个远古的圣兽就居住在里面.",
            "没人知道他长什么样子...",
            "...因为见过他的人都死了.",
            "孩子 现在回家还不晚."
        ],

        "othernpc": [
            "lorem ipsum",
            "lorem ipsum"
        ]
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            if (typeof NpcTalk[this.itemKind][0] === 'string') {
                this.discourse = -1;
                this.talkCount = NpcTalk[this.itemKind].length;
            } else {
                this.discourse = 0;
                this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
            }
            this.talkIndex = 0;
        },

        selectTalk: function(game) {
            var change = false;
            if (this.discourse != -1) {
                var found = false;
                for (var i = 1; !found && i < NpcTalk[this.itemKind].length; i++) {
                    if (NpcTalk[this.itemKind][i]["condition"](game)) {
                        if (this.discourse != i) {
                            change = true;
                            this.discourse = i;
                            this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
                        }
                        found = true;
                    }
                }
                if (!found) {
                    if (this.discourse != 0) {
                        change = true;
                        this.discourse = 0;
                        this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
                    }
                }
            }
            return change;
        },

        talk: function(game) {
            var msg = "";

            if (this.selectTalk(game) || (this.talkIndex > this.talkCount)) {
                this.talkIndex = 0;
            }
            if (this.talkIndex < this.talkCount) {
                if (this.discourse == -1) {
                    msg = NpcTalk[this.itemKind][this.talkIndex];
                } else {
                    msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
                }
            }
            this.talkIndex += 1;

            return msg.replace('*name*', game.player.name);
        }
    });

    return Npc;
});