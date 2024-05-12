<template>
  <!-- <div>
        <p><img src="@/assets/wavenetLogo.png" alt="wavenet프로그램 로고이미지" style="width:27px; height: 27;"> {{ iotAddress }}</p>
    </div> -->

  <div style="display: flex; align-items: center">
    <img
      class="waveimg"
      src="@/assets/wavenetLogo.png"
      alt="wavenet프로그램 로고이미지"
    />
    <p class="adress">{{ iotAddress }}</p>
    <div class="memoryDashboard" style="display: flex; align-items: center">
      메모리:
      <Knob
        class="memoryCheck"
        v-model="value"
        :size="40"
        valueTemplate="{value}%"
      />
      <!--readonly 안에 넣으면 값 수정할 수 없음.-->
    </div>
  </div>
</template>

<script>
import Knob from "primevue/knob";

export default {
  components: {
    Knob,
  },
  data() {
    return {
      iotAddress: "192.255.255.255",
      value: 20,
    };
  },
};
</script>

<style scoped>
.waveimg {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
}

.memoryCheck {
  margin-top: 1px;
  width: 40px;
  height: 40px;
}

.memoryDashboard {
  margin-left: auto;
  margin-right: 5px;
  font-size: 10px;
}

.adress {
  margin: 4px;
}
</style>
