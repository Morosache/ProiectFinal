import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import GenericButton from '@/components/buttons/GenericButton.vue'

describe('GenericButton', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders the title prop', () => {
        const wrapper = mount(GenericButton, {
            props: { title: 'Click me' }
        })
        expect(wrapper.text()).toContain('Click me')
    })

    it('renders a button element', () => {
        const wrapper = mount(GenericButton, {
            props: { title: 'Test' }
        })
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('applies default class when no customClass is provided', () => {
        const wrapper = mount(GenericButton, {
            props: { title: 'Test' }
        })
        expect(wrapper.find('button').classes().length).toBeGreaterThan(0)
    })

    it('applies customClass when provided', () => {
        const wrapper = mount(GenericButton, {
            props: { title: 'Test', customClass: 'my-custom-class' }
        })
        expect(wrapper.find('button').classes()).toContain('my-custom-class')
    })
})
