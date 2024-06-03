<template>
  <div class="wrap-container">
    <div class="unit-diagram">
      <div class="byte-style byte-style-left">0</div>
      <div v-for="index in 7" :key="index" class="byte-style-center byte-style">
        {{ index }}
      </div>
      <div class="byte-style byte-style-left">8</div>
      <div v-for="index in 6" :key="index" class="byte-style-center byte-style">
        {{ index + 8 }}
      </div>
      <div class="byte-style-right byte-style">15</div>
    </div>
    <div class="wrap-diagram">
      <div
        class="row-diagram"
        v-for="(fieldRow, fieldRowIndex) in fieldRows"
        :key="fieldRowIndex"
      >
        <div
          v-for="(field, fieldIndex) in fieldRow"
          :key="fieldIndex"
          :style="fieldStyle(field)"
          class="field-box-diagram"
        >
          <!-- 가장 넓은 박스에만 텍스트를 표시 -->
          <template v-if="isWidestBox(field)">
            {{ field.originalName }} ({{ field.totalBits }} bits)
          </template>
        </div>
        <!-- 추가된 부분: 각 행의 마지막에 남은 부분을 채우는 div -->
        <div
          v-if="remainingWidth(fieldRowIndex) > 0"
          :style="remainingStyle(remainingWidth(fieldRowIndex))"
          class="empty-box-diagram"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 필드들의 배열. 각 필드는 이름과 비트 길이로 구성됩니다.
      fields: [
        { name: "message type", bits: 4 },
        { name: "dup", bits: 1 },
        { name: "qos", bits: 2 },
        { name: "reserved", bits: 1 },
        { name: "msg len", bits: 8 },
        { name: "protocol name length", bits: 16 },
        { name: "protocol name", bits: 48 },
        { name: "version", bits: 8 },
        { name: "flag", bits: 8 },
        { name: "keep alive", bits: 16 },
        { name: "client id length", bits: 16 },
      ],
    };
  },
  computed: {
    // 필드를 행 단위로 나누어 반환하는 계산된 프로퍼티
    fieldRows() {
      const rows = []; // 행들을 저장할 배열
      let remainingBitsInRow = 16; // 현재 행에 남은 비트 수
      let currentRowFields = []; // 현재 행의 필드들을 저장할 배열
      const fieldWidths = {}; // 각 필드의 최대 너비를 저장할 객체

      for (const field of this.fields) {
        let remainingFieldBits = field.bits; // 현재 필드에 남은 비트 수
        let partNumber = 1; // 필드가 여러 부분으로 나뉘는 경우, 부분 번호를 매김

        while (remainingFieldBits > 0) {
          const bitsForCurrentBox = Math.min(
            remainingBitsInRow,
            remainingFieldBits
          ); // 현재 박스에 할당할 비트 수
          const widthPercentage = bitsForCurrentBox * 6.25; // 비트 수에 따라 너비를 백분율로 계산
          const isFirstPart = remainingFieldBits === field.bits; // 필드의 첫 번째 부분인지 여부
          const isLastPart = remainingFieldBits <= 16; // 필드의 마지막 부분인지 여부

          // 필드의 부분을 나타내는 객체
          const fieldPart = {
            name: field.name + (field.bits > 16 ? ` (part ${partNumber})` : ""),
            bits: bitsForCurrentBox,
            width: widthPercentage,
            isFirstPart: isFirstPart,
            isLastPart: isLastPart,
            originalName: field.name,
            totalBits: field.bits,
          };

          currentRowFields.push(fieldPart); // 현재 행에 필드의 부분을 추가

          // 필드의 최대 너비를 저장. 이미 저장된 너비보다 클 경우 갱신.
          if (
            !fieldWidths[field.name] ||
            fieldWidths[field.name].width < widthPercentage
          ) {
            fieldWidths[field.name] = {
              width: widthPercentage,
              rowIndex: rows.length,
              fieldIndex: currentRowFields.length - 1,
            };
          }

          remainingFieldBits -= bitsForCurrentBox; // 남은 필드 비트 수를 갱신
          remainingBitsInRow -= bitsForCurrentBox; // 현재 행의 남은 비트 수를 갱신
          partNumber++; // 부분 번호 증가

          // 현재 행이 가득 찬 경우
          if (remainingBitsInRow === 0) {
            rows.push(currentRowFields); // 현재 행을 행 배열에 추가
            currentRowFields = []; // 새로운 행을 위해 초기화
            remainingBitsInRow = 16; // 남은 비트 수를 초기화
          }
        }
      }

      // 마지막 행이 비어있지 않다면 추가
      if (currentRowFields.length > 0) {
        rows.push(currentRowFields);
      }

      // 각 필드의 최대 너비 정보를 행 배열에 추가
      for (const fieldName in fieldWidths) {
        const { rowIndex, fieldIndex } = fieldWidths[fieldName];
        rows[rowIndex][fieldIndex].isWidest = true; // 가장 넓은 필드 표시
      }

      return rows;
    },
  },
  methods: {
    // 필드 스타일을 동적으로 설정하는 메서드
    fieldStyle(field) {
      return {
        width: `${field.width}%`,
        height: "36px",
        borderTop: field.isFirstPart ? "1px solid #7bc2d0" : "none",
        borderBottom: field.isLastPart ? "1px solid #7bc2d0" : "none",
        borderLeft: "1px solid #7bc2d0",
        borderRight: "1px solid #7bc2d0",
        borderRadius: "2.8px",
        boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
        // backgroundColor: field.isWidest ? "transparent" : "transparent",
      };
    },
    // 행의 남은 너비를 계산하는 메서드
    remainingWidth(fieldRowIndex) {
      const rowFields = this.fieldRows[fieldRowIndex];
      const totalWidth = rowFields.reduce((sum, field) => sum + field.width, 0);
      return 100 - totalWidth;
    },
    // 남은 공간을 채울 빈 박스의 스타일을 설정하는 메서드
    remainingStyle(width) {
      return {
        width: `${width}%`,
        borderTop: "1px solid #7bc2d0",
        borderRadius: "0.1px",
      };
    },
    // 해당 필드가 가장 넓은 박스인지 여부를 확인하는 메서드
    isWidestBox(field) {
      return field.isWidest;
    },
  },
};
</script>

