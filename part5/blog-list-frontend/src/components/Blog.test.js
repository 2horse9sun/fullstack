import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlog from './NewBlog'


test('test render',async () => {
  const blog={
    title:'Title',
    author:'jsjhfx',
    url:'https://jsjhfx.com',
    likes:0,
  }

  const mockHandler = jest.fn()
  const { container }=render(<Blog blog={blog} likehandler={mockHandler}/>)
  const user = userEvent.setup()
  const div = container.querySelector('.blog')
  const button = screen.getByText('view')
  await user.click(button)
  expect(div).toHaveTextContent('Title')
  expect(div).toHaveTextContent('jsjhfx')
  expect(div).toHaveTextContent('https://jsjhfx.com')

  const likeButton=screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('create blog',async () => {
  const newBlog={
    title:'Title',
    author:'jsjhfx',
    url:'https://jsjhfx.com'
  }

  const mockHandler = jest.fn()
  const { container }=render(<NewBlog addCallback={mockHandler} blog={newBlog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('create')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(undefined)
})