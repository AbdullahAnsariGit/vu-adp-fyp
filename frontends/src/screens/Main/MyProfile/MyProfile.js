//MyProfile

import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import { appIcons, appImages } from '../../../assets';
import CustomText from '../../../components/CustomText';
import ProfileImage from '../../../components/ProfileImage';
import appStyles from '../../appStyles';
import { colors, size } from '../../../utils';
import { event, itemInfo } from '../../../utils/dummyData';
import CustomSingleList from '../../../components/CustomSingleList';
import NavService from '../../../helpers/NavService';
import { loginUser } from '../../../redux/actions/authAction';
import styles from './styles';
import { ASSETS_URL } from '../../../config/WebService';

class Profile extends Component {
  state = {
    profileImage: null,
  };
  render() {
    const { profileImage } = this.state;
    const { user } = this?.props;
    console.log('usjjjjer', user)

    const ItemSeparatorComponent = () => {
      return <View style={styles.lineSeparator} />;
    };
    console.log('userinmyprofileeeee', user)
    return (
      <AppBackground
        back
        title={'My Profile'}
        Rightimage
        rightIcon={appIcons.pen}
        OnPressRight={() => NavService.navigate('EditProfile', { id: user?._id })}
        // notification
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              appStyles.directionColumn,
              appStyles.alignCenter,
              appStyles.borderBottomColor,
              { gap: 5, marginTop: 20 }
            ]}>
            <View style={styles.Profile}>
              <ProfileImage
                ViewStyle={{
                  justifyContent: "center",
                  marginTop: 0,
                  borderColor: null,

                  borderRadius: 140,
                }}
                widthsize={100}
                heightsize={100}
                ImageborderRadius={110}
                ViewborderColor={colors.secondary}
                innerAsset={profileImage == null ? true : false}
                imageUri={appIcons?.userPlaceholder}
                label
                name={user?.name}
              />
            </View>


            <View style={{ marginTop: 14, flexDirection: 'row', gap: 10, borderTopWidth: 1, borderBottomWidth: 1, width: "100%", paddingHorizontal: 10, paddingVertical: 8 }}>
              <CustomText
                text={`Name  :`}
                size={size.normal}
                style={{
                  ...appStyles.family_Montserrat_Semi_Bold,
                  color: colors.secondary,

                }}
              />
              <CustomText
                text={`${user?.name}`}
                size={size.normal}
                style={{
                  ...appStyles.family_Montserrat_Semi_Bold,
                  color: colors.secondary,

                }}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 10, borderBottomWidth: 1, width: "100%", paddingHorizontal: 10, paddingVertical: 8 }}>
              <CustomText
                text={`Email  :`}
                size={size.normal}
                style={{
                  ...appStyles.family_Montserrat_Semi_Bold,
                  color: colors.secondary,

                }}
              />
              <CustomText
                text={`${user?.email}`}
                size={size.normal}
                style={{
                  ...appStyles.family_Montserrat_Semi_Bold,
                  color: colors.secondary,

                }}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 10, borderBottomWidth: 1, width: "100%", paddingHorizontal: 10, paddingVertical: 8 }}>
              <CustomText
                text={`Role  :`}
                size={size.normal}
                style={{
                  ...appStyles.family_Montserrat_Semi_Bold,
                  color: colors.secondary,

                }}
              />
              <CustomText
                text={`${user?.role_type}`}
                size={size.normal}
                style={{
                  ...appStyles.family_Montserrat_Semi_Bold,
                  color: colors.secondary,

                }}
              />
            </View>
          </View>

        </ScrollView>
      </AppBackground>
    );
  }
}

function mapStateToProps({ authReducer }) {
  return {
    user: authReducer?.user,
  };
}

const actions = { loginUser };
export default connect(mapStateToProps, actions)(Profile);
