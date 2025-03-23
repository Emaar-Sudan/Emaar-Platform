import React, { useState } from 'react';
import { ThumbsUp, Heart, Laugh, Angry, Frown, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const reactions = [
  { icon: ThumbsUp, name: 'like', color: 'text-blue-500' },
  { icon: Heart, name: 'love', color: 'text-red-500' },
  { icon: Laugh, name: 'haha', color: 'text-yellow-500' },
  { icon: Star, name: 'celebrate', color: 'text-green-500' },
  { icon: Angry, name: 'angry', color: 'text-orange-500' },
  { icon: Frown, name: 'sad', color: 'text-purple-500' }
];

const NewsReactions = () => {
  const { t } = useLanguage();
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);

  const handleReaction = (reactionName: string) => {
    setSelectedReaction(reactionName);
    setShowReactions(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowReactions(!showReactions)}
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
      >
        {selectedReaction ? (
          <>
            {React.createElement(
              reactions.find(r => r.name === selectedReaction)?.icon || ThumbsUp,
              { className: `w-5 h-5 ${reactions.find(r => r.name === selectedReaction)?.color}` }
            )}
            <span>{t(`news.reactions.${selectedReaction}`)}</span>
          </>
        ) : (
          <>
            <ThumbsUp className="w-5 h-5" />
            <span>{t('news.react')}</span>
          </>
        )}
      </button>

      {showReactions && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
          {reactions.map((reaction) => (
            <button
              key={reaction.name}
              onClick={() => handleReaction(reaction.name)}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${reaction.color}`}
              title={t(`news.reactions.${reaction.name}`)}
            >
              <reaction.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsReactions;