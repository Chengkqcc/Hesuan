const MIN_VOICE_TIME = 1, MAX_VOICE_TIME = 60, START_TIME_DOWN = 54, status = {
    START: 1,
    SUCCESS: 2,
    CANCEL: 3,
    SHORT: 4,
    FAIL: 5,
    UNAUTH: 6
}, EVENT = {
    EXTRA_CLICK: 'extraClickEvent',
    EXTRA_ITEM_CLICK: 'extraItemClickEvent',
    VOICE_RECORD: 'voiceRecordEvent',
    SEND_MESSAGE: 'sendMessageEvent'
};
Component({
    properties: {
        minVoiceTime: {
            type: Number,
            value: MIN_VOICE_TIME
        },
        maxVoiceTime: {
            type: Number,
            value: MAX_VOICE_TIME
        },
        startTimeDown: {
            type: Number,
            value: START_TIME_DOWN,
        },
        tabBarHeight: {
            type: Number,
            value: 0
        },
        format: {
            type: String,
            value: 'mp3'
        },
        extraArray: {
            type: Array,
            value: []
        }
    },
    data: {
        windowHeight: 0,
        windowWidth: 0,
        cancelLineYPosition: 0,
        _startTimeDown: START_TIME_DOWN,
        timer: -1,
        singleVoiceTimeCount: 0,
        textMessage: '',
        voiceObj: {moveToCancel: false},
        extraObj: {
            chatInputShowExtra: false,
            chatInputExtraArr: []
        },
        inputStatus: 'text',
        inputValueEventTemp: ''
    },
    observers: {
        'extraArray'(value) {
            this.setData({
                'extraObj.chatInputExtraArr': value || []
            })
        },
        'startTimeDown'(startTimeDown) {
            const data = this.data;
            data._startTimeDown = startTimeDown && startTimeDown < data.maxVoiceTime && startTimeDown > 0 ? startTimeDown : START_TIME_DOWN;
        }
    },
    methods: {
        getRecordStatus() {
            return {...status};
        },
        closeExtraView() {
            this.setData({
                'extraObj.chatInputShowExtra': false
            });
        },
        _chatInput$extra$click$event() {
            const isShow = !this.data.extraObj.chatInputShowExtra;
            this.setData({
                'extraObj.chatInputShowExtra': isShow
            }, () => {
                this.triggerEvent(EVENT.EXTRA_CLICK, {isShow}, {});
            });
        },
        _change$input$way$event() {
            this.setData({
                'inputStatus': this.data.inputStatus === 'text' ? 'voice' : 'text',
                'extraObj.chatInputShowExtra': false
            });
        },
        _triggerVoiceRecordEvent({status, dataset}) {
            this.triggerEvent(EVENT.VOICE_RECORD, {recordStatus: status, ...dataset}, {});
        },
        _long$click$voice$btn(e) {
            if ('send$voice$btn' === e.currentTarget.id) {//????????????????????????????????????????????????
                this._checkRecordAuth(() => {
                    const {maxVoiceTime, singleVoiceTimeCount} = this.data;
                    this.setData({//??????????????????
                        'voiceObj.showCancelSendVoicePart': true,
                        'voiceObj.timeDownNum': maxVoiceTime - singleVoiceTimeCount,
                        'voiceObj.status': 'start',
                        'voiceObj.startStatus': 1,
                        'voiceObj.moveToCancel': false
                    }, () => {
                        this._triggerVoiceRecordEvent({status: status.START});
                    });
                    this.recorderManager.start({duration: 60000, format: this.data.format, numberOfChannels: 2, sampleRate:8000, encodeBitRate: 16000});
                }, (res) => {
                    //????????????
                    console.error('??????????????????');
                    clearInterval(timer);
                    this._endRecord();
                    this.setData({
                        'voiceObj.status': 'end',
                        'voiceObj.showCancelSendVoicePart': false
                    });
                    this._triggerVoiceRecordEvent({status: status.UNAUTH});

                    wx.showModal({
                        title: '????????????????????????',
                        content: '????????????????????????',
                        confirmText: '?????????',
                        success: res => {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: res => {
                                        if (res.authSetting['scope.record']) {
                                            this.setData({
                                                'extraObj.chatInputShowExtra': false
                                            });
                                        }
                                    }
                                });
                            } else {
                                this.setData({
                                    'inputStatus': 'text',
                                    'extraObj.chatInputShowExtra': false
                                });
                            }
                        }
                    });
                });
            }
        },
        _dealVoiceLongClickEventWithHighVersion() {
            this.recorderManager.onStart(() => {
                this.data.singleVoiceTimeCount = 0;
                const {_startTimeDown, maxVoiceTime} = this.data;
                //?????????????????????60???
                this.data.timer = setInterval(() => {
                    const voiceTimeCount = ++this.data.singleVoiceTimeCount;
                    if (voiceTimeCount >= _startTimeDown && voiceTimeCount < maxVoiceTime) {
                        this.setData({
                            'voiceObj.timeDownNum': maxVoiceTime - voiceTimeCount,
                            'voiceObj.status': 'timeDown'
                        })
                    } else if (voiceTimeCount >= maxVoiceTime) {
                        this.setData({
                            'voiceObj.status': 'timeout'
                        });
                        this._delayDismissCancelView();
                        clearInterval(this.data.timer);
                        this._endRecord();
                    }
                }, 1000);
            })
        },
        _send$voice$move$event(e) {
            if ('send$voice$btn' === e.currentTarget.id) {
                const {windowHeight, voiceObj, tabBarHeight, cancelLineYPosition} = this.data,
                    y = windowHeight + tabBarHeight - e.touches[0].clientY;
                if (y > cancelLineYPosition) {
                    if (!voiceObj.moveToCancel) {
                        this.setData({
                            'voiceObj.moveToCancel': true
                        });
                    }
                } else {
                    if (voiceObj.moveToCancel) {//????????????????????????
                        this.setData({
                            'voiceObj.moveToCancel': false
                        })
                    }
                }

            }
        },
        _send$voice$move$end$event(e) {
            if ('send$voice$btn' === e.currentTarget.id) {
                const {singleVoiceTimeCount, minVoiceTime, timer} = this.data;
                if (singleVoiceTimeCount < minVoiceTime) {//??????????????????
                    this.setData({
                        'voiceObj.status': 'short'
                    });
                    this._delayDismissCancelView();
                } else {//??????????????????
                    this.setData({
                        'voiceObj.showCancelSendVoicePart': false,
                        'voiceObj.status': 'end'
                    });
                }
                clearInterval(timer);
                this._endRecord();
            }
        },
        _initVoiceData() {
            const {windowWidth, windowHeight} = this.data, width = windowWidth / 2.6;
            this.setData({
                'inputStatus': 'text',
                'windowHeight': windowHeight,
                'windowWidth': windowWidth,
                'voiceObj.status': 'end',
                'voiceObj.startStatus': 0,
                'voiceObj.voicePartWidth': width,
                'voiceObj.moveToCancel': false,
                'voiceObj.voicePartPositionToBottom': (windowHeight - width / 2.4) / 2,
                'voiceObj.voicePartPositionToLeft': (windowWidth - width) / 2
            });
        },
        _delayDismissCancelView() {
            setTimeout(() => {
                if (this.data.voiceObj.status !== 'start') {
                    this.setData({
                        'voiceObj.showCancelSendVoicePart': false,
                        'voiceObj.status': 'end'
                    });
                }
            }, 1000);
        },

        _endRecord() {
            this.setData({
                'voiceObj.startStatus': 0
            }, () => {
                this.recorderManager.stop();
            });
        },
        _chatInput$bind$focus$event() {
            this.setData({
                'inputType': 'text'
            })
        },
        _chatInput$send$text$message(e) {
            this.setData({
                textMessage: ''
            }, () => {
                this.triggerEvent(EVENT.SEND_MESSAGE, {value: e.detail.value});
                this.data.inputValueEventTemp = '';
            });
        },
        _chatInput$bind$blur$event() {
            setTimeout(() => {
                let obj = {};
                if (!this.data.inputValueEventTemp) {
                    this.data.inputValueEventTemp = '';
                    obj['inputType'] = 'none';
                }
                obj['extraObj.chatInputShowExtra'] = false;
                this.setData(obj);
            });
        },
        _chatInput$send$text$message02() {
            this.setData({
                textMessage: '',
                'inputType': 'none'
            }, () => {
                if (!!this.data.inputValueEventTemp) {
                    this.triggerEvent(EVENT.SEND_MESSAGE, {value: this.data.inputValueEventTemp});
                    this.data.inputValueEventTemp = '';
                }
            });
        },
        _chatInput$getValue$event(e) {
            const {detail: {value: textMessage}} = e;
            this.data.inputValueEventTemp = textMessage;
            this.setData({
                textMessage
            })
        },
        _chatInput$extra$item$click$event(e) {
            const {currentTarget: {dataset}} = e;
            this.triggerEvent(EVENT.EXTRA_ITEM_CLICK, {...dataset}, {});
        },

        _setVoiceListener() {
            this.recorderManager.onStop((res) => {
                console.log(res, this.data.voiceObj.status);
                if (this.data.voiceObj.status === 'short') {//????????????????????????????????????????????????????????? ???????????????
                    this._triggerVoiceRecordEvent({status: status.SHORT});
                    return;
                } else if (this.data.voiceObj.moveToCancel) {
                    this._triggerVoiceRecordEvent({status: status.CANCEL});
                    return;
                }
                console.log('????????????');
                this._triggerVoiceRecordEvent({status: status.SUCCESS, dataset: res});
            });
            this.recorderManager.onError((res) => {
                this._triggerVoiceRecordEvent({status: status.FAIL, dataset: res});
            });
        },

        _checkRecordAuth(cbOk, cbError) {
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.record']) {
                        wx.authorize({
                            scope: 'scope.record',
                            success: (res) => {
                                // ???????????????????????????????????????????????????????????? wx.startRecord ????????????????????????
                                console.log('??????', res);
                            }, fail: res => {
                                console.log('??????', res);
                                cbError && cbError();
                            }
                        })
                    } else {
                        cbOk && cbOk();
                    }
                }
            })
        }
    },
    lifetimes: {
        created() {
            this.recorderManager = wx.getRecorderManager();
            const {windowHeight, windowWidth} = wx.getSystemInfoSync();
            if (!windowHeight || !windowWidth) {
                console.error('???????????????????????????????????????windowWidth', windowWidth, 'windowHeight', windowHeight);
                return;
            }
            this.data.windowHeight = windowHeight;
            this.data.windowWidth = windowWidth;
            this.data.cancelLineYPosition = windowHeight * 0.12;
            this._dealVoiceLongClickEventWithHighVersion();
            this._setVoiceListener();
        },
        attached() {
            this._initVoiceData();
        },
        detached() {
            clearInterval(this.data.timer);
        }
    }
});

// module.exports = {
//     clickExtraListener: clickExtraItemListener,
//     closeExtraView: closeExtraView,
//     recordVoiceListener: sendVoiceListener,
//     setVoiceRecordStatusListener: setVoiceRecordStatusListener,
//     setTextMessageListener: setTextMessageListener,
//     setExtraButtonClickListener: setExtraButtonClickListener,
//     VRStatus: status
// };
