import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const supportedLanguages = ['id', 'en', 'zh-CN'] as const;
export type LanguageCode = (typeof supportedLanguages)[number];

const resources = {
  id: {
    translation: {
      userMenu: {
        trustLevel: 'Tingkat Kepercayaan',
        administrator: 'Administrator',
        userManagement: 'Manajemen Pengguna',
        changePassword: 'Ubah Kata Sandi',
        logout: 'Keluar',
        language: 'Bahasa Antarmuka',
        languageSaved: 'Bahasa antarmuka berhasil diperbarui',
        languageSaveFailed: 'Gagal menyimpan bahasa antarmuka',
        passwordChangeSuccess: 'Kata sandi berhasil diubah',
        passwordChangeFailed: 'Gagal mengubah kata sandi',
        logoutSuccess: 'Berhasil keluar',
        logoutFailed: 'Gagal keluar',
        adminOnly: 'Hanya administrator yang dapat mengakses manajemen pengguna',
        newPassword: 'Kata sandi baru',
        newPasswordRequired: 'Masukkan kata sandi baru',
        passwordMin: 'Kata sandi minimal 6 karakter',
        newPasswordPlaceholder: 'Masukkan kata sandi baru (minimal 6 karakter)',
        confirmPassword: 'Konfirmasi kata sandi',
        confirmPasswordRequired: 'Konfirmasikan kata sandi baru',
        passwordMismatch: 'Kedua kata sandi tidak cocok',
        confirmNewPasswordPlaceholder: 'Masukkan ulang kata sandi baru',
        cancel: 'Batal',
        confirmChange: 'Konfirmasi perubahan'
      },
      languages: {
        id: 'Bahasa Indonesia',
        en: 'English',
        zhCN: '简体中文'
      }
    }
  },
  en: {
    translation: {
      userMenu: {
        trustLevel: 'Trust Level',
        administrator: 'Administrator',
        userManagement: 'User Management',
        changePassword: 'Change Password',
        logout: 'Log out',
        language: 'Interface Language',
        languageSaved: 'Interface language updated',
        languageSaveFailed: 'Could not save interface language',
        passwordChangeSuccess: 'Password updated',
        passwordChangeFailed: 'Could not update password',
        logoutSuccess: 'Logged out',
        logoutFailed: 'Could not log out',
        adminOnly: 'Only administrators can access user management',
        newPassword: 'New password',
        newPasswordRequired: 'Enter a new password',
        passwordMin: 'Password must contain at least 6 characters',
        newPasswordPlaceholder: 'Enter a new password (at least 6 characters)',
        confirmPassword: 'Confirm password',
        confirmPasswordRequired: 'Please confirm the new password',
        passwordMismatch: 'The passwords do not match',
        confirmNewPasswordPlaceholder: 'Enter the new password again',
        cancel: 'Cancel',
        confirmChange: 'Confirm change'
      },
      languages: {
        id: 'Bahasa Indonesia',
        en: 'English',
        zhCN: '简体中文'
      }
    }
  },
  'zh-CN': {
    translation: {
      userMenu: {
        trustLevel: '信任等级',
        administrator: '管理员',
        userManagement: '用户管理',
        changePassword: '修改密码',
        logout: '退出登录',
        language: '界面语言',
        languageSaved: '界面语言已更新',
        languageSaveFailed: '无法保存界面语言',
        passwordChangeSuccess: '密码修改成功',
        passwordChangeFailed: '修改密码失败',
        logoutSuccess: '已退出登录',
        logoutFailed: '退出登录失败',
        adminOnly: '只有管理员可以访问用户管理',
        newPassword: '新密码',
        newPasswordRequired: '请输入新密码',
        passwordMin: '密码至少需要 6 个字符',
        newPasswordPlaceholder: '请输入新密码（至少 6 个字符）',
        confirmPassword: '确认密码',
        confirmPasswordRequired: '请确认新密码',
        passwordMismatch: '两次输入的密码不一致',
        confirmNewPasswordPlaceholder: '请再次输入新密码',
        cancel: '取消',
        confirmChange: '确认修改'
      },
      languages: {
        id: 'Bahasa Indonesia',
        en: 'English',
        zhCN: '简体中文'
      }
    }
  }
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'id',
  fallbackLng: 'id',
  supportedLngs: [...supportedLanguages],
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});

export default i18n;
