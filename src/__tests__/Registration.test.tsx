import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import {init} from '../services/main';
import MainNavigation from '../navigation';

const registerSuccessResponse = {
  id_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFAZW1haWwuY29tIiwiaWQiOjMsImlhdCI6MTYyNjUwNTI5OCwiZXhwIjoxNjI2NTIzMjk4fQ.Oe893VTDK0IiPaynfqfBn09PrYZ-5XeMz1kGWMKdnto',
  access_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dvbnRvLmNvbSIsImF1ZCI6Im5vZGVqcy1qd3QtYXV0aCIsImV4cCI6MTYyNjUwODg5OCwic2NvcGUiOiJmdWxsX2FjY2VzcyIsInN1YiI6ImxhbGFsYW5kfGdvbnRvIiwianRpIjoiczdJMXpMVXJER0l5THlaRSIsImFsZyI6IkhTMjU2IiwiaWF0IjoxNjI2NTA1Mjk4fQ.66GBzbAxGg0oy5qER3zMPRiFDcpLx9h2P66NGS199l8',
};

let mock: MockAdapter;

describe('Registration screen', () => {
  beforeEach(() => {
    const {axiosInstance} = init('http://localhost:3001/');
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  test('Register form should render correctly', async () => {
    const {getByTestId, findAllByText} = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>,
    );
    const usernameInput = getByTestId('usernameInput');
    expect(usernameInput).toBeTruthy();
    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeTruthy();
    const nameInput = getByTestId('nameInput');
    expect(nameInput).toBeTruthy();

    const requiredErrors = await findAllByText(/register/i);
    expect(requiredErrors).toHaveLength(2);
  });

  test('Username input works properly', async () => {
    const {findByText, getByTestId} = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>,
    );

    act(() => {
      const usernameInput = getByTestId('usernameInput');
      fireEvent.changeText(usernameInput, 'invalid email address');
    });

    act(() => {
      const registerButton = getByTestId('registerBtn');
      fireEvent.press(registerButton);
    });

    const invalidEmailError = await findByText(/Invalid email address\./i);
    expect(invalidEmailError).toBeTruthy();
  });

  test('Password input works properly', async () => {
    const {findByText, getByTestId} = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>,
    );

    act(() => {
      const passwordInput = getByTestId('passwordInput');
      fireEvent.changeText(passwordInput, '2c');
    });

    act(() => {
      const registerButton = getByTestId('registerBtn');
      fireEvent.press(registerButton);
    });

    const passwordTooShortError = await findByText(
      /Password must be at least 3 characters/i,
    );
    expect(passwordTooShortError).toBeTruthy();
  });

  test('All inputs must be filled', async () => {
    const {findAllByText, getByTestId} = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>,
    );

    act(() => {
      const registerButton = getByTestId('registerBtn');
      fireEvent.press(registerButton);
    });

    const requiredErrors = await findAllByText(/\\*Required/i);
    expect(requiredErrors).toHaveLength(3);
  });

  test('Register successfully', async () => {
    const {getByTestId, findByText} = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>,
    );
    mock.onPost('/users/').reply(201, registerSuccessResponse);

    fireEvent.changeText(getByTestId('usernameInput'), 'andy@mail.com');
    fireEvent.changeText(getByTestId('passwordInput'), '12345xyz');
    fireEvent.changeText(getByTestId('nameInput'), 'Andy Nguyen');

    act(async () => {
      const registerButton = getByTestId('registerBtn');
      await fireEvent.press(registerButton);
    });

    const successRegister = await findByText(
      /^Please check your email inbox for verification email\./i,
    );
    expect(successRegister).toBeTruthy();
  });
});
