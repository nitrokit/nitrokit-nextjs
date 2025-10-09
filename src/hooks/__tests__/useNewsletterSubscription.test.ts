import { renderHook, act } from '@testing-library/react';
import { useNewsletterSubscription } from '../useNewsletterSubscription';
import { vi, describe, it, expect, MockInstance, beforeEach, afterEach } from 'vitest';
import { NewsletterSubscriptionResponseSchema } from '@/lib';

// 1. Zod Şemasını Mock'lama
vi.mock('@/lib', () => ({
    // Mock'un doğru tipte olduğundan emin olmak için orijinal tipini kullanıyoruz
    NewsletterSubscriptionResponseSchema: {
        safeParse: vi.fn()
    }
}));

// 2. Global Fetch Mock'u
let fetchSpy: MockInstance;

const MOCK_SUCCESS_API_RESPONSE = {
    success: true,
    message: 'Subscription successful.'
};

const MOCK_ERROR_API_RESPONSE = {
    success: false,
    error: 'Email already exists.'
};

describe('useNewsletterSubscription Hook', () => {
    // Sabit test verisi
    const TEST_EMAIL = 'test@example.com';
    const GENERAL_ERROR_KEY = 'app.errors.general';

    beforeEach(() => {
        // Tüm asenkron işlemleri kontrol etmek için sahte zamanlayıcılar kullan
        vi.useFakeTimers();

        // Fetch Mock'u
        fetchSpy = vi.spyOn(global, 'fetch');

        // Zod şemasını varsayılan başarılı yanıt için mock'luyoruz.
        (NewsletterSubscriptionResponseSchema.safeParse as any).mockReturnValue({
            success: true,
            data: MOCK_SUCCESS_API_RESPONSE
        });
    });

    afterEach(() => {
        // Mock'ları ve zamanlayıcıları temizle
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    // --- SENARYO 1: BAŞLANGIÇ DURUMU ---

    it('should return initial state correctly', () => {
        const { result } = renderHook(() => useNewsletterSubscription());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.success).toBe(false);
        expect(result.current.isSubscribed).toBe(false);
    });

    // --- SENARYO 2: BAŞARILI ABONELİK ---

    it('should handle API success and set success/isSubscribed states', async () => {
        // Fetch'i uzun süren bir Promise ile mock'luyoruz.
        let resolveFetch: (value: any) => void;
        const fetchPromise = new Promise((resolve) => {
            resolveFetch = resolve;
        });

        fetchSpy.mockReturnValue(fetchPromise);

        const { result } = renderHook(() => useNewsletterSubscription());

        let subscribePromise: Promise<void>;

        // Subscribe çağrısını yap. Bu, setLoading(true) çağrısını tetikler.
        act(() => {
            // subscribe'ın kendisi async olduğu için dışarıda await kullanmıyoruz,
            // promise'i değişkende tutuyoruz.
            subscribePromise = result.current.subscribe(TEST_EMAIL);
        });

        // 1. Loading ve API Çağrısı Kontrolü
        // İlk senkron state güncellemesi act içinde çalıştığı için, buraya yansımalıdır.
        expect(result.current.loading).toBe(true);
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(
            '/api/newsletter/subscribe',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ email: TEST_EMAIL })
            })
        );

        // 2. Fetch Promise'ini resolve et ve state'in başarı durumuna geçmesini bekle
        await act(async () => {
            resolveFetch({
                json: () => Promise.resolve(MOCK_SUCCESS_API_RESPONSE)
            });
            // Tüm promise zincirlerinin bitmesini bekle
            await subscribePromise;
        });

        // 3. Başarı Kontrolü
        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(true);
        expect(result.current.isSubscribed).toBe(true);
        expect(result.current.error).toBeNull();
    });

    // --- SENARYO 3: ZAMANLAYICI İLE OTOMATİK SIFIRLAMA ---

    it('should reset isSubscribed state after 3000ms delay on success', async () => {
        // Fetch'i başarılı yanıtla resolve ediyoruz
        fetchSpy.mockResolvedValue({
            json: () => Promise.resolve(MOCK_SUCCESS_API_RESPONSE)
        });

        const { result } = renderHook(() => useNewsletterSubscription());

        // Başarılı abonelik (Promise'in tamamlanmasını bekle)
        await act(async () => {
            await result.current.subscribe(TEST_EMAIL);
        });

        // Abone oldu durumunda
        expect(result.current.isSubscribed).toBe(true);

        // 2999ms ilerlet, hala abone olmalı
        await act(async () => {
            vi.advanceTimersByTime(2999);
        });
        expect(result.current.isSubscribed).toBe(true);

        // 1ms daha ilerlet (Toplam 3000ms), sıfırlanmalı
        await act(async () => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current.isSubscribed).toBe(false);
    });

    // --- SENARYO 4: İŞ MANTIĞI HATASI (API 200, Başarı: False) ---

    it('should handle business logic error and set error state', async () => {
        // Zod mock'unu iş mantığı hatasına ayarlıyoruz
        (NewsletterSubscriptionResponseSchema.safeParse as any).mockReturnValue({
            success: true,
            data: MOCK_ERROR_API_RESPONSE
        });

        // Fetch'i başarılı HTTP yanıtıyla resolve ediyoruz
        fetchSpy.mockResolvedValue({
            json: () => Promise.resolve(MOCK_ERROR_API_RESPONSE)
        });

        const { result } = renderHook(() => useNewsletterSubscription());

        await act(async () => {
            await result.current.subscribe(TEST_EMAIL);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(false);
        expect(result.current.isSubscribed).toBe(false);
        expect(result.current.error).toBe(MOCK_ERROR_API_RESPONSE.error);
    });

    // --- SENARYO 5: FETCH/AĞ HATASI ---

    it('should handle network/fetch failure and set generic error state', async () => {
        // Fetch'i bir hata ile reject ediyoruz
        fetchSpy.mockRejectedValue(new Error('Network Down'));

        const { result } = renderHook(() => useNewsletterSubscription());

        await act(async () => {
            await result.current.subscribe(TEST_EMAIL);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(false);
        expect(result.current.isSubscribed).toBe(false);
        expect(result.current.error).toBe(GENERAL_ERROR_KEY);
    });

    // --- SENARYO 6: API YANITI ZOD UYUMSUZLUĞU ---

    it('should handle invalid API response (Zod parsing failure) and set generic error state', async () => {
        // Zod mock'unu ayrıştırma hatasına ayarlıyoruz
        (NewsletterSubscriptionResponseSchema.safeParse as any).mockReturnValue({
            success: false // Zod parsing hatası
        });

        // Fetch'i başarılı HTTP yanıtıyla resolve ediyoruz (içerik hatalı olsa da)
        fetchSpy.mockResolvedValue({
            json: () => Promise.resolve({ malformed: 'data' })
        });

        const { result } = renderHook(() => useNewsletterSubscription());

        await act(async () => {
            await result.current.subscribe(TEST_EMAIL);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(false);
        expect(result.current.isSubscribed).toBe(false);
        expect(result.current.error).toBe(GENERAL_ERROR_KEY);
    });
});
