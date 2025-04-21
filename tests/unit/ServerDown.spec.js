import { shallowMount } from '@vue/test-utils'
import ServerDown from '@/components/ServerDown.vue'

describe('ServerDown.vue', () => {
  let wrapper
  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallowMount(ServerDown, {
      mocks: {
        $router: mockRouter
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct heading', () => {
    const heading = wrapper.find('h1')
    expect(heading.text()).toBe('Something went wrong!')
  })

  it('displays the correct subheading', () => {
    const subheading = wrapper.find('h2')
    expect(subheading.text()).toContain('It appears something technical is wrong here')
    expect(subheading.text()).toContain('But no worries')
    expect(subheading.text()).toContain('Please try to login on a later time')
  })

  it('displays the error image', () => {
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('../assets/elwrick_exploded.png')
    expect(image.attributes('height')).toBe('500px')
  })

  it('has a back to login button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Back to login')
    expect(button.classes()).toContain('baseButton')
  })

  it('navigates to login page when button is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  })
}) 