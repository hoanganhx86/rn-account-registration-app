import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import {init} from '../services/main';
import MainNavigation from '../navigation';

const registerFailResponse = 'User already exist';
let mock: MockAdapter;

// Move one test here to avoid an error with react navigation animation
// FIXME: move it back to the main test
describe('Registration screen / Register user fail', () => {
  beforeEach(() => {
    const {axiosInstance} = init('http://localhost:3001/');
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  test('Register fail', async () => {
    const {getByTestId, findByText} = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>,
    );
    mock.onPost('/users/').reply(400, registerFailResponse);
    fireEvent.changeText(getByTestId('usernameInput'), 'andy@mail.com');
    fireEvent.changeText(getByTestId('passwordInput'), '12345xyz');
    fireEvent.changeText(getByTestId('nameInput'), 'Andy Nguyen');

    act(async () => {
      const registerButton = getByTestId('registerBtn');
      await fireEvent.press(registerButton);
    });
    const serverErrorMessage = await findByText(registerFailResponse);
    expect(serverErrorMessage).toBeTruthy();
  });
});
