import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'
import Blog from './Blog'

describe('testint the basic functionalities of blog', () => {
  let blog
  let mockHandler
  beforeEach(() => {
    blog = {
      author: 'abdo saber',
      id: '62686653af951cf4970aa2b6',
      likes: 9,
      title: 'Test blog title',
      url: 'http:://abdo-saber.com'
    }
    mockHandler = jest.fn()
    render(<Blog updateBlogLikes={mockHandler} blog={blog}/>)
  })
  test('blog title and author is shown only', () => {

    screen.debug()
    screen.getByText('abdo saber')
    screen.getByText('Test blog title')
    const url = screen.queryByText('http:://abdo-saber.com')
    const likes = screen.queryByText(9)
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
  test('blog url and likes is shown when pressed button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    screen.getByText('http:://abdo-saber.com')
    screen.getByText(9, { exact: false })

  })
  test('if like button is clicked twice the handleLike is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})