import { Button } from 'antd';
// ant kako icon
import { RiKakaoTalkFill } from 'react-icons/ri';



const SignInWithKakaoButton = ({ ...props }) => (
  <Button icon={<RiKakaoTalkFill />} style={{
    backgroundColor: '#fee500',
    width: '100%'
  }} {...props}>
    Login in with Kakao
  </Button>
);

export const OAuth = {
//   BasicButton,
//   GoogleButton: SignInWithGoogleButton,
  KakaoButton: SignInWithKakaoButton,
//   EmailButton: SignInWithEmailButton,
};

// export default {
//   OAuth: OAuth,
// };