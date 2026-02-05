import { reactive } from 'vue'

interface KeyDownDict {
    [key: string]: boolean;
}

export const store: KeyDownDict = reactive({})