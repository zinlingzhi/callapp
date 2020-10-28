import moment from 'moment';
import React, { createContext, Component } from 'react';
import InCallManager from 'react-native-incall-manager';
import { connect } from 'react-redux';

import {
  startCalling,
  endCalling,
  setCallStatus,
  setRecentCall,
  updateRecentCall,
} from 'store/actions/caller';

import { uniqueId } from 'utils/helpers';

import { sessionStart, sessionEnd } from '../services/SipService';

export const STATUS = {
  outgoing: 1,
  incoming: 2,
  active: 3,
  ended: 4,
  busy: 5,
  noResponse: 6,
};

export const CallerContext = createContext({
  startCall: () => {},
  endCall: () => {},
});

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      handsfree: false,
      keyboard: false,
      dtmf: '',

      duration: 0,
      phonenumber: '',
      companyname: '',
      callId: null,
    };

    this.session = null;
    this.calltimer = null;
  }

  componentWillUnmount() {
    if (this.calltimer) {
      this.stopTimer();
    }
    if (this.session) {
      this.session.terminate();
      this.session = null;
    }
  }

  startTimer = () => {
    this.calltimer = setInterval(() => {
      this.setState({ duration: this.state.duration + 1 });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.calltimer);
  };

  handleStart = ({ phonenumber, companyname }) => {
    const callId = uniqueId();
    this.setState({ duration: 0, phonenumber, companyname, callId });
    // console.log('start', phonenumber);
    this.props.startCalling({
      phonenumber,
      companyname,
    });

    this.session = sessionStart({
      number: phonenumber,
      onProgress: data => {
        // console.log('==========', data, '=========');
      },
      onDisconnected: () => {
        // console.log('================= onDisconnected =================');
        // this.props.setCallStatus(STATUS.noResponse);
        this.onCallend(STATUS.noResponse);
      },
      onStart: () => {
        // console.log('================= onStart =================');
        this.props.setCallStatus(STATUS.outgoing);
        InCallManager.start({ media: 'audio', ringback: '_DTMF_' });

        this.props.setRecentCall({
          callId,
          date: moment(),
          connected: false,
          companyname: companyname || '',
          phonenumber: phonenumber,
          duration: 0,
        });
      },
      onAccept: () => {
        // console.log('================= onAccept =================');
        this.props.setCallStatus(STATUS.active);
        this.startTimer();
        InCallManager.stopRingback();
      },
      onFail: () => {
        // console.log('================= onFail =================');
        // this.props.setCallStatus(STATUS.noResponse);
        InCallManager.stopRingback();
        InCallManager.stop({ busytone: '_DTMF_' });
        this.onCallend(STATUS.noResponse);
      },
      onFinish: () => {
        // console.log('================= onFinish =================');
        // this.props.setCallStatus(STATUS.ended);
        InCallManager.stopRingback();
        this.onCallend(STATUS.ended);
      },
      onEnd: () => {
        // console.log('================= onEnd =================');
        // this.props.setCallStatus(STATUS.ended);
        InCallManager.stopRingback();
        this.onCallend(STATUS.ended);
      },
    });
  };

  onCallend = status => {
    this.stopTimer();
    InCallManager.stop();
    this.props.setCallStatus(status);
    const { duration, callId } = this.state;
    this.props.updateRecentCall({
      callId: callId,
      connected: duration > 0,
      duration: duration,
    });

    this.setState({
      mute: false,
      handsfree: false,
      keyboard: false,
      dtmf: '',
    });
  };

  handleEnd = () => {
    console.log('end');
    this.onCallend();
    sessionEnd();
    // this.session = null;

    this.props.endCalling({
      status: STATUS.ended,
    });
  };

  toggleMute = () => {
    this.setState({ mute: !this.state.mute });
    InCallManager.setMicrophoneMute(!this.state.mute);
  };

  toggleHandsfree = () => {
    this.setState({ handsfree: !this.state.handsfree });
    InCallManager.setForceSpeakerphoneOn(!this.state.handsfree);
  };

  toggleKeyboard = () => {
    this.setState({ keyboard: !this.state.keyboard });
  };

  sendDtmf = key => {
    if (this.session) {
      if (
        this.session.status == 5 ||
        this.session.status == 10 ||
        this.session.status == 11 ||
        this.session.status == 12
      ) {
        const dtmf = this.state.dtmf.concat(key);
        this.setState({ dtmf });
        console.log({ dtmf, key });
        this.session.dtmf(key);
      }
    }
  };

  render() {
    return (
      <CallerContext.Provider
        value={{
          startCall: this.handleStart,
          endCall: this.handleEnd,
          toggleMute: this.toggleMute,
          toggleHandsfree: this.toggleHandsfree,
          toggleKeyboard: this.toggleKeyboard,
          sendDtmf: this.sendDtmf,
          ...this.state,
        }}>
        {this.props.children}
      </CallerContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export const CallerContextProvider = connect(
  mapStateToProps,
  { startCalling, endCalling, setCallStatus, setRecentCall, updateRecentCall },
)(ContextProvider);
