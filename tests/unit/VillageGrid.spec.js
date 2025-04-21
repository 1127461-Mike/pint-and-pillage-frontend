import { shallowMount, createLocalVue } from '@vue/test-utils'
import VillageGrid from '@/components/VillageGrid.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('VillageGrid.vue', () => {
  let wrapper
  let store
  let mockVillage

  beforeEach(() => {
    mockVillage = {
      buildings: [],
      validBuildPositions: [
        { name: 'BuildingSpot', position: { x: 1, y: 1 } },
        { name: 'BuildingSpot', position: { x: 2, y: 2 } }
      ]
    }

    store = new Vuex.Store({
      state: {
        zoomState: 1,
        zoomPerStep: 0.1
      },
      getters: {
        village: () => mockVillage,
        zoomState: state => state.zoomState,
        zoomPerStep: state => state.zoomPerStep
      },
      actions: {
        updateZoomState: jest.fn()
      }
    })

    wrapper = shallowMount(VillageGrid, {
      localVue,
      store,
      stubs: {
        BaseTile: true,
        BuildingSpot: true,
        WaterTile: true,
        WaterCornerTile: true,
        WallLeft: true,
        WallLeftEnd: true,
        WallRight: true,
        WallRightEnd: true,
        NatureForest_1: true,
        NatureForest_2: true
      }
    })
  })

  it('initializes with correct grid dimensions', () => {
    expect(wrapper.vm.gridWidth).toBe(15)
    expect(wrapper.vm.gridLength).toBe(15)
  })

  it('builds base tiles on creation', () => {
    expect(wrapper.vm.grid).toBeTruthy()
    expect(wrapper.vm.grid.length).toBe(16) // gridLength + 1
    expect(wrapper.vm.grid[0].length).toBe(16) // gridWidth + 1
    expect(wrapper.vm.grid[0][0].name).toBe('BaseTile')
  })

  it('builds building spots correctly', () => {
    const buildingSpots = wrapper.vm.grid
      .flat()
      .filter(tile => tile.name === 'BuildingSpot')
    
    expect(buildingSpots.length).toBe(2)
    expect(buildingSpots[0].position).toEqual({ x: 1, y: 1 })
    expect(buildingSpots[1].position).toEqual({ x: 2, y: 2 })
  })





  it('shows modal for clickable tiles', () => {
    const clickableTile = { name: 'BuildingSpot', position: { x: 1, y: 1 } }
    wrapper.vm.showModal(clickableTile)
    expect(wrapper.emitted().toggleModal).toBeTruthy()
    expect(wrapper.emitted().toggleModal[0]).toEqual([clickableTile])
  })

  it('does not show modal for unclickable tiles', () => {
    const unclickableTile = { name: 'WaterTile', position: { x: 0, y: 0 } }
    wrapper.vm.showModal(unclickableTile)
    expect(wrapper.emitted().toggleModal).toBeFalsy()
  })

}) 