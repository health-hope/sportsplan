<template>
    <ul class="single">
        <li @click="itemClick(i)" :class="item.check?'check vux-1px tap_events':'vux-1px tap_events'" v-for="(item, i) in single" :key="i">{{ item.name?item.name:item.optionContent }}</li>
    </ul>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            single: {
                type: Array
            }
        },
        methods: {
            itemClick(index) {
                this.$emit('itemClick', index)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .single {
        li {
            width: 100%;
            height: 2rem /* 80/40 */;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem /* 32/40 */;
            // @include font_color4();
            &::before {
                border-radius: 2rem;
                // @include border_color();
                box-sizing: border-box;
            }
            & + li {
                margin-top: 0.5rem /* 20/40 */;
            }
        }
        .check {
            // @include bg_color();
            // @include font_color6();
            font-weight: bold;
            border-radius: 2rem;
            &::before {
                border: none;
            }
        }
    }
</style>

