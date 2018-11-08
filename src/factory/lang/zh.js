export default {
    commom: {
        tx: {
            confirmInfoTX: '交易详情',
            confirmInfoType: '交易类型',
            confirmInfoPayaddr: '付款地址',
            confirmInfoReceiveAddr: '收款地址',
            confirmInfoSendMoney: '转出金额',
            confirmInfoName: '代理人名称',
            confirmInfoFees: '矿工费用',
            dialogError: '错误',
            dialogConfirm: '确定',
            dialogTxID: '交易ID',
            dialogCopy: '复制',
            msg1: '不能为空',
            msg2: '长度不能超过32个字节',
            msg3: '正在注册...',
            msg4: '余额不足',
            msg5: '密码错误',
            msg6: '正在打包...',
            msg7: '正在发送...',
            msg8: '发送成功，等待入块',
            msg9: '已复制',
            msg10: '复制错误',
            selectAgent: '请选择代理人'
        },
        passDialog: {
            dialogTitle: '请输入钱包密码',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            updateButtonText: '更新'
        }
    },
    versionLog: [
        {
            version: '1.0.0',
            content: [
                '新增转账功能',
                '新增节点注册、投票功能',
                '新增中文、英文语言切换'
            ]
        },
        {
            version: '1.0.1',
            content: [
                '修改已知Bug'
            ]
        }
    ],
    create: {
        index: {
            createWallet: '创建钱包',
            importWallet: '导入钱包'
        },
        create: {
            navTitle: '创建钱包',
            walletName: '钱包名称',
            walletPassword: '钱包密码',
            reWalletPassword: '重复密码',
            checkbox1: '我已经仔细阅读并同意',
            checkbox2: '服务及隐私条款',
            createWallet: '创建钱包',
            msg: '请注意！闪电比特币钱包不存储用户密码，无法提供找回和重置功能，请用户务必保存好设置的密码！',
            termTitle: '服务条款及隐私政策',
            walletNameMsg: '钱包名称不能为空',
            walletPasswordMsg1: '密码不能为空',
            walletPasswordMsg2: '密码必须由6-21字母和数字组成',
            reWalletPasswordMsg: '两次密码不同',
            checkboxMsg: '请同意条款',
            sumMsg: '钱包上限5个，请删除以后再导入',
            createMsg: '正在创建钱包'
        },
        mnemonic: {
            navTitle: '备份助记词',
            title1: '抄写下你的钱包助记词',
            content1: '助记词用于恢复钱包或重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全地方！',
            title2: '确认你的钱包助记词',
            content2: '请按顺序点击助记词，以确认你的备份助记词正确。',
            button: '确 认',
            next: '下一步',
            dialogTitle: '请勿截图',
            dialogContent: '如果有人获取你的助记词将直接获取你的资产！请抄写下助记词并存放到安全的地方！',
            dialogButton: '知道了',
            msg1: '备份成功',
            msg2: '助记次错误'
        },
        packup: {
            navTitle: '备份钱包',
            title: '最后一步：立刻备份助记词',
            content: '备份钱包：导出「助记词」并抄写到安全的地方，千万不要保存到网络上。然后尝试转入、转出小额资产开始使用。',
            button1: '备份钱包',
            button2: '跳过备份（不推荐）',
            dialogTitle: '请输入钱包密码',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            msg1: '密码错误',
            msg2: '未知错误,请重新导入钱包'
        }
    },
    guide: '开始使用',
    import: {
        navTitle: '导入钱包',
        tabTitle1: '助记词',
        tabTitle2: '私钥',
        mnemTextarea: '请输入钱包助记词（12个英文单词），按空格分离...',
        prvTextarea: '请输入钱包私钥...',
        importMnem: '导入助记词',
        importPrv: '导入私钥',
        msg1: '非法助记词',
        msg2: '正在导入钱包',
        msg3: '正在同步数据',
        msg4: '非法私钥'
    },
    main: {
        tabName1: '钱包',
        tabName2: '资讯',
        tabName3: '我的',
        updataTitle: '提示',
        updataMessage: '版本太低，请更新',
        confirmButtonText: '更新',
        cancelButtonText: '取消',
        refresh: '下拉刷新',
        infinite: '加载更多',
        noMoreData: '没有更多数据',
        noData: '暂无数据'
    },
    mine: {
        about: {
            navTitle: '关于我们',
            currentVersion: '当前版本',
            about: '闪电钱包是一款专为闪电比特币（LBTC）打造的移动端轻钱包App，目前仅支持LBTC转账、节点投票功能，旨在为LBTC用户提供一款安全放心，简单好用的数字资产钱包应用。',
            term: '服务条款',
            log: '版本日志',
            checkVersion: '检测新版',
            popupNavTitle1: '服务条款及隐私政策',
            popupNavTitle2: '版本日志',
            checkVersionLoading: '获取中...',
            checkVersionMsg1: '已经为最新版本',
        },
        addrInfo: {
            navTitle: '地址详情',
            name: '名称',
            addr: '地址',
            addrPlaceholder: '收款人钱包地址',
            other: '备注',
            bottonContent1: '确认',
            bottonContent2: '修改',
            bottonContent3: '删除',
            msg1: '名称不能为空',
            msg2: '地址不能为空',
            msg3: '地址错误',
            msg4: '添加成功',
            msg5: '添加失败',
            msg6: '修改成功',
            msg7: '修改失败',
            msg8: '刪除成功',
            msg9: '刪除失败',
            dialogTitle: '提示',
            dialogContent: '确定要刪除此地址？'
        },
        addrs: {
            navTitle: '地址簿',
            msg1: '暂无地址，快去',
            msg2: '添加'
        },
        help: {
            navTitle: '帮助中心',
            items: [
                {
                    id: 1,
                    title: 'LBTC是什么？',
                    content: 'MyLBTC是一款全新的数字货币钱包，为用户提供一站式的存储、兑换和消费服务。MyLBTC暂时仅支持MyLBTC，后续将陆续支持更多数字货币。'
                },
                {
                    id: 2,
                    title: '如何创建钱包？',
                    content: '打开MyLBTC，在钱包起始页选择创建钱包，设置交易密码后，钱包即创建成功；用户需要根据提示备份好钱包助记词，拥有助记词即可完全控制钱包资产，MyLBTC不存储用户钱包助记词，丢失助记词即丢失钱包资产，请务必妥善保存。'
                },
                {
                    id: 3,
                    title: '如何导入钱包？',
                    content: '在MyLBTC钱包起始页，选择导入钱包，将备份的钱包助记词输入，验证成功后，设置交易密码，钱包导入成功，即可开始管理通过该助记词备份的数字资产。'
                },
                {
                    id: 4,
                    title: '如何备份钱包？',
                    content: '在创建钱包成功后，根据提示进入备份环节，将钱包助记词抄下来，保存到安全的地方；途径二：进入钱包后，通过我的-钱包管理-钱包备份功能，进入到备份环节，完成备份。'
                },
                {
                    id: 5,
                    title: '备份的钱包助记词丢失后能找回吗？',
                    content: 'MyLBTC不存储用户的钱包助记词，助记词只存储在用户手机上。如果备份的助记词丢失，可以通过MyLBTC的设置-钱包备份功能，重新备份；如果备份的助记词丢失且MyLBTC钱包APP被卸载，助记词将无法找回。请妥善保管！'
                },
                {
                    id: 6,
                    title: '如何进行转账/收款？',
                    content: '在MyLBTC钱包列表页面，点击转帐和收款，即可开始转账收款：选择转账，输入收款人地址和转账金额，验证交易密码后，即完成转账；选择收款，页面展示收款二维码，付款方可以扫描二维码完成转账，或者收款方点击二维码复制收款地址，分享发送给付款方。'
                },
                {
                    id: 7,
                    title: '如何修改密码？忘记密码怎么办？',
                    content: '通过我的-钱包管理-修改密码，验证原密码后，即可设置新密码。因为MyLBTC不存储用户密码，如果忘记密码，用户用备份的钱包助记词或者私钥再次进行钱包导入，再重新设置密码。如果忘记密码且丢失了钱包助记词，你将丢失钱包资产。'
                },
                {
                    id: 8,
                    title: 'MyLBTC收费吗？费率是多少？',
                    content: 'MyLBTC只会产生主网转账矿工费，不会产生额外费用。'
                },
                {
                    id: 9,
                    title:'如何删除钱包？',
                    content: '通过我的-钱包管理-选择钱包-删除钱包，验证钱包密码后，即可删除钱包。重要提示：MyLBTC不存储用户的钱包助记词，一旦删除钱包，用户只能通过自己备份的助记词(私钥)来重新导入钱包，找回资产。请谨慎保管钱包助记词！'
                }
            ]
        },
        index: {
            title1: '钱包管理',
            title2: '交易记录',
            title3: '地址簿',
            title4: '系统设置',
            title5: '帮助中心',
            title6: '关于我们'
        },
        manage: {
            navTitle: '钱包管理'
        },
        manageInfo: {
            navRight: '保存',
            availablebalance: '可用',
            unavailablebalance: '不可用',
            walletName: '钱包名称',
            changePass: '修改密码',
            exportPrv: '导出私钥',
            packupMnem: '备份助记词',
            deleWallet: '删除钱包',
            copy: '复制',
            popupNavTitle: '修改密码',
            oldPass: '旧密码',
            newPass: '新密码',
            reNewPass: '重复新密码',
            confirmChange: '确认修改',
            msg1: '保存成功',
            msg2: '删除成功',
            msg3: '密码错误',
            msg4: '已复制',
            msg5: '复制错误',
            msg6: '旧密码不能为空',
            msg7: '密码必须由6-21字母和数字组成',
            msg8: '两次密码不同',
            msg9: '旧密码输入错误',
            msg10: '不能与旧密码相同',
            msg11: '修改成功',
        },
        set: {
            navTitle: '系统设置',
            lang: '语言',
            langType: '中文'
        },
        terms: {

        },
        txHis: {
            navTitle: '交易记录',
            title: '最近交易记录',
            msg1: '无交易记录',
            msg2: '获取成功',
            msg3: '无更多数据'
        },
        txHisInfo: {
            navTitle: '交易详情',
            title1: '发款方',
            title2: '收款方',
            title3: '交易ID',
            title4: '区块',
            title5: '交易时间',
            title6: '复制URL',
            title7: '已复制',
            title8: '复制出错'
        }
    },
    vote: {
        index: {
            navTitle: 'LBTC节竞选',
            item1: '查看投票',
            item1Msg1: '被投',
            item1Msg2: '已投',
            item1Msg3: '不是代理人',
            item2: '注册为代理人',
            item3: '投票',
            item3Msg: '还可以投',
            item4: '撤销投票',
            toastMsg1: '已是代理人',
            toastMsg2: '无数据',
            toastMsg3: '无投票',
            votes: '票'
        },
        register: {
            navTitle: '注册为代理人',
            confirmInfoTxType: '代理人注册',
            addr: '地址',
            name: '代理人名称',
            balance: '余额',
            namePlaceholder: '请输入名称',
            warnMsg: '注册需要花费1LBTC',
            next: '下一步'
        },
        vote: {
            navTitle: '代理人列表',
            confirmInfoTxType: '节点投票',
            thead: {
                td1: '代理人名称',
                td2: '得票数'
            },
            search: '搜索',
            button1: '还可选',
            button2: '投票',
            noMoreThanTotal: '不能超过总数'
        },
        votecancel: {
            navTitle: '撤销投票',
            confirmInfoTxType: '节点投票',
            button1: '已选',
            button2: '撤销投票'
        },
        voters: {
            navTitle: '已投节点'
        },
        votes: {
            navTitle: '被投地址'
        }
    },
    wallet: {
        send: {
            navTitle: '转账',
            confirmInfoTxType: '转账',
            payAddr: '付款钱包',
            receiveAddr: '收款地址',
            receiveAddrPlaceholder: '请输入收款人钱包地址',
            payMoney: '转账金额',
            balance: '余额',
            moneyInputPlaceholder: '输入金额',
            next: '下一步',
            selectionAddr: '选择联系人',
            noAddrContent: '暂无联系人，请',
            noAddrAddAddr: '添加联系人' ,
            checkWarnMsg1: '地址不能为空',
            checkWarnMsg2: '地址错误',
            checkWarnMsg3: '无效金额',
            checkWarnMsg4: '金额超出余额',
            checkWarnMsg5: '金额太小',
            checkWarnMsg6: '不能超过8位小数',
        },
        index: {
            backup: '未备份',
            availablebalance: '可用',
            unavailablebalance: '不可用',
            tabName1: '转账',
            tabName2: '收款',
            tabName3: '投票',
            moreHisContent: '此处最多显示10条，点击',
            moreHisButton: '查看更多',
            walletListTitle: '我的钱包'
        },
        receive: {
            navTitle: 'LBTC收款',
            title: '收款地址',
            copyToClipboard: '复制到剪贴板',
            msg1: '已复制',
            msg2: '复制错误'
        }
    }
};