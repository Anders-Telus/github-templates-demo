import React from 'react'
import { mount } from 'enzyme'
import CommentsList from '../view'

const items = [
  {
    text: '{"slugs":"","text":"This is a maual"}',
    lastUpdatedAt: '2020-04-27T10:34:00.843Z',
    lastUpdatedBy: {
      id: 'x215588',
      name: 'Akash'
    },
    id: '378017'
  },
  {
    text: '{"slugs":"","text":"This is a maual"}',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    last_updated_by: {
      id: 'Ashish',
      name: 'jee'
    },
    id: '213385'
  },
  {
    text: '{"slugs":"billOverage","text":"Bill=billOverage|Repair=repairType|Warenty=warrantyInfo"}',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    lastUpdatedBy: {
      id: 'System',
      name: 'System'
    },
    id: '213385'
  },
  {
    text: '{"slugs":"","text":"Bill=billOverage|Repair=repairType|Warenty=warrantyInfo"}',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    last_updated_by: {
      id: 'System',
      name: 'System'
    },
    id: '213385'
  },
  {
    text: '{"slugs":"billOverage,repairType,warrantyInfo","text":"Bill=billOverage|Repair=repairType|Warenty=warrantyInfo"}',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    last_updated_by: {
      id: 'System',
      name: 'System'
    },
    id: '213385'
  },
  {
    text: '{"slugs":"emailInitiated","text":"EMAIL Initiated"}',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    lastUpdatedBy: {
      id: 'System',
      name: 'System'
    },
    id: '213385'
  },
  {
    text: '{"slugs":"closedUsingDisposition","text":"SMS Initiated"}',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    lastUpdatedBy: {
      id: 'System',
      name: 'System'
    },
    id: '213385'
  },
  {
    text: '',
    last_updated_ts: '2020-04-27T09:34:00.843Z',
    lastUpdatedBy: {
      id: 'System',
      name: 'System'
    },
    id: '213385'
  }
]

const createWrapper = (data) => {
  return mount(
    <CommentsList
      createdOrUpdateAgent={jest.fn()}
      items={data.items || items}
    />
  )
}

describe('Test cases for CommentsList', () => {
  it('should match snapshot for CommentsList', () => {
    expect(createWrapper({}).find('#no-comment').exists()).toEqual(false)
  })

  it('should for CommentsList', () => {
    expect(createWrapper({ items: [] }).find('#no-comment').exists()).toEqual(true)
  })
})
