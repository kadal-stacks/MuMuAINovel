import { useState, useEffect } from 'react';
import { Dropdown, Avatar, Space, Typography, message, Modal, Form, Input, Button } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  CrownOutlined,
  LockOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { authApi } from '../services/api';
import type { User } from '../types';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../i18n';

const { Text } = Typography;

export default function UserMenu() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordForm] = Form.useForm();
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await authApi.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Failed to load current user:', error);
    }
  };

  const handleChangeLanguage = async (language: LanguageCode) => {
    try {
      await authApi.setPreferredLanguage(language);
      await i18n.changeLanguage(language);
      setCurrentUser((previous) =>
        previous ? { ...previous, preferred_language: language } : previous
      );
      message.success(t('userMenu.languageSaved'));
    } catch (error) {
      console.error('Failed to update interface language:', error);
      message.error(t('userMenu.languageSaveFailed'));
    }
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key.startsWith('language:')) {
      const language = key.slice('language:'.length) as LanguageCode;
      if (language === 'id' || language === 'en' || language === 'zh-CN') {
        void handleChangeLanguage(language);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      message.success(t('userMenu.logoutSuccess'));
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      message.error(t('userMenu.logoutFailed'));
    }
  };

  const handleShowUserManagement = () => {
    if (!currentUser?.is_admin) {
      message.warning(t('userMenu.adminOnly'));
      return;
    }
    navigate('/user-management');
  };

  const handleChangePassword = async (values: { newPassword: string }) => {
    try {
      setChangingPassword(true);
      await authApi.setPassword(values.newPassword);
      message.success(t('userMenu.passwordChangeSuccess'));
      setShowChangePassword(false);
      changePasswordForm.resetFields();
    } catch (error: any) {
      console.error('Password update failed:', error);
      message.error(error.response?.data?.detail || t('userMenu.passwordChangeFailed'));
    } finally {
      setChangingPassword(false);
    }
  };

  const activeLanguage = currentUser?.preferred_language || 'id';
  const menuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '8px 0' }}>
          <Text strong>{currentUser?.display_name || currentUser?.username}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {t('userMenu.trustLevel')}: {currentUser?.trust_level}
            {currentUser?.is_admin && ' · ' + t('userMenu.administrator')}
          </Text>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    ...(currentUser?.is_admin ? [
      {
        key: 'user-management',
        icon: <TeamOutlined />,
        label: t('userMenu.userManagement'),
        onClick: handleShowUserManagement,
      },
      { type: 'divider' as const },
    ] : []),
    {
      key: 'language',
      icon: <GlobalOutlined />,
      label: t('userMenu.language'),
      children: [
        { key: 'language:id', label: (activeLanguage === 'id' ? '✓ ' : '') + t('languages.id') },
        { key: 'language:en', label: (activeLanguage === 'en' ? '✓ ' : '') + t('languages.en') },
        { key: 'language:zh-CN', label: (activeLanguage === 'zh-CN' ? '✓ ' : '') + t('languages.zhCN') },
      ],
    },
    {
      key: 'change-password',
      icon: <LockOutlined />,
      label: t('userMenu.changePassword'),
      onClick: () => setShowChangePassword(true),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('userMenu.logout'),
      onClick: handleLogout,
    },
  ];

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }} placement="bottomRight">
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
            minWidth: 'max-content',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 24,
            border: '1px solid var(--color-border)',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-card)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-container)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-elevated)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <Avatar
              src={currentUser.avatar_url}
              icon={<UserOutlined />}
              size={40}
              style={{
                backgroundColor: 'var(--color-primary)',
                border: '3px solid #fff',
                boxShadow: 'var(--shadow-card)',
              }}
            />
            {currentUser.is_admin && (
              <div style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 18,
                height: 18,
                background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}>
                <CrownOutlined style={{ fontSize: 9, color: '#fff' }} />
              </div>
            )}
          </div>
          <Space direction="vertical" size={0} style={{
            display: window.innerWidth <= 768 ? 'none' : 'flex',
            flexShrink: 0,
            minWidth: 'max-content',
          }}>
            <Text strong style={{
              color: 'var(--color-text-primary)',
              fontSize: 14,
              lineHeight: '20px',
              whiteSpace: 'nowrap',
            }}>
              {currentUser.display_name || currentUser.username}
            </Text>
            <Text style={{
              color: 'var(--color-text-secondary)',
              fontSize: 12,
              lineHeight: '18px',
              whiteSpace: 'nowrap',
            }}>
              {currentUser.is_admin
                ? '👑 ' + t('userMenu.administrator')
                : '🎖️ ' + t('userMenu.trustLevel') + ' ' + currentUser.trust_level}
            </Text>
          </Space>
        </div>
      </Dropdown>

      <Modal
        title={t('userMenu.changePassword')}
        open={showChangePassword}
        onCancel={() => {
          setShowChangePassword(false);
          changePasswordForm.resetFields();
        }}
        footer={null}
        width={480}
        centered
      >
        <Form
          form={changePasswordForm}
          layout="vertical"
          onFinish={handleChangePassword}
          autoComplete="off"
        >
          <Form.Item
            label={t('userMenu.newPassword')}
            name="newPassword"
            rules={[
              { required: true, message: t('userMenu.newPasswordRequired') },
              { min: 6, message: t('userMenu.passwordMin') },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('userMenu.newPasswordPlaceholder')}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            label={t('userMenu.confirmPassword')}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: t('userMenu.confirmPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('userMenu.passwordMismatch')));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('userMenu.confirmNewPasswordPlaceholder')}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setShowChangePassword(false);
                changePasswordForm.resetFields();
              }}>
                {t('userMenu.cancel')}
              </Button>
              <Button type="primary" htmlType="submit" loading={changingPassword}>
                {t('userMenu.confirmChange')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
