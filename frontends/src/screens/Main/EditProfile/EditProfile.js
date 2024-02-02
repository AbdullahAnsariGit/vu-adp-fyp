import { ScrollView, Keyboard, View } from 'react-native';
import React, { Component } from 'react';
import AppBackground from '../../../components/AppBackground';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import styles from './styles';
import ProfileImage from '../../../components/ProfileImage';
import { colors } from '../../../utils';
import { appIcons } from '../../../assets';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import ModalPopup from '../../../containers/Popup/modalPopup/modalPopup';
import NavService from '../../../helpers/NavService';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { updateProfile } from '../../../redux/actions/authAction';
import { ASSETS_URL } from '../../../config/WebService';
import { ValidationSchema } from '../../../../content/Login/Validation';
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }


  onSubmit = () => {
    const { name, email, password } = this.state;
    const { id } = this.props?.route?.params;
    // Regular expressions for email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (name === "" || !emailRegex.test(email) || !passwordRegex.test(password)) {
      return Toast.show({
        text1: 'Please update valid information',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Keyboard.dismiss();

      let payload = {
        id: id,
        name: name,
        email: email,
        password: password
      };

      console.log('payload of edit profile', payload);
      setTimeout(() => {
        this?.props?.updateProfile(payload);
        NavService.goBack();
      }, 850);
    }
  }

  render() {
    const {
      Firstname,
      phoneNumbers,
      DesiredName,
      Backimage,
      frontimage,
      profileImage,
      location,
      showModal,
    } = this.state;
    const updateImageInGallery = (path, mime, type) => {
      this.setState({
        profileImage: { path, mime, type },
      });
    };
    const updateImageInGallery1 = (path, mime, type) => {
      this.setState({
        frontimage: { path, mime, type },
      });
    };
    const updateImageInGallery2 = (path, mime, type) => {
      this.setState({
        Backimage: { path, mime, type },
      });
    };
    const handleGoBack = () => {
      this.setState({ showModal: false });
      NavService.goBack();
    };
    const handleClose = () => {
      this.setState({ showModal: false });
    };
    const saveAddress = (address, geometry, data) => {
      // console.log('data?.termsdata?.terms', data?.terms);
      this.setState({ address: address, location: geometry?.location });
    };
    const { user } = this?.props;
    return (
      <AppBackground
        showLogo={false}
        title={'Update Profile'}
        back
        backgroundImage={null}
        titleText={'Edit Profile'}
        onBack={() => this.props.navigation.goBack()}>
        <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, alignItems: 'center' }}>
          <View style={{ gap: 10, width: '100%' }}>
            <CustomTextInput
              label
              placeholderColor={colors?.lightGray}
              labeltext={'Name'}
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}

              placeholder={'Enter your new name'}
              value={name}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({ name: value })}
              containerStyle={styles.emailinput}
            />
            <CustomTextInput
              label
              placeholderColor={colors?.lightGray}
              labeltext={'Email'}
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={'Enter your new email'}
              value={email}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({ email: value })}
              containerStyle={styles.emailinput}
            />
            <CustomTextInput
              label
              labeltext={'Password'}
              placeholderColor={colors?.lightGray}
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={'Enter your new password'}
              value={password}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({ password: value })}
              containerStyle={styles.emailinput}
            />
          </View>
          <CustomButton
            title="Update"
            onPress={this.onSubmit}
            buttonStyle={styles.btn}
            textStyle={styles.btntext}
          />
        </View>
      </AppBackground>
    );
  }
}
function mapStateToProps({ authReducer: { user } }) {
  return {
    user,
  };
}
const actions = { updateProfile };
export default connect(mapStateToProps, actions)(EditProfile);
