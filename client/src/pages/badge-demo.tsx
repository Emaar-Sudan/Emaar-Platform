// pages/badge-demo.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const variants = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info'
] as const;

const BadgeDemo = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">{t('components.badge.title')}</h1>

      {/* Basic Badges */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t('components.badge.basic')}</h2>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {t(`components.badge.variants.${variant}`)}
            </Badge>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t('components.badge.sizes')}</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="sm" variant="primary">
            {t('components.badge.smallSize')}
          </Badge>
          <Badge size="md" variant="primary">
            {t('components.badge.mediumSize')}
          </Badge>
          <Badge size="lg" variant="primary">
            {t('components.badge.largeSize')}
          </Badge>
        </div>
      </section>

      {/* Rounded Variants */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t('components.badge.rounded')}</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary" rounded="default">
            {t('components.badge.defaultRounded')}
          </Badge>
          <Badge variant="primary" rounded="full">
            {t('components.badge.fullyRounded')}
          </Badge>
        </div>
      </section>

      {/* With Dots */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t('components.badge.withDots')}</h2>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant} withDot>
              {t(`components.badge.status.${variant}`)}
            </Badge>
          ))}
        </div>
      </section>

      {/* Examples in Context */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{t('components.badge.examples')}</h2>
        <div className="space-y-4">
          {/* Notification Example */}
          <div className="flex items-center gap-2">
            <Badge variant="error" withDot>
              3 {t('components.badge.newNotifications')}
            </Badge>
          </div>

          {/* Status Example */}
          <div className="flex items-center gap-2">
            <Badge variant="success" withDot rounded="full">
              {t('components.badge.online')}
            </Badge>
          </div>

          {/* Feature Tag Example */}
          <div className="flex items-center gap-2">
            <Badge variant="info" rounded="full">
              {t('components.badge.beta')}
            </Badge>
          </div>

          {/* Priority Example */}
          <div className="flex items-center gap-2">
            <Badge variant="warning">
              {t('components.badge.highPriority')}
            </Badge>
          </div>
        </div>
      </section>

      {/* Custom Styles Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t('components.badge.customStyles')}</h2>
        <div className="flex flex-wrap gap-4">
          <Badge 
            variant="primary" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white ring-0"
          >
            {t('components.badge.gradient')}
          </Badge>
          <Badge 
            variant="default"
            className="border-2 border-dashed border-gray-400 bg-transparent"
          >
            {t('components.badge.outlined')}
          </Badge>
          <Badge 
            variant="success"
            className="animate-pulse"
          >
            {t('components.badge.animated')}
          </Badge>
        </div>
      </section>
    </div>
  );
};

export default BadgeDemo;
