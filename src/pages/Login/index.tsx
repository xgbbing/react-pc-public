import logo from '@/assets/logo.png';
import SliderCaptchaBlock, {
  type CaptchaStatus,
} from '@/components/SliderCaptchaBlock';
import { login, register } from '@/services/accountService';
import { sha256 } from '@/utils/crypto';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { App, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('pending');
  const captchaRef = useRef<{ refresh: (resetErrorCount?: boolean) => void }>(
    null,
  );

  const { message } = App.useApp();

  // 切换登录/注册模式时重置验证码状态
  useEffect(() => {
    setCaptchaStatus('pending');
  }, [isRegister]);

  const handleSubmit = async (values: any) => {
    // 注册模式下验证码未通过时阻止提交（兜底校验）
    if (isRegister && captchaStatus !== 'success') {
      message.warning('请先完成滑块验证');
      return;
    }

    const payload = {
      ...values,
      password: sha256(values.password),
    };

    if (isRegister) {
      await register(payload);
      await login(payload);
      message.success(`注册成功！用户名: ${values.username}`);
    } else {
      await login(payload);
      message.success(`登录成功！用户名: ${values.username}`);
    }
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
        title={isRegister ? '注册' : '登录'}
        subTitle="欢迎使用Alice.Xu的系统"
        submitter={{
          searchConfig: {
            submitText: isRegister ? '注册并登录' : '登 录',
          },
          submitButtonProps: {
            disabled: isRegister && captchaStatus !== 'success',
          },
        }}
        onFinish={async (values) => {
          await handleSubmit(values);
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
            minLength: 2, // 用户名最小长度2位
            maxLength: 18, // 用户名最大长度18位
          }}
          placeholder={'用户名 (2-18位)'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
            {
              min: 2,
              message: '用户名至少2位',
            },
            {
              max: 18,
              message: '用户名最多18位',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
            strengthText: '密码6-18位',
            minLength: 6, // 密码最小长度6位
            maxLength: 18, // 密码最大长度18位
          }}
          placeholder={'密码 (6-18位)'}
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

        {/* 注册模式下显示滑块验证码 */}
        {isRegister && (
          <SliderCaptchaBlock
            ref={captchaRef}
            onStatusChange={setCaptchaStatus}
          />
        )}

        {isRegister && captchaStatus !== 'success' && (
          <div
            style={{
              textAlign: 'center',
              color: '#999',
              fontSize: 12,
              marginTop: -8,
              marginBottom: 8,
            }}
          >
            {captchaStatus === 'error'
              ? '验证失败，请重试'
              : '请完成滑块验证后点击注册'}
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          <Button type="link" onClick={() => setIsRegister((prev) => !prev)}>
            {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
          </Button>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
