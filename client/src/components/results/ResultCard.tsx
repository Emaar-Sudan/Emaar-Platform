import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Building2, Award, FileText, CheckCircle, Trophy } from 'lucide-react';
import { formatDate } from '@/utils/dateFormatters';
import ResultInteractions from './ResultInteractions';
import ShareButtons from './ShareButtons';
import type { Result } from '@/services/api/results';

interface ResultCardProps {
  result: Result;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { t, language } = useLanguage();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'auctions':
        return 'bg-green-100 text-green-800';
      case 'bids':
        return 'bg-blue-100 text-blue-800';
      case 'jobs':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // التحقق مما إذا كان الفائز مصفوفة
  const winners = Array.isArray(result.winner) ? result.winner : [result.winner];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={result.image_path}
          alt={result.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(result.type)}`}>
            {t(`results.types.${result.type}`)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{result.title}</h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{result.entity}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(result.date, language)}</span>
            </div>
            {result.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{result.location}</span>
              </div>
            )}
          </div>

          <p className="text-gray-600">{result.description}</p>

          {result.selection_method && (
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4" />
              <span>{result.selection_method}</span>
            </div>
          )}

          {/* Winners Section with Enhanced Styling */}
          {winners.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  {winners.length > 1 ? t('results.winners') : t('results.winner')}
                </span>
              </div>
              <div className="space-y-3">
                {winners.map((winner, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md bg-white border border-green-100 ${
                      index !== winners.length - 1 ? 'mb-2' : ''
                    }`}
                  >
                    <h4 className="font-bold text-green-700">{winner}</h4>
                    {(result.technical_points || result.financial_points) && (
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        {result.technical_points && (
                          <div className="text-sm text-green-600">
                            <span className="font-medium">{t('results.technicalPoints')}:</span>{' '}
                            {result.technical_points}
                          </div>
                        )}
                        {result.financial_points && (
                          <div className="text-sm text-green-600">
                            <span className="font-medium">{t('results.financialPoints')}:</span>{' '}
                            {result.financial_points}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.notes && (
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-4 h-4" />
              <span>{result.notes}</span>
            </div>
          )}

          {/* Interactions Section */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <ResultInteractions resultId={result.id} />
            <ShareButtons 
              url={window.location.href} 
              title={result.title} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;