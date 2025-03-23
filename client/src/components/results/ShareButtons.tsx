import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Facebook, Link2 } from 'lucide-react'; // إزالة أيقونة Twitter
import { X as XIcon } from 'lucide-react'; // إضافة أيقونة X
import { useLanguage } from '../../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const { t } = useLanguage();

  const shareButtons = [
    {
      name: 'facebook',
      icon: Facebook,
      color: 'text-blue-600',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'x', // تعديل الاسم ليعكس التغيير
      icon: XIcon, // استخدام أيقونة X الجديدة
      color: 'text-black', // اللون الافتراضي لأيقونة X
      shareUrl: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'whatsapp',
      icon: FaWhatsapp,
      color: 'text-green-500',
      shareUrl: `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`
    }
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('results.linkCopied'));
    } catch (error) {
      toast.error(t('results.copyError'));
    }
  };

  return (
    <div className="flex items-center gap-4">
      {shareButtons.map((button) => (
        <a
          key={button.name}
          href={button.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${button.color}`}
          title={t(`results.share.${button.name}`)}
        >
          <button.icon className="w-5 h-5" />
        </a>
      ))}
      <button
        onClick={copyLink}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
        title={t('results.share.copyLink')}
      >
        <Link2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ShareButtons;