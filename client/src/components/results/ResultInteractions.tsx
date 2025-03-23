import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThumbsUp, Heart, Star, Smile, Award } from 'lucide-react';
import { useReactions } from '../../hooks/useReactions';

interface ResultInteractionsProps {
  resultId: string;
}

type Reaction = 'like' | 'love' | 'celebrate' | 'support' | 'star';

interface ReactionConfig {
  icon: typeof ThumbsUp;
  color: string;
}

const ResultInteractions: React.FC<ResultInteractionsProps> = ({ resultId }) => {
  const { t } = useLanguage();
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);
  const { addReaction, isLoading } = useReactions(resultId);

  const reactions: Record<Reaction, ReactionConfig> = {
    like: { icon: ThumbsUp, color: 'text-blue-500' },
    love: { icon: Heart, color: 'text-red-500' },
    celebrate: { icon: Award, color: 'text-yellow-500' },
    support: { icon: Star, color: 'text-purple-500' },
    star: { icon: Smile, color: 'text-green-500' }
  };

  const handleReaction = async (reaction: Reaction) => {
    if (isLoading) return;

    setSelectedReaction(reaction);
    setShowReactions(false);
    await addReaction(reaction);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowReactions(!showReactions)}
        disabled={isLoading}
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
      >
        {selectedReaction ? (
          React.createElement(reactions[selectedReaction].icon, {
            className: `w-5 h-5 ${reactions[selectedReaction].color}`
          })
        ) : (
          <ThumbsUp className="w-5 h-5" />
        )}
      </button>

      {showReactions && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex gap-2 z-10">
          {(Object.entries(reactions) as [Reaction, ReactionConfig][]).map(([key, { icon: Icon, color }]) => (
            <button
              key={key}
              onClick={() => handleReaction(key)}
              disabled={isLoading}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${color} disabled:opacity-50`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultInteractions;
