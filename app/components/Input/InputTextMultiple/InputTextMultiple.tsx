import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {InputText, InputTextSize} from '../InputText';
import {BaseStyle} from '../../../styles/base.ts';
import {Button, ButtonSize, ButtonVariant} from '../../Button';
import {generateUUID} from '../../../utils';

export interface InputTextMultipleProps {
  onChangeText: (value: string) => void;
  isDisabled?: boolean;
}

const InputTextMultiple: React.FC<InputTextMultipleProps> = ({
  onChangeText,
  isDisabled,
}) => {
  const [inputs, setInputs] = useState<Array<string>>([generateUUID()]);

  const add = useCallback(() => {
    setInputs(state => [...state, generateUUID()]);
  }, []);

  const remove = useCallback(
    (index: number) => () => {
      setInputs(state => {
        if (state.length < 2) {
          return state;
        }
        const newInputs = [...state];
        newInputs.splice(index, 1);

        return newInputs;
      });
      onChangeText(`${index};`);
    },
    [onChangeText],
  );

  const onChangeEmail = useCallback(
    (index: number) => (email: string) => {
      onChangeText(`${index};${email}`);
    },
    [onChangeText],
  );

  const renderItem = useCallback(
    (item: string, index: number) => {
      const isFirstItem = index === 0;
      return (
        <View key={item} style={[BaseStyle.row, BaseStyle.verticalCentered]}>
          <View style={BaseStyle.flex}>
            <InputText
              isDisabled={isDisabled}
              onChangeText={onChangeEmail(index)}
              isFloatingLabel
              label={isFirstItem ? 'Invite Member' : undefined}
              placeholder={'Email'}
              size={InputTextSize.SMALL}
              wrapperStyle={BaseStyle.noMarginBottom}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={BaseStyle.dividerVertical} />
          <Button
            isDisabled={(isFirstItem && inputs.length < 2) || isDisabled}
            onPress={remove(index)}
            colorScheme={'crimsonRed'}
            style={
              isFirstItem ? BaseStyle.marginTopMedium : BaseStyle.marginTop
            }
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TERTIARY}>
            Remove
          </Button>
        </View>
      );
    },
    [remove, inputs.length, onChangeEmail, isDisabled],
  );

  return (
    <View>
      {inputs.map(renderItem)}
      <View style={BaseStyle.dividerPlain} />
      <View style={BaseStyle.row}>
        <Button
          isDisabled={isDisabled}
          onPress={add}
          colorScheme={'victoriaBlue'}
          variant={ButtonVariant.TERTIARY}
          size={ButtonSize.SMALL}>
          Add More Email
        </Button>
      </View>
    </View>
  );
};

export default InputTextMultiple;
