<template>
    <transition name="opac">
        <div v-if="isOpen" :id="id" class="v-popup" @click="onClose">
            <div class="v-popup__wrapper">
                <div
                    class="v-popup__main"
                    role="dialog"
                    @click.stop
                >
                    <div class="v-popup__header">
                        <FontAwesome class="v-popup__close" icon="close" @click="onClose" />
                        <h3 class="v-popup__header-title">
                            {{ title }}
                        </h3>
                    </div>
                    <div class="v-popup__body">
                        <slot name="content" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {
    toRefs,
    onMounted,
    onBeforeUnmount
} from 'vue'

export default {
    name: 'ModalPopup',
    props: {
        id: {
            type: String,
            default: 'popup'
        },
        title: {
            type: String,
            default: ''
        },
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:isOpen'],
    setup (props, context) {
        const { isOpen } = toRefs(props)

        function onClose () { context.emit('update:isOpen', false) }

        function handleKeydown (e) {
            if (isOpen.value && e.key === 'Escape') {
                onClose();
            }
        }

        onMounted(() => document.addEventListener('keydown', handleKeydown))
        onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))

        return {
            onClose
        }
    }
};
</script>
<style lang="scss">
.v-popup {
    background-color: rgba(0, 0, 0, 0.2);
    bottom: 0;
    left: 0;
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;

    &__wrapper {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 100%;
    }

    &__main {
        background-color: #fff;
        margin: 10px;
        max-width: 620px;
        width: 100%;
        z-index: 1;
    }

    &__header {
        align-items: center;
        background-color: #00339c;
        display: flex;
        justify-content: center;
        min-height: 83px;
        padding: 20px 40px 5px;
        position: relative;

        &-title {
            color: #fff;
            font-size: 28px;
            letter-spacing: 3px;
            text-align: center;
        }
    }

    &__body {
        padding: 40px 30px;
    }

    &__close {
        color: #fff;
        cursor: pointer;
        position: absolute;
        right: 30px;
        top: 20px;
    }
}
</style>
