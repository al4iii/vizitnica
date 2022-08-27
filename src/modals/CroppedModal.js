import React from 'react';
import Modal from 'react-native-modal';




const CroppedModalWindow = ({
  type,
  isVisible,
  disabledClickOnBackground,
  component,
  onClose,
  ...props
}) => {
  const ContentModal = component;

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      style={{
        margin: 0,
        justifyContent: type === 'bottom' ? 'flex-end' : 'center',
        alignItems: 'center',
      }}
      onBackdropPress={!disabledClickOnBackground ? onClose : undefined}>
      <ContentModal closeModal={onClose} {...props} />
    </Modal>
  );
};

export default CroppedModalWindow;
