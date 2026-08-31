import { LicenseInfo, DidacticYear } from '../types';

export const UNLIMITED_FREE_LICENSE: LicenseInfo = {
  tier: 'free',
  generationsUsed: 0,
  maxFreeGenerations: Infinity,
  isPro: true,
  unlockedLevels: ['3PS'],
  planName: 'Free Full Access (3PS Primary English)'
};

/**
 * Retrieves license state (always fully unlocked and unlimited).
 */
export function getLicenseInfo(): LicenseInfo {
  return UNLIMITED_FREE_LICENSE;
}

/**
 * Saves license info (no-op in full free mode).
 */
export function saveLicenseInfo(_license: LicenseInfo): void {
  // Free edition
}

/**
 * Checks if a specific grade level is unlocked (always true).
 */
export function isLevelUnlocked(_license: LicenseInfo, _gradeYear: DidacticYear): boolean {
  return true;
}

/**
 * Registers plan generation (always allowed with unlimited quota).
 */
export function registerPlanGeneration(_gradeYear?: DidacticYear): { 
  allowed: boolean; 
  remaining: number; 
  license: LicenseInfo; 
} {
  return {
    allowed: true,
    remaining: Infinity,
    license: UNLIMITED_FREE_LICENSE
  };
}
