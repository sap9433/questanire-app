import React from 'react';
import { Modal } from '@material-ui/core'
import StartTest from './StartTest';
import { mount } from 'enzyme';

describe('StartTest', () => {
  test('open should not error', () => {
    const wrapper = mount(<StartTest show={true} />)
    expect(wrapper.props().show).toEqual(true)
  })
})