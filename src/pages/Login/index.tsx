import logo from '@/assets/logo.png';
import { testregister } from '@/services/accountService';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';

const Login = () => {
  const handleSubmit = async (values: any) => {
    console.log('Login attempt:', values);
    // 这里可以添加实际的登录逻辑
    await testregister(values);
    message.success(`登录成功！用户名: ${values.username}`);
    history.push('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <LoginForm
        logo={logo}
        title="登录"
        subTitle="欢迎使用Alice.Xu的系统"
        onFinish={async (values) => {
          await handleSubmit(values);
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
            maxLength: 16, // 用户名最大长度16位
          }}
          placeholder={'用户名 (最多16位)'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
            {
              min: 3,
              message: '用户名至少3位',
            },
            {
              max: 16,
              message: '用户名最多16位',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
            strengthText: '密码至少8位，且包含大小写字母、数字和符号',
            maxLength: 18, // 密码最大长度18位
          }}
          placeholder={'密码 (最多18位)'}
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            {
              min: 6,
              message: '密码至少6位',
            },
            {
              max: 18,
              message: '密码最多18位',
            },
          ]}
        />
      </LoginForm>
    </div>
  );
};

export default Login;
