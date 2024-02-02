import React, { Component } from "react";
import AppBackground from "../../../components/AppBackground";
import { Dimensions, FlatList, Keyboard, ScrollView, Text, View } from "react-native";
import CustomText from "../../../components/CustomText";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../utils";
import NavService from "../../../helpers/NavService";
import { _Challenges, _Home, _dailyGoal } from "../../../utils/dummyData";
import CustomList from "../../../components/CustomList";
import { LineChart } from "react-native-chart-kit";
import ListComponent from "../../../components/ListComponent";
import ModalPopup from "../../../containers/Popup/modalPopup/modalPopup";
import CustomCard from "../../../components/CustomCard";
import { connect } from "react-redux";
import { ASSETS_URL } from "../../../config/WebService";
import CustomTextInput from "../../../components/CustomTextInput";
import { appIcons } from "../../../assets";
import Img from "../../../components/Img";
import CustomButton from "../../../components/CustomButton";
import Toast from "react-native-toast-message";
import { loaderStart, loaderStop } from "../../../redux/actions/appAction";
import { addModerator } from "../../../redux/actions/authAction";
const { height, width } = Dimensions.get("screen");
export class AddModerator extends Component {
  constructor(props) {
    super(props);
    const { post, postType } = this.props.route.params;
    this.state = {
      name: "",
      email: '',
      password: ""
    };
  }
  componentDidMount() {
  }
  ItemSeparatorComponent = () => {
    return <View style={{ height: 10 }} />;
  };
  handleClose = () => {
    this?.setState({ isVisible: false });
  };

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
        this?.props?.addModerator(payload);
        NavService.goBack();
      }, 850);
    }
  }
  updatePost = () => {
    const url = "http://localhost:3017/api/edit-post";
    const { post } = this.props.route.params;

    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({ _id: post?._id, title: this.state.title, description: this.state.Description, });

    fetch(url, {
      method: "POST",
      headers: headers,
      body: body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        Keyboard.dismiss();
        Toast.show({
          text1: "Post Updated Successfully.",
          type: "success",
          visibilityTime: 3000,
        });
        NavService.navigate('Home')
        // Handle the data as needed
        // this?.setState({ allPost: data?.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        Keyboard.dismiss()

        // Handle errors
      });
  };
  createPost = (payload) => {
    this.props.loaderStart();

    const url = "http://localhost:3017/api/add-post";
    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        Keyboard.dismiss();

        this.props.loaderStop();
        Toast.show({
          text1: "Post Created Successfully.",
          type: "success",
          visibilityTime: 3000,
        });
        NavService.navigate("BottomTabs", 'Home')

      })
      .catch((error) => {
        this.props.loaderStop();

        console.error("Error:", error);
      }).finally(() => {
        this.props.loaderStop();

      });
  };

  render() {
    const { user } = this?.props;
    const { name, email, password } =
      this.state;
    const { post, postType } = this.props.route.params;
    return (
      <AppBackground
        homePress={() => NavService.navigate("MyProfile")}
        back
        title={"Create Moderator"}
      >
        <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, alignItems: 'center' }}>
          <View style={{ gap: 10, width: '100%' }}>
            <CustomTextInput
              label
              placeholderColor={colors?.lightGray}
              labeltext={'Name'}
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}

              placeholder={'Enter moderator name'}
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
              placeholder={'Enter moderator email'}
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
              placeholder={'Enter moderator password'}
              value={password}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({ password: value })}
              containerStyle={styles.emailinput}
            />
          </View>
          <CustomButton
            title="Create"
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
const mapDispatchToProps = (dispatch) => {
  return {
    loaderStart: () => dispatch(loaderStart()),
    loaderStop: () => dispatch(loaderStop()),
    addModerator: (moderatorData) => dispatch(addModerator(moderatorData)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddModerator);
