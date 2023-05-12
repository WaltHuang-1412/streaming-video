<style lang="scss">
.ranking-box-list {
  width: 100%;
  color: white;
  padding: 0 20px;
}
.ranking-box-item {
  display: inline-flex;
  background-image: url('@/assets/images/static/RankingBox.svg');
  width: 100%;
  height: 53px;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  padding-left: 50px;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;

  &__color {
    display: inline-block;
    height: 14px;
    width: 14px;
    position: absolute;
    top: calc(50% - 8px);
    left: 27px;
    border-radius: 20px;
  }

  &__number {
    display: inline-flex;
    // justify-content: center;
    align-items: flex-end;
    width: 30%;
    height: 50%;
    font-size: 14px;
  }
  &__name {
    display: inline-flex;
    align-items: flex-end;
    width: 70%;
    height: 50%;
    font-size: 14px;
  }
  &__time {
    display: inline-flex;
    // justify-content: center;
    width: 40%;
    height: 50%;
    font-size: 12px;
  }
  &__distance {
    display: inline-flex;
    width: 60%;
    height: 50%;
    font-size: 12px;
  }
}
</style>
<template lang="pug">
.ranking-box-list
  .ranking-box-item(v-for="(item,index) in list" @click="handleRankinBoxItemClick({...item,index})")
    .ranking-box-item__color(:style="{backgroundColor: item.color}")
    .ranking-box-item__number {{ item.pigeon_no }}
    .ranking-box-item__name {{item.pigeon_name}}
    .ranking-box-item__time 12:22:34
    .ranking-box-item__distance 123233m
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RankingBox',
  emits: ['rankinBoxItemClick'],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const handleRankinBoxItemClick = (row: any) => {
      emit('rankinBoxItemClick', row)
    }
    return { handleRankinBoxItemClick }
  }
})
</script>
