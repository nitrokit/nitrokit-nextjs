import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';

// Tip tanımlamaları (gerekli)
import { SecurityStatus } from '../types';

vi.spyOn(console, 'error').mockImplementation(() => {});

// --- 1. MOCK OBJE TANIMLAMALARI ---
// Tüm mock'lar burada tanımlanır.
const prismaMock = {
    user: {
        findUnique: vi.fn()
    }
};
const authMock = vi.fn(); // <-- Hata veren authMock burada tanımlandı
const helpersMock = {
    analyzePasswordStrength: vi.fn(),
    getActiveSessionCount: vi.fn(),
    getRecentLoginAttempts: vi.fn()
};

// --- 2. BAĞIMLILIKLARI TAKLİT ETME (vi.mock) ---
// vi.mock'lar hoisting'den sonra çalıştığı için, yukarıdaki objelere bağımlıdır.
// Bu yüzden modülün içeriğini döndürmeliyiz.
vi.mock('@/lib/prisma', () => ({
    prisma: prismaMock
}));

// Auth helper'ı taklit etme
vi.mock('@/lib/auth/auth', () => ({
    auth: authMock
}));

// Diğer helper'ları taklit etme
vi.mock('../security-helpers', () => helpersMock);

let getUserSecurityStatus: any;
let getSimpleSecurityStatus: any;
let getSafeSecurityStatus: any;

// --- 4. MODÜLÜ MOCK'LARDAN SONRA YÜKLEME ---
beforeAll(async () => {
    // Dinamik import ile security-status modülünü yüklüyoruz.
    // Bu, mock'lar tamamen hazırlandıktan sonra gerçekleşir.
    const module = await import('../security-status');
    getUserSecurityStatus = module.getUserSecurityStatus;
    getSimpleSecurityStatus = module.getSimpleSecurityStatus;
    getSafeSecurityStatus = module.getSafeSecurityStatus;
});

// --- 5. ZAMANI SABİTLEME ---
const MOCK_DATE = new Date('2025-10-22T10:00:00.000Z');
const MOCK_TIME = MOCK_DATE.getTime();

vi.useFakeTimers();
vi.setSystemTime(MOCK_DATE);

const MOCK_USER_ID = 'auth_user_123';
const MOCK_SESSION = {
    user: { id: MOCK_USER_ID, email: 'test@nitrokit.com' }
};
const MOCK_USER_DB_DATA = {
    password: '$hashedpassword',
    twoFactorEnabled: true,
    emailVerified: new Date(),
    phoneVerified: false
};
const MOCK_HELPER_RESULTS = {
    activeSessions: 3,
    recentLoginAttempts: 0,
    passwordStrength: 'strong' as SecurityStatus['passwordStrength']
};
const MOCK_FALLBACK_STATUS: SecurityStatus = {
    passwordStrength: 'medium',
    twoFactorEnabled: true,
    activeSessions: 2,
    recentLoginAttempts: 0
};

describe('Security Status Core Logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Varsayılan başarılı durumları ayarla
        authMock.mockResolvedValue(MOCK_SESSION);
        prismaMock.user.findUnique.mockResolvedValue(MOCK_USER_DB_DATA);
        helpersMock.analyzePasswordStrength.mockReturnValue(MOCK_HELPER_RESULTS.passwordStrength);
        helpersMock.getActiveSessionCount.mockResolvedValue(MOCK_HELPER_RESULTS.activeSessions);
        helpersMock.getRecentLoginAttempts.mockResolvedValue(
            MOCK_HELPER_RESULTS.recentLoginAttempts
        );
    });

    // ----------------------------------------------------
    // TEST: getUserSecurityStatus (Core Helper)
    // ----------------------------------------------------
    describe('getUserSecurityStatus', () => {
        it('should correctly combine all helper results into SecurityStatus', async () => {
            const status = await getUserSecurityStatus(MOCK_USER_ID);

            expect(status.passwordStrength).toBe('strong');
            expect(status.twoFactorEnabled).toBe(true);
            expect(status.activeSessions).toBe(3);
            expect(status.recentLoginAttempts).toBe(0);

            // Prisma'nın doğru veriyi çektiğini kontrol et
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: MOCK_USER_ID },
                select: expect.any(Object)
            });
        });

        it('should return default status if user is not found in DB', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const status = await getUserSecurityStatus(MOCK_USER_ID);

            // Kullanıcı yoksa, varsayılan false/0 durumu dönmeli
            expect(status.twoFactorEnabled).toBe(false);
            expect(status.passwordStrength).toBe('unknown');
        });
    });

    // ----------------------------------------------------
    // TEST: getSimpleSecurityStatus (Session Kontrolü)
    // ----------------------------------------------------
    describe('getSimpleSecurityStatus', () => {
        it('should call getUserSecurityStatus when session is active', async () => {
            await getSimpleSecurityStatus();

            // Oturum olduğu için getUserSecurityStatus çağrılmalı
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith(
                expect.objectContaining({ where: { id: MOCK_USER_ID } })
            );
        });

        it('should return default status when no session is found', async () => {
            authMock.mockResolvedValue(null); // Oturumu null yap

            const status = await getSimpleSecurityStatus();

            expect(status.activeSessions).toBe(0);
            expect(status.passwordStrength).toBe('unknown');
            // Kullanıcı çekme fonksiyonunun çağrılmadığını kontrol et
            expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
        });
    });

    // ----------------------------------------------------
    // TEST: getSafeSecurityStatus (Hata Yönetimi)
    // ----------------------------------------------------
    describe('getSafeSecurityStatus', () => {
        // 1. Parametresiz çağrı
        it('should call getSimpleSecurityStatus when no userId is provided', async () => {
            const status = await getSafeSecurityStatus(undefined);

            // Sonuç, getSimpleSecurityStatus'tan gelmeli
            expect(status.passwordStrength).toBe('strong'); // Mock sonucunu alır
            expect(authMock).toHaveBeenCalledTimes(1);
        });

        // 2. Hata durumunda mock data döndürme
        it('should return mock data on a failure in the security chain', async () => {
            // Hata simülasyonu: Prisma çağrısını hata döndürmeye zorla
            prismaMock.user.findUnique.mockRejectedValue(new Error('Prisma Network Error'));

            const status = await getSafeSecurityStatus(MOCK_USER_ID);

            // Hata yakalandığı için mock data dönmeli
            expect(status).toEqual(MOCK_FALLBACK_STATUS);
            expect(console.error).toHaveBeenCalled();
        });

        // 3. userId ile doğrudan çağırma
        it('should call getUserSecurityStatus directly when userId is provided', async () => {
            const status = await getSafeSecurityStatus(MOCK_USER_ID);

            expect(status.activeSessions).toBe(3);
            expect(authMock).not.toHaveBeenCalled(); // userId olduğu için oturuma bakmamalı
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith(
                expect.objectContaining({ where: { id: MOCK_USER_ID } })
            );
        });
    });
});
