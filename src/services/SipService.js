import { UA } from 'sip.js';

import { SessionDescriptionHandler } from './sessionHandler/SessionDescriptionHandler';

const WS_SERVERS = 'wss://webrtc.call1800.org:7443';

let sip;

export const initSip = () => {
  sip = new UA({
    transportOptions: { wsServers: [WS_SERVERS] },
    register: true,
    sessionDescriptionHandlerFactory: function(ses, options) {
      return SessionDescriptionHandler.defaultFactory(ses, options);
    },
  });
};

let session;

export const sessionStart = ({
  number,
  onDisconnected,
  onAccept,
  onFail,
  onFinish,
  onEnd,
  onStart,
  onProgress,
}) => {
  initSip();

  sip.transport.on('disconnected', function(data) {
    onDisconnected && onDisconnected();
  });

  session = sip.invite(number.replace('-', ''));
  session.on('progress', function(data) {
    onProgress && onProgress(data);
  });
  session.on('accepted', function(data) {
    onAccept && onAccept();
  });
  session.on('failed', function(data) {
    onFail && onFail();
  });
  session.on('cancel', function(data) {
    onFinish && onFinish();
  });
  session.on('bye', function(data) {
    onEnd && onEnd();
  });

  onStart && onStart();

  return session;
};

export const sessionEnd = () => {
  if (session) {
    session.terminate();
  }
  console.log('endCall', session);
};
