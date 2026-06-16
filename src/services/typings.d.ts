interface UserInfoVO {
  username: string;
  password?: string;
}

interface Result_UserInfo_ {
  success?: boolean;
  errorMessage?: string;
  data?: UserInfo;
  code?: number;
}
