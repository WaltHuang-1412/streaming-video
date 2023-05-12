<style lang="scss">
.pigeons {
  height: 100%;
  width: 100%;
  &__content {
    width: 100%;
    height: 90%;
    margin-bottom: 10px;
    overflow-y: scroll;
  }
  .list {
    width: 100%;
    color: white;
  }
  .item {
    width: 100%;
    cursor: pointer;
  }
  &__filter {
    width: 100%;
    height: 10%;
  }
  .row {
    display: flex;
    width: 100%;
    font-size: 0;
  }
  @for $i from 1 through 12 {
    .rol-#{$i}-twelfth {
      $width: $i * (100% / 12);
      display: inline-block;
      width: $width;
      font-size: 12px;
    }
  }
  .round {
    background-color: rgba($color: #ffffff, $alpha: 0.3);
    border-radius: 30px;
  }
  .point {
    cursor: pointer;
  }
  .center {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
  .el-input__wrapper {
    border-radius: 30px;
    background-color: rgba($color: #ffffff, $alpha: 0.2);
    box-shadow: none;
  }
  .el-input__inner {
    color: white;
    &::placeholder {
      color: white;
    }
  }
}
</style>
<template lang="pug">
.pigeons
  .pigeons__content
    .list(v-if="isArray(pigeonList)")
      .item(v-for="(item,index) in pigeonList" @click="$event => handlePigeonClick(item)") {{ `${item.pigeon_no} ${item.pigeon_name}` }}
  .pigeons__filter
    .row
      .rol-10-twelfth
        el-input(v-model="filter.key" size="small" placeholder="搜尋選手號碼")
      .rol-2-twelfth.center(@click="handleFilter")
        el-icon.round.point(:size="20" color="black")
          ArrowRight

</template>
<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { IPigeonItem } from '@/types'
import { isArray, cloneDeep, isNil, isString } from 'lodash'
export default defineComponent({
  name: 'Pigeons',
  emits: ['pigeonClick'],
  props: {
    list: {
      type: Array,
      default: () => {
        return [...Array(100)]
      }
    }
  },
  components: { ArrowRight },
  setup(props, { emit }) {
    const filter = reactive<{ key: string | null }>({
      key: null
    })
    const pigeonList: Ref<IPigeonItem[] | null> = ref(null)

    const handleFilter = () => {
      if (isArray(props.list)) {
        pigeonList.value = props.list.filter((item: IPigeonItem) => {
          if (isString(filter.key)) {
            return item.pigeon_name
              .toLowerCase()
              .includes(filter.key.toLowerCase())
          }
        })
      }
    }
    const handlePigeonClick = (row: object) => {
      emit('pigeonClick', row)
    }
    const init = () => {
      if (isArray(props.list)) {
        pigeonList.value = cloneDeep(props.list)
      }
    }
    init()
    return { filter, pigeonList, isArray, handlePigeonClick, handleFilter }
  }
})
</script>
