import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

// Components
import { PaymentLayout } from '../components/payment/PaymentLayout';
import { PaymentContainer } from '../components/payment/PaymentContainer';
import PaymentConfirmation from '../components/payment/PaymentConfirmation';

// Services
import { paymentsApi} from '@/services/api/payments';
import { tenderApplicationsApi } from '@/services/api/tenderApplications';
import { auctionApplicationsApi } from '@/services/api/auctionApplications';

// Types
interface PaymentDetails {
  type: 'tender' | 'auction';
  id: string;
  amount: number;
  itemNumber: string;
  formData: Record<string, any>;
}

interface PaymentFormData {
  paymentMethod?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Validate payment details function
  const validatePaymentDetails = (state: any): PaymentDetails => {
    if (!state) {
      throw new Error('NO_PAYMENT_DATA');
    }

    const { type, id, amount, itemNumber, formData } = state;

    if (!type || !id || !amount || !itemNumber || !formData) {
      throw new Error('MISSING_REQUIRED_DATA');
    }

    if (!['tender', 'auction'].includes(type)) {
      throw new Error('INVALID_TYPE');
    }

    if (amount <= 0) {
      throw new Error('INVALID_AMOUNT');
    }

    return state as PaymentDetails;
  };

  // Get and validate payment details
  const paymentDetails = useMemo(() => {
    try {
      return validatePaymentDetails(location.state);
    } catch (error: any) {
      console.error('Payment validation error:', error);
      toast.error(t('payment.invalidData'));
      navigate('/');
      return null;
    }
  }, [location.state, navigate, t]);

  // Calculate fees and total
  const fees = (paymentDetails?.amount || 0) * 0.03;
  const tax = (paymentDetails?.amount || 0) * 0.15;
  const total = (paymentDetails?.amount || 0) + fees + tax;

  // Check authentication
  useEffect(() => {
    if (!user) {
      console.log('User not authenticated');
      toast.error(t('auth.required'));
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname, t]);

  // Create submission
  const createSubmission = async () => {
    if (!paymentDetails?.type || !paymentDetails?.id || !paymentDetails?.formData) {
      throw new Error('Missing required submission data');
    }

    try {
      const service = paymentDetails.type === 'tender' 
        ? tenderApplicationsService 
        : auctionApplicationsService;

      const submission = await service.createApplication(
        paymentDetails.id,
        paymentDetails.formData
      );

      if (!submission?.id) {
        throw new Error('No submission ID returned');
      }

      return submission.id;
    } catch (error: any) {
      console.error('Submission creation failed:', error);
      throw new Error(`SUBMISSION_FAILED: ${error.message}`);
    }
  };

  // Handle payment submission
  const handlePayment = async (paymentFormData: PaymentFormData) => {
    if (!paymentDetails) return;

    setIsProcessing(true);
    let submissionId: string | null = null;
    let paymentId: string | null = null;

    try {
      // Create submission
      submissionId = await createSubmission();

      // Generate unique transaction ID
      const newTransactionId = `TRX-${uuidv4()}`;

      // Create payment record
      const payment = await paymentsService.createPayment({
        type: paymentDetails.type,
        item_id: paymentDetails.id,
        submission_id: submissionId,
        amount: total,
        status: 'completed',
        payment_method: paymentFormData.paymentMethod || 'card',
        transaction_id: newTransactionId
      });

      paymentId = payment.id;

      // Update submission status
      await paymentsService.updateSubmissionPaymentStatus(
        paymentDetails.type,
        submissionId,
        paymentId,
        'completed'
      );

      setTransactionId(newTransactionId);
      setIsSuccess(true);
      toast.success(t('payment.success'));

    } catch (error: any) {
      console.error('Payment process failed:', error);

      // Cleanup on failure
      if (submissionId) {
        try {
          await paymentsService.updateSubmissionPaymentStatus(
            paymentDetails.type,
            submissionId,
            paymentId,
            'failed'
          );
        } catch (cleanupError) {
          console.error('Cleanup failed:', cleanupError);
        }
      }

      toast.error(t(error.message.includes('SUBMISSION_FAILED') 
        ? 'payment.submissionError' 
        : 'payment.paymentError'
      ));

    } finally {
      setIsProcessing(false);
    }
  };

  if (!paymentDetails) {
    return (
      <PaymentLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('payment.invalidData')}</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            {t('payment.backToHome')}
          </button>
        </div>
      </PaymentLayout>
    );
  }

  return (
    <PaymentLayout>
      {isSuccess ? (
        <PaymentConfirmation
          transactionId={transactionId}
          amount={total}
          itemNumber={paymentDetails.itemNumber}
          type={paymentDetails.type}
        />
      ) : (
        <PaymentContainer
          itemNumber={paymentDetails.itemNumber}
          amount={paymentDetails.amount}
          fees={fees}
          tax={tax}
          total={total}
          isProcessing={isProcessing}
          onSubmit={handlePayment}
        />
      )}
    </PaymentLayout>
  );
};

export default PaymentPage;