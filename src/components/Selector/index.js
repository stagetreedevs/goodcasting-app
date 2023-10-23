import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useModal} from '../../contexts/modal';

import {
  // Wrapper,
  // Container,
  // Label,
  // OptionsContainer,
  // OptionButton,
  // OptionText,
  // Wrapper2,
  // Container2,
  // Label2,
  // OptionsContainer2,
  // OptionButton2,
  // OptionText2,
  Wrapper,
  Container,
  Label,
  SelectedContainer,
  OptionsContainerWrapper,
  OptionsContainer,
  OptionButton,
  OptionText,
} from './styles';

import {theme} from '../../constants/theme';
import { useTranslation } from 'react-i18next';

// const Option = ({children, ...props}) => {
//   return (
//     <OptionButton {...props}>
//       <OptionText>{children}</OptionText>
//     </OptionButton>
//   );
// };

// const Option2 = ({children, selected, ...props}) => {
//   return (
//     <OptionButton2 selected={selected} {...props}>
//       <OptionText2>{children}</OptionText2>
//       <MaterialCommunityIcons
//         size={24}
//         color={theme.primaryTextColor}
//         name={selected ? 'check-circle' : 'checkbox-blank-circle-outline'}
//       />
//     </OptionButton2>
//   );
// };
const Option = ({children, selected, lastOne, first, ...props}) => {
  return (
    <OptionButton
      selected={selected}
      lastOne={lastOne}
      first={first}
      {...props}>
      <MaterialCommunityIcons
        size={24}
        color={theme.primaryTextColor}
        name={selected ? 'check-circle' : 'checkbox-blank-circle-outline'}
      />
      <OptionText>{children}</OptionText>
    </OptionButton>
  );
};

// const Selector = ({id, selector, onOptionChange, containerStyle, ...props}) => {
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(0);
//   const [opened, setOpened] = useState(false);

//   useEffect(() => {
//     setOptions(selector.options);
//     setSelectedOption(selector.selected);
//   }, [selector]);

//   const getValue = optionId => {
//     const selectedValue = options.filter(option => option.id === optionId)[0];

//     if (selectedValue) {
//       return selectedValue.value;
//     }

//     return '';
//   };

//   const handleOptionChange = optionId => {
//     onOptionChange(id, optionId);
//     setOpened(false);
//   };

//   return (
//     <Wrapper {...props}>
//       <Container style={containerStyle} onPress={() => setOpened(!opened)}>
//         <Label>{getValue(selectedOption)}</Label>
//         <SimpleLineIcons name="arrow-down" size={18} color={theme.mutedText} />
//       </Container>
//       <OptionsContainer opened={opened}>
//         {options.map(option => (
//           <Option key={option.id} onPress={() => handleOptionChange(option.id)}>
//             {option.value}
//           </Option>
//         ))}
//       </OptionsContainer>
//     </Wrapper>
//   );
// };

// const Selector2 = ({
//   id,
//   selector,
//   onOptionChange,
//   containerStyle,
//   ...props
// }) => {
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(0);

//   useEffect(() => {
//     setOptions(selector.options);
//     setSelectedOption(selector.selected);
//   }, [selector]);

//   const getValue = optionId => {
//     const selectedValue = options.filter(option => option.id === optionId)[0];

//     if (selectedValue) {
//       return selectedValue.value;
//     }

//     return '';
//   };

//   const handleOptionChange = optionId => {
//     onOptionChange(id, optionId);
//   };

//   return (
//     <Wrapper2 {...props}>
//       <Container2 style={containerStyle}>
//         <Label2>{options.length > 0 && options[0].value}</Label2>
//       </Container2>
//       <OptionsContainer2>
//         {options.map(
//           (option, index) =>
//             index !== 0 && (
//               <Option2
//                 key={option.id}
//                 selected={getValue(selectedOption) === option.value}
//                 onPress={() => handleOptionChange(option.id)}>
//                 {option.value}
//               </Option2>
//             ),
//         )}
//       </OptionsContainer2>
//     </Wrapper2>
//   );
// };

const Selector = ({id, selector, onOptionChange, containerStyle, ...props}) => {
  const {t} = useTranslation('jobModal')
  const {openModal} = useModal();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOptions(selector.options);
    setSelectedOption(selector.selected);
  }, [selector]);

  const getValue = optionId => {
    const selectedValue = options.filter(option => option.id === optionId)[0];

    if (selectedValue) {
      return t(selectedValue.value);
    }

    return '';
  };

  const handleOptionChange = optionId => {
    onOptionChange(id, optionId);
    setOpened(false);
  };

  const handleOpenModal = () => {
    if (options.length <= 0) return;
    // console.log({
    //   label: options[0].value,
    //   options: options.filter((option, index) => index !== 0),
    //   selected: getValue(selectedOption),
    // })
    openModal('selector', {
      label: options[0].value,
      options: options.filter((option, index) => index !== 0),
      selected: getValue(selectedOption),
      onChooseOption: handleOptionChange,
    });
  };

  return (
    <Wrapper {...props}>
      <Container style={containerStyle} onPress={handleOpenModal}>
        <Label>{options.length > 0 && options[0].value}:</Label>
        <SelectedContainer>
          <Label style={{marginRight: 4}}>
            {selectedOption === 0
              ? t('Selecione')
              : getValue(selectedOption).length > 10
              ? `${getValue(selectedOption).substring(0, 10)}...`
              : getValue(selectedOption)}
          </Label>
          <MaterialIcons
            size={16}
            color="rgba(0, 0, 0, 0.1)"
            name="arrow-forward-ios"
          />
        </SelectedContainer>
      </Container>
    </Wrapper>
  );
};

export default Selector;
