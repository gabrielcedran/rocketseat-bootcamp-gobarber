import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
// the hook useImperativeHandle is used to provide information from the child component to the parent component (or allow the parent execute a function of the child)
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './Input.styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputRef {
  focus(): void;
}
// By default, ref is a special element in react and is not present in the regular FC elements - it does not come with the regular props.
// When it is needed to receive and pass refs around, the component needed is RefForwardingComponent and it received the ref and a extra param
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { fieldName, error, defaultValue = '', registerField } = useField(name);
  const inputValueRef = useRef<any>({ value: defaultValue });

  // As we already have a ref element, it is not possible to assign another (received as parameter)
  // Using this hook, we simple implement the function which will be called by the parent element and trigger
  // an execution in the inner element - in this case, the focus in the inputValueRef
  useImperativeHandle(ref, () => ({
    focus() {
      inputValueRef.current.focus();
    },
  }));

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

export default forwardRef(Input);
