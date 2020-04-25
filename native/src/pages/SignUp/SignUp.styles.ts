import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ReturnLogin = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232129;
  flex-direction: row;
  justify-content: center;
`;

export const ReturnLoginText = styled.Text`
  color: #f4ede8;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
