import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Result, Button, Modal, Input, message } from 'antd';
import { authApi } from '../services/api';
import AnnouncementModal from '../components/AnnouncementModal';
import { useTranslation } from 'react-i18next';

export default function AuthCallback() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settingPassword, setSettingPassword] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 后端会通过 Cookie 自动设置认证信息
        // 这里只需要验证登录状态
        const currentUser = await authApi.getCurrentUser();
        try {
          await i18n.changeLanguage(currentUser.preferred_language || 'id');
        } catch (localeError) {
          console.warn('Could not apply the saved interface language:', localeError);
        }

        // 检查是否是首次登录（通过 Cookie 标记）
        const isFirstLogin = document.cookie.includes('first_login=true');
        
        setStatus('success');

        if (isFirstLogin) {
          // 首次登录：生成默认密码并显示提示
          const defaultPassword = `${currentUser.username}@666`;
          const pwdStatus = {
            has_password: false,
            has_custom_password: false,
            username: currentUser.username,
            default_password: defaultPassword
          };
          setPasswordStatus(pwdStatus);

          // 清除首次登录标记 Cookie
          document.cookie = 'first_login=; path=/; max-age=0';

          // 显示密码初始化弹窗
          setTimeout(() => {
            setShowPasswordModal(true);
          }, 1000);
          return;
        }

        // 非首次登录：正常流程
        // 从 sessionStorage 获取重定向地址
        const redirect = sessionStorage.getItem('login_redirect') || '/';
        sessionStorage.removeItem('login_redirect');

        // 检查是否永久隐藏公告或今日已隐藏
        const hideForever = localStorage.getItem('announcement_hide_forever');
        const hideToday = localStorage.getItem('announcement_hide_today');
        const today = new Date().toDateString();

        if (hideForever === 'true' || hideToday === today) {
          // 延迟一下再跳转，让用户看到成功提示
          setTimeout(() => {
            navigate(redirect);
          }, 1000);
        } else {
          // 延迟一下再显示公告，让用户看到成功提示
          setTimeout(() => {
            setShowAnnouncement(true);
          }, 1000);
        }
      } catch (error) {
        console.error('登录失败:', error);
        setStatus('error');
        setErrorMessage(t('auth.loginFailed'));
      }
    };

    handleCallback();
  }, [navigate, i18n]);

  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4D8088 0%, #5F9EA8 100%)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <div style={{ marginTop: 20, color: 'white', fontSize: 16 }}>
            {t('auth.processingLogin')}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4D8088 0%, #5F9EA8 100%)',
      }}>
        <Result
          status="error"
          title={t('auth.loginFailedTitle')}
          subTitle={errorMessage}
          extra={
            <Button type="primary" onClick={() => navigate('/login')}>
              {t('auth.returnToLogin')}
            </Button>
          }
          style={{ background: 'white', padding: 40, borderRadius: 8 }}
        />
      </div>
    );
  }

  const handleAnnouncementClose = () => {
    setShowAnnouncement(false);
    const redirect = sessionStorage.getItem('login_redirect') || '/';
    sessionStorage.removeItem('login_redirect');
    navigate(redirect);
  };

  const handleDoNotShowToday = () => {
    // 设置今日不再显示
    const today = new Date().toDateString();
    localStorage.setItem('announcement_hide_today', today);
  };

  const handleNeverShow = () => {
    // 设置永久不再显示
    localStorage.setItem('announcement_hide_forever', 'true');
  };

  const handleSetPassword = async () => {
    // 如果没有输入新密码，使用默认密码
    const passwordToSet = newPassword || passwordStatus?.default_password;
    
    if (!passwordToSet) {
      message.error(t('auth.newPasswordRequired'));
      return;
    }
    if (passwordToSet.length < 6) {
      message.error(t('auth.passwordMinLength'));
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      message.error(t('auth.passwordMismatch'));
      return;
    }

    setSettingPassword(true);
    try {
      // 首次登录使用初始化接口，后续使用修改接口
      const isFirstLogin = !passwordStatus?.has_password;
      if (isFirstLogin) {
        await authApi.initializePassword(passwordToSet);
        message.success(t('auth.passwordInitialized'));
      } else {
        await authApi.setPassword(passwordToSet);
        message.success(t('auth.passwordSetSuccess'));
      }
      setShowPasswordModal(false);

      // 继续后续流程
      const redirect = sessionStorage.getItem('login_redirect') || '/';
      sessionStorage.removeItem('login_redirect');

      const hideForever = localStorage.getItem('announcement_hide_forever');
      const hideToday = localStorage.getItem('announcement_hide_today');
      const today = new Date().toDateString();

      if (hideForever === 'true' || hideToday === today) {
        setTimeout(() => {
          navigate(redirect);
        }, 500);
      } else {
        setTimeout(() => {
          setShowAnnouncement(true);
        }, 500);
      }
    } catch (error) {
      message.error(t('auth.passwordSetFailed'));
    } finally {
      setSettingPassword(false);
    }
  };

  const handleSkipPasswordSetting = async () => {
    // 首次登录时，如果跳过设置，使用默认密码初始化
    const isFirstLogin = !passwordStatus?.has_password;
    if (isFirstLogin && passwordStatus?.default_password) {
      try {
        await authApi.initializePassword(passwordStatus.default_password);
      } catch (error) {
        console.error('初始化默认密码失败:', error);
      }
    }

    setShowPasswordModal(false);

    // 继续后续流程
    const redirect = sessionStorage.getItem('login_redirect') || '/';
    sessionStorage.removeItem('login_redirect');

    const hideForever = localStorage.getItem('announcement_hide_forever');
    const hideToday = localStorage.getItem('announcement_hide_today');
    const today = new Date().toDateString();

    if (hideForever === 'true' || hideToday === today) {
      setTimeout(() => {
        navigate(redirect);
      }, 500);
    } else {
      setTimeout(() => {
        setShowAnnouncement(true);
      }, 500);
    }
  };

  return (
    <>
      <AnnouncementModal
        visible={showAnnouncement}
        onClose={handleAnnouncementClose}
        onDoNotShowToday={handleDoNotShowToday}
        onNeverShow={handleNeverShow}
      />

      <Modal
        title={t('auth.passwordSetupTitle')}
        open={showPasswordModal}
        centered
        onOk={handleSetPassword}
        onCancel={handleSkipPasswordSetting}
        confirmLoading={settingPassword}
        okText={t('auth.passwordSetupOk')}
        cancelText={t('auth.passwordSetupSkip')}
        width={500}
      >
        <div style={{ marginBottom: 20 }}>
          <p>{t('auth.linuxDoAuthorized')}</p>
          <p>{t('auth.defaultPasswordIntro')}</p>
          {passwordStatus?.default_password && (
            <div style={{
              background: '#f0f2f5',
              padding: 12,
              borderRadius: 4,
              marginTop: 12
            }}>
              <strong>{t('auth.accountLabel')}:</strong> {passwordStatus.username}<br />
              <strong>{t('auth.defaultPasswordLabel')}:</strong> <code style={{
                background: '#fff',
                padding: '2px 8px',
                borderRadius: 3,
                color: '#1890ff',
                fontSize: 14
              }}>{passwordStatus.default_password}</code>
            </div>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <label>{t('auth.newPasswordLabel')}:</label>
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t('auth.newPasswordPlaceholder')}
              style={{ marginTop: 4 }}
            />
          </div>
          <div>
            <label>{t('auth.confirmPasswordLabel')}:</label>
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              style={{ marginTop: 4 }}
            />
          </div>
        </div>
      </Modal>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4D8088 0%, #5F9EA8 100%)',
      }}>
        <Result
          status="success"
          title={t('auth.loginSuccess')}
          subTitle={showPasswordModal ? t('auth.passwordSetupPending') : (showAnnouncement ? t('auth.welcomePending') : t('auth.redirecting'))}
          style={{ background: 'white', padding: 40, borderRadius: 8 }}
        />
      </div>
    </>
  );
}