<style scoped>
.title-diagram {
  font-size: 20px; /* 폰트 크기 증가 */
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 5px 10px; /* 패딩 추가 */
  color: #fff; /* 텍스트 색상 변경 */
  background-color: #7bc2d0; /* 배경 색상 변경 */
  border: 2px solid #7bc2d0; /* 테두리 추가 */
  border-radius: 8px; /* 테두리 반경 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  margin-bottom: 10px; /* 아래쪽 여백 추가 */
  box-sizing: border-box;
}
.wrap-container {
  width: 100%;
  height: 100%;
}
.unit-diagram {
  width: 100%;
  height: 18px;
  display: flex;
}
.wrap-diagram {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-family: "Poppins", sans-serif;
  width: 100%;
}

.row-diagram {
  display: flex;
}

.field-box-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  padding: 4px;
}

.empty-box-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  padding: 4px;
}

.byte-style-right {
  background-image: linear-gradient(to top, #7bc2d0 50%, transparent 25%),
    linear-gradient(to top, #7bc2d0 90%, transparent 20%);
  background-size: 2px 100%;
  background-position: left, right;
  background-repeat: no-repeat;
}
.byte-style-left {
  background-image: linear-gradient(to top, #7bc2d0 90%, transparent 20%);
  background-size: 2px 100%;
  background-position: left;
  background-repeat: no-repeat;
}
.byte-style-center {
  background-image: linear-gradient(to top, #7bc2d0 50%, transparent 25%);
  background-size: 2px 100%;
  background-position: left;
  background-repeat: no-repeat;
}
.byte-style {
  height: 18px;
  width: 6.25%;
  box-sizing: border-box;
  font-size: 10px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  color: #7bc2d0;
  border-bottom: #7bc2d0 solid 0.1px;
}
</style>
