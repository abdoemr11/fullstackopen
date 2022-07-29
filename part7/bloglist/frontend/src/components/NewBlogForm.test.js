import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewBlogForm } from './NewBlogForm'
describe('Testing NewBlogForm  ', () => {
  test('the Element call the event handler with right details', async () => {
    const mockHandler = jest.fn()
    const newBlog = {
      title: 'this is new blog',
      author: 'abood',
      url: 'abood.com'
    }
    render(<NewBlogForm createNewBlog={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('create')
    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    await user.type(title, newBlog.title)
    await user.type(author, newBlog.author)
    await user.type(url, newBlog.url)
    await user.click(button)
    console.log(mockHandler.mock.calls[0])
    expect(mockHandler.mock.calls[0][0]).toBe(newBlog.title)
    expect(mockHandler.mock.calls[0][1]).toBe(newBlog.author)
    expect(mockHandler.mock.calls[0][2]).toBe(newBlog.url)
  })
})