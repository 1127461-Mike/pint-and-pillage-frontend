import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import ResourcesModal from "../../src/components/ui/modals/ResourcesModal";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";

let resourceModalWrapper;
let store;
let getters;
let localVue;

beforeAll(() => {
    localVue = createLocalVue()
    localVue.component('LevelUpBuilding', LevelUpBuilding)
    localVue.use(Vuex)
})

beforeEach(() => {
    getters = {
        building: () => () => {
            return require("./mockData/building.json")
        }
    }

    store = new Vuex.Store({
        getters
    })

    resourceModalWrapper = shallowMount(ResourcesModal, {
        store,
        localVue,
    });
});

afterAll(() => {
    resourceModalWrapper.destroy()
})

describe('ResourcesModal', () => {
    it('it should instantiate ', () => {
    expect(1).toBe(1)
    });
});
