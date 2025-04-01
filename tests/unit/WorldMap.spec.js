import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import WorldMap from '@/components/WorldMap.vue'
import mockData from './mockData/worldMap.json'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let actions
let getters

beforeEach(() => {
    actions = {
        getWorldmap: jest.fn().mockResolvedValue({ data: mockData })
    }
    
    getters = {
        village: () => null,
        villageList: () => [],
    }
    
    store = new Vuex.Store({
        actions,
        getters
    })
    
    wrapper = shallowMount(WorldMap, {
        store,
        localVue
    })
})

afterEach(() => {
    wrapper.destroy()
})

describe('WorldMap.vue', () => {
    describe('addPartToGrassTile', () => {
        it('should return empty string for out of bounds coordinates', async () => {
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.addPartToGrassTile('N', -1, 0)).toBe('')
            expect(wrapper.vm.addPartToGrassTile('N', 0, -1)).toBe('')
        })

        it('should return direction letter when adjacent tile is water', async () => {
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.addPartToGrassTile('N', 1, 0)).toBe('N')
        })
    })

    describe('getGrassTile', () => {
        it('should return empty string for non-grass tiles', async () => {
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.getGrassTile(0, 0)).toBe('')
        })

        it('should return correct grass tile pattern for center grass tile', async () => {
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.getGrassTile(1, 1)).toBe('Grass_NESW')
        })
    })
}) 