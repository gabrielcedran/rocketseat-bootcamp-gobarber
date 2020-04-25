import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './Input.styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { fieldName, error, defaultValue = '', registerField } = useField(name);
  const inputValueRef = useRef<any>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      /** In case the component which has an instance of the form needs to set a value in this field,
       * this function will be called. Due to react native nature, it is not possible to access the value of a component
       * directly, that is why it is necessary to maintain the value and the text.
       */
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputValueRef.current.setNativeProps({ text: value });
      },
      /** The same as the function before, but to clear up the value being displayed and the value stored */
      clearValue() {
        inputValueRef.current.value = '';
        inputValueRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        {...rest}
        ref={inputValueRef}
        /** Due to reactive nature, it is not possible to retrieve the value of a component directly, so it is
         * necessary to store it manually so it is available to unform.
         */
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
      />
    </Container>
  );
};

export default Input;
