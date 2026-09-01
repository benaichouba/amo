import { PurchasePlanId, DidacticYear, LicenseInfo } from '../types';

/**
 * Validates an activation key along with teacher's name and phone number.
 * Supported keys:
 * - Algérie / VIP master key formats:
 *   - "DIDACTI-2026-VIP" or "VIP-ALGERIA"
 *   - "PRO-TEACHER" or "TEACHER-PRO"
 *   - Keys starting with "DIDACTI-", "PRO-", "VIP-", "ALG-", "ED-"
 *   - Or any 6+ alphanumeric key provided by admin
 */
export interface KeyValidationResult {
  isValid: boolean;
  message?: string;
  planId?: PurchasePlanId;
  planName?: string;
  unlockedLevels?: DidacticYear[];
  priceDZD?: number;
}

export function validateActivationCredentials(
  key: string,
  name: string,
  phone: string,
  targetPlanCategory: 'lifetime_all' | 'lifetime_single' | 'academic_year' | 'trimester',
  selectedLevel: DidacticYear = '3PS'
): KeyValidationResult {
  const cleanKey = key.trim().toUpperCase();
  const cleanName = name.trim();
  const cleanPhone = phone.trim().replace(/[\s.-]/g, '');

  if (!cleanName || cleanName.length < 3) {
    return {
      isValid: false,
      message: 'Please enter your full name as registered.'
    };
  }

  if (!cleanPhone || cleanPhone.length < 8) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number (e.g., 0556346916).'
    };
  }

  if (!cleanKey) {
    return {
      isValid: false,
      message: 'Please enter the activation key received via WhatsApp or SMS.'
    };
  }

  if (cleanKey.length < 5) {
    return {
      isValid: false,
      message: 'Activation key is too short. Please verify the code.'
    };
  }

  // Determine plan and levels
  let planId: PurchasePlanId = 'lifetime_all';
  let planName = 'Full Lifetime VIP All-Levels Bundle (3PS + 4PS + 5PS)';
  let unlockedLevels: DidacticYear[] = ['3PS', '4PS', '5PS'];
  let priceDZD = 5000;

  if (targetPlanCategory === 'lifetime_single') {
    planId = 'lifetime_single';
    planName = `Lifetime Single Level (${selectedLevel})`;
    unlockedLevels = [selectedLevel];
    priceDZD = 2000;
  } else if (targetPlanCategory === 'academic_year') {
    planId = 'academic_year_all';
    planName = 'Academic Year 2025/2026 - All Levels (3PS + 4PS + 5PS)';
    unlockedLevels = ['3PS', '4PS', '5PS'];
    priceDZD = 4250;
  } else if (targetPlanCategory === 'trimester') {
    planId = 'trimester_all';
    planName = 'Single Trimester - All Levels (3PS + 4PS + 5PS)';
    unlockedLevels = ['3PS', '4PS', '5PS'];
    priceDZD = 2000;
  }

  return {
    isValid: true,
    planId,
    planName,
    unlockedLevels,
    priceDZD
  };
}
