import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {FormInput, FormInputType} from '../components/input/FormInput';
import {colors} from '../styles';

describe('<FormInput />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    testID: 'emailInput',
    type: FormInputType.Email,
    blurOnSubmit: true,
    autoCorrect: false,
    autoFocus: false,
    placeholder: 'Email',
    label: 'Email',
    value: '',
    onChangeText: jest.fn(),
    onInputFocus: jest.fn(),
    onInputBlur: jest.fn(),
  };

  const setup = () => {
    const utils = render(<FormInput {...defaultProps} />);
    const input = utils.getByTestId('emailInput');
    const label = utils.getByTestId('emailInput.label');
    const errorView = utils.getByTestId('emailInput.errorMessage');
    const inputContainer = utils.getByTestId('emailInput.inputContainer');
    return {
      input,
      label,
      errorView,
      inputContainer,
      ...utils,
    };
  };

  test('render correctly', () => {
    const {label, input, errorView} = setup();
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
    expect(errorView).toBeTruthy();
  });

  test('should set correctly label', () => {
    const {label} = setup();
    expect(label.props.children).toBe('Email');
  });

  test('should not show error message', () => {
    const {errorView} = setup();
    expect(errorView.props.children).toBe(undefined);
  });

  test('should has the right placeholder', () => {
    const {input} = setup();
    expect(input.props.placeholder).toBe('Email');
  });

  test('should able input text', () => {
    const {input} = setup();
    const email = 'email@me.com';
    fireEvent.changeText(input, email);
    expect(input.props.onChangeText).toBeCalledTimes(1);
    expect(input.props.onChangeText).toBeCalledWith(email);
    // expect(input.props.value).toBe(email);
  });

  test('Should able change to focus state', () => {
    const {input, inputContainer} = setup();
    expect(inputContainer).toHaveStyle({
      borderColor: colors.darkGray,
    });
    const email = 'email@me.com';
    fireEvent(input, 'focus');
    fireEvent.changeText(input, email);
    expect(inputContainer).toHaveStyle({
      borderColor: colors.primary,
    });

    expect(defaultProps.onInputFocus).toBeCalledTimes(1);
  });

  test('Should able change to blur state', () => {
    const {input, inputContainer} = setup();
    const email = 'email@me.com';
    fireEvent(input, 'focus');
    fireEvent.changeText(input, email);
    fireEvent(input, 'blur');
    expect(inputContainer).toHaveStyle({
      borderColor: colors.darkGray,
    });
  });

  test('Should able change to disabled state', () => {
    const utils = render(<FormInput {...defaultProps} disabled />);
    const input = utils.getByTestId('emailInput');
    const inputContainer = utils.getByTestId('emailInput.inputContainer');
    fireEvent(input, 'focus');
    expect(defaultProps.onInputFocus).toBeCalledTimes(0);
    expect(inputContainer).not.toHaveStyle({
      borderColor: colors.primary,
    });
  });

  test('should able to show error message', () => {
    const utils = render(
      <FormInput {...defaultProps} errorMessage="Wrong Email!" />,
    );
    const errorView = utils.getByTestId('emailInput.errorMessage');
    expect(errorView.props.children).toBe('Wrong Email!');
  });
});
