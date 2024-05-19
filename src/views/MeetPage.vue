<template>
  <div>
    <video ref="localVideo" autoplay playsinline></video>
    <video ref="remoteVideo" autoplay playsinline></video>
    <button @click="startCall">Start Call</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  createPeerConnection,
  createOffer,
  createAnswer,
  setRemoteDescription,
} from "@/services/webrtc";
import {
  createOffer as createRoomOffer,
  createAnswer as answerRoom,
  onOffer,
  onAnswer,
} from "@/services/signaling";

const route = useRoute();
const roomId = route.params.roomId as string;

const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);
let pc: RTCPeerConnection;

const startCall = async () => {
  pc = createPeerConnection((event) => {
    if (event.candidate) {
      // Handle new ICE candidates
    }
  });

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localVideo.value!.srcObject = stream;
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  const offer = await createOffer(pc);
  await createRoomOffer(offer, roomId);

  onAnswer(roomId, async (answer) => {
    await setRemoteDescription(pc, answer);
  });

  pc.ontrack = (event) => {
    remoteVideo.value!.srcObject = event.streams[0];
  };
};

onOffer(roomId, async (offer) => {
  await setRemoteDescription(pc, offer);
  const answer = await createAnswer(pc);
  await answerRoom(answer, roomId);
});

onMounted(() => {
  // Cleanup or additional setup if needed
});
</script>

<style scoped>
video {
  width: 300px;
  height: 200px;
}
</style>
