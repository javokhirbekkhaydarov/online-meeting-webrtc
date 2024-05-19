export const createPeerConnection = (
  onIceCandidate: (event: RTCPeerConnectionIceEvent) => void
): RTCPeerConnection => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  pc.onicecandidate = onIceCandidate;
  return pc;
};

export const createOffer = async (
  pc: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer;
};

export const createAnswer = async (
  pc: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> => {
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  return answer;
};

export const setRemoteDescription = async (
  pc: RTCPeerConnection,
  desc: RTCSessionDescriptionInit
) => {
  await pc.setRemoteDescription(new RTCSessionDescription(desc));
};
