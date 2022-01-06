import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  //varmistetaan, että takaisinkutsufunktiota kutsutaan oikeilla tiedoilla
  test('callback function gets correct values', () => {
    const createBlog = jest.fn()

    const user = {
      username: 'fireEvent',
      id: '12345'
    }

    const component = render(
      <BlogForm createBlog={createBlog} user={user} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('#form')

    fireEvent.change(title, {
      target: { value: 'FrontEndTest' }
    })
    fireEvent.change(author, {
      target: { value: 'fireEvent' }
    })
    fireEvent.change(url, {
      target: { value: 'test.io' }
    })

    //component.debug()
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('FrontEndTest')
    expect(createBlog.mock.calls[0][0].author).toBe('fireEvent')
    expect(createBlog.mock.calls[0][0].url).toBe('test.io')
    expect(createBlog.mock.calls[0][0].user).toBe('12345')
  })
})