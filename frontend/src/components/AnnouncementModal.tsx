import { Modal, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AnnouncementModalProps {
  visible: boolean;
  onClose: () => void;
  onDoNotShowToday: () => void;
  onNeverShow: () => void;
}

export default function AnnouncementModal({ visible, onClose, onDoNotShowToday, onNeverShow }: AnnouncementModalProps) {
  const { t } = useTranslation();
  const [qqImageError, setQqImageError] = useState(false);
  const [wxImageError, setWxImageError] = useState(false);

  useEffect(() => {
    if (visible) {
      setQqImageError(false);
      setWxImageError(false);
    }
  }, [visible]);

  const handleDoNotShowToday = () => {
    onDoNotShowToday();
    onClose();
  };

  const handleNeverShow = () => {
    onNeverShow();
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-primary)',
          textAlign: 'center',
        }}>
          {t('announcement.title')}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={
        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button
            onClick={handleDoNotShowToday}
            size="large"
            style={{
              borderRadius: '8px',
              height: '40px',
              fontSize: '14px',
            }}
          >
            {t('announcement.doNotShowToday')}
          </Button>
          <Button
            type="primary"
            onClick={handleNeverShow}
            size="large"
            style={{
              borderRadius: '8px',
              height: '40px',
              fontSize: '14px',
              background: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              boxShadow: 'var(--shadow-primary)',
            }}
          >
            {t('announcement.neverShow')}
          </Button>
        </Space>
      }
      width={800}
      centered
      styles={{
        body: {
          padding: '24px',
          background: 'var(--color-bg-container)',
        },
        header: {
          background: 'linear-gradient(135deg, rgba(77, 128, 136, 0.08) 0%, rgba(248, 246, 241, 0.95) 100%)',
          borderBottom: '1px solid var(--color-border-secondary)',
          padding: '20px 24px',
        },
        footer: {
          background: 'var(--color-bg-container)',
          borderTop: '1px solid var(--color-border-secondary)',
          padding: '16px 24px',
        },
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          marginBottom: '16px',
          fontSize: '16px',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.6',
        }}>
          <p>{t('announcement.welcomeCommunity')}</p>
          <p>{t('announcement.intro')}</p>
          <ul style={{
            textAlign: 'left',
            marginLeft: '40px',
            marginTop: '12px',
            marginBottom: '20px',
          }}>
            <li>{t('announcement.featureExchange')}</li>
            <li>{t('announcement.featureUpdates')}</li>
            <li>{t('announcement.featureFeedback')}</li>
            <li>{t('announcement.featureInspiration')}</li>
          </ul>
          <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            {t('announcement.qrPrompt')}
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '24px',
          padding: '20px',
          background: 'var(--color-bg-layout)',
          borderRadius: '8px',
          flexWrap: 'wrap',
        }}>
          {/* QQ 二维码 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '280px',
          }}>
            <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px', fontSize: '15px' }}>
              {t('announcement.qqGroup')}
            </p>
            {!qqImageError ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--color-bg-container)',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <img
                  src="/qq.jpg"
                  alt={t('announcement.qqQrAlt')}
                  style={{
                    maxWidth: '280px',
                    maxHeight: '280px',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                  onError={() => setQqImageError(true)}
                />
              </div>
            ) : (
              <div style={{
                width: '280px',
                height: '280px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--color-bg-container)',
                borderRadius: '8px',
                color: '#999',
              }}>
                <p>{t('announcement.qrLoadFailed')}</p>
              </div>
            )}
          </div>

          {/* 微信二维码 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '280px',
          }}>
            <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px', fontSize: '15px' }}>
              {t('announcement.wechatGroup')}
            </p>
            {!wxImageError ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--color-bg-container)',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <img
                  src="/WX.png"
                  alt={t('announcement.wechatQrAlt')}
                  style={{
                    maxWidth: '280px',
                    maxHeight: '280px',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                  onError={() => setWxImageError(true)}
                />
              </div>
            ) : (
              <div style={{
                width: '280px',
                height: '280px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--color-bg-container)',
                borderRadius: '8px',
                color: '#999',
              }}>
                <p>{t('announcement.qrLoadFailed')}</p>
              </div>
            )}
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'var(--color-warning-bg)',
          borderRadius: '8px',
          border: '1px solid var(--color-warning-border)',
          fontSize: '14px',
          color: 'var(--color-warning)',
        }}>
          {t('announcement.visibilityTip')}
        </div>
      </div>
    </Modal>
  );
